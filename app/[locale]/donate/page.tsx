"use client";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { CreditCard, Loader2, Mail, ChevronRight, ShieldCheck, ArrowLeft, Heart, SearchX } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';

export default function DonatePage() {
    const t = useTranslations('DonatePage');
    const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'sponsor'>('one-time');
    const [customAmount, setCustomAmount] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useAuthState(auth);
    const router = useRouter();

    // Portal state — multi-step verification
    const [portalEmail, setPortalEmail] = useState('');
    const [portalLoading, setPortalLoading] = useState(false);
    const [portalError, setPortalError] = useState('');
    const [portalStep, setPortalStep] = useState<'email' | 'code' | 'verified' | 'not_found'>('email');
    const [verificationCode, setVerificationCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const processPayment = async (amount: number) => {
        setIsLoading(true);

        sendGAEvent('event', 'begin_checkout', {
            value: amount,
            currency: 'USD',
            items: [{
                item_id: `donation_${donationType}`,
                item_name: `Donation - ${donationType}`,
                price: amount,
                quantity: 1
            }]
        });

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    donationType: donationType,
                    ...(user && { userId: user.uid, userEmail: user.email })
                }),
            });

            const { url, error } = await response.json();

            if (error) {
                alert(t('alerts.paymentError') + error);
                setIsLoading(false);
                return;
            }

            if (url) window.location.href = url;

        } catch (error) {
            console.error("Network error:", error);
            alert(t('alerts.connectError'));
            setIsLoading(false);
        }
    };

    const handleDonate = () => {
        if (customAmount) {
            const amount = parseFloat(customAmount);

            // Sponsor Validation
            if (donationType === 'sponsor' && (!amount || amount < 2500)) {
                setIsError(true);
                setCustomAmount('');
                return;
            }

            // Basic Validation
            if (!amount || amount < 1) {
                alert(t('alerts.validAmount'));
                return;
            }

            processPayment(amount);
        } else {
            alert(t('alerts.selectTier'));
        }
    };

    // Step 1: Send verification code to email
    const handleSendCode = async () => {
        if (!portalEmail || !portalEmail.includes('@')) {
            setPortalError(t('portal.invalidEmail'));
            return;
        }

        setPortalLoading(true);
        setPortalError('');

        try {
            const res = await fetch('/api/portal-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: portalEmail, action: 'send' }),
            });

            const data = await res.json();

            if (data.success) {
                setPortalStep('code');
                setCodeSent(true);
            } else if (data.errorType === 'not_found') {
                // Show the nice "no subscription" UI
                setPortalStep('not_found');
            } else {
                setPortalError(data.error || t('portal.genericError'));
            }
        } catch (error) {
            console.error(error);
            setPortalError(t('portal.genericError'));
        } finally {
            setPortalLoading(false);
        }
    };

    // Step 2: Verify the code
    const handleVerifyCode = async () => {
        if (!verificationCode || verificationCode.length < 6) {
            setPortalError(t('portal.invalidCode'));
            return;
        }

        setPortalLoading(true);
        setPortalError('');

        try {
            const res = await fetch('/api/portal-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: portalEmail,
                    code: verificationCode,
                    action: 'verify',
                }),
            });

            const data = await res.json();

            if (data.verified) {
                // Code verified — now open the portal
                setPortalStep('verified');
                sendGAEvent('event', 'portal_verification_success');
                await handleOpenPortal();
            } else {
                setPortalError(data.error || t('portal.invalidCode'));
                sendGAEvent('event', 'portal_verification_failure', { error: data.error });
            }
        } catch (error) {
            console.error(error);
            setPortalError(t('portal.genericError'));
        } finally {
            setPortalLoading(false);
        }
    };

    // Step 3: Open the portal (only after verification)
    const handleOpenPortal = async () => {
        setPortalLoading(true);

        try {
            const res = await fetch('/api/create-portal-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: portalEmail, verified: true }),
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setPortalError(data.error || t('portal.genericError'));
                setPortalStep('email');
            }
        } catch (error) {
            console.error(error);
            setPortalError(t('portal.genericError'));
            setPortalStep('email');
        } finally {
            setPortalLoading(false);
        }
    };

    // Reset portal to step 1
    const handlePortalBack = () => {
        setPortalStep('email');
        setVerificationCode('');
        setPortalError('');
        setCodeSent(false);
    };

    // Switch to monthly donation tab
    const handleGoToMonthly = () => {
        setPortalStep('email');
        setPortalError('');
        setDonationType('monthly');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tiers = donationType === 'sponsor'
        ? [
            { amount: 2500, label: t('tiers.sponsor.leadership.label'), desc: t('tiers.sponsor.leadership.desc') },
            { amount: 5000, label: t('tiers.sponsor.strategic.label'), desc: t('tiers.sponsor.strategic.desc') },
            { amount: 10000, label: t('tiers.sponsor.visionary.label'), desc: t('tiers.sponsor.visionary.desc') },
            { amount: 25000, label: t('tiers.sponsor.global.label'), desc: t('tiers.sponsor.global.desc') }
        ]
        : [
            { amount: 100, label: t('tiers.support.supporter.label'), desc: t('tiers.support.supporter.desc') },
            { amount: 250, label: t('tiers.support.contributor.label'), desc: t('tiers.support.contributor.desc') },
            { amount: 500, label: t('tiers.support.advocate.label'), desc: t('tiers.support.advocate.desc') },
            { amount: 1000, label: t('tiers.support.champion.label'), desc: t('tiers.support.champion.desc') }
        ];

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-sm font-bold">{t('header.tag')}</span>
                        <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text={t('header.title')}
                        className="text-5xl md:text-7xl lg:text-8xl font-bebas text-foreground leading-none"
                    />

                    <p className="font-oswald text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {t('header.description')}
                    </p>
                </div>

                {/* Donation Type Toggle */}
                <div className="flex justify-center">
                    <div className="relative flex items-center bg-foreground/5 p-1 rounded-full border border-foreground/10 w-[450px]">
                        <div className={`absolute left-1 top-1 bottom-1 w-[calc(33.33%-4px)] bg-red rounded-full shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${donationType === 'monthly' ? 'translate-x-full' :
                            donationType === 'sponsor' ? 'translate-x-[200%]' :
                                'translate-x-0'
                            }`}></div>

                        <button onClick={() => { setDonationType('one-time'); sendGAEvent('event', 'select_donation_type', { type: 'one-time' }); }} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'one-time' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>{t('toggles.oneTime')}</button>
                        <button onClick={() => { setDonationType('monthly'); sendGAEvent('event', 'select_donation_type', { type: 'monthly' }); }} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'monthly' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>{t('toggles.monthly')}</button>
                        <button onClick={() => { setDonationType('sponsor'); sendGAEvent('event', 'select_donation_type', { type: 'sponsor' }); }} className={`relative z-10 flex-1 py-3 text-center font-oswald text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${donationType === 'sponsor' ? 'text-white' : 'text-foreground/60 hover:text-foreground'}`}>{t('toggles.sponsor')}</button>
                    </div>
                </div>

                {/* Donation Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.map((tier, idx) => (
                        <div key={idx} className="group relative p-6 lg:p-8 border border-foreground/10 bg-foreground/5 hover:bg-blue hover:border-red/50 transition-all duration-500 rounded-xl overflow-hidden cursor-pointer">
                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                <span className="font-oswald text-xs tracking-widest text-foreground/50 group-hover:text-white/60 uppercase">{tier.label}</span>
                                <span className="font-bebas text-6xl text-foreground group-hover:text-white transition-colors duration-300">
                                    ${tier.amount.toLocaleString()}{donationType === 'monthly' && <span className="text-2xl text-foreground/50 group-hover:text-white/60">/mo</span>}
                                </span>
                                <p className="font-oswald text-sm text-foreground/60 group-hover:text-white/70 leading-relaxed min-h-[40px]">
                                    {tier.desc}
                                </p>
                                <div className="pt-6 w-full">
                                    {/* UPDATED BUTTON: Calls processPayment with the tier amount */}
                                    <button
                                        onClick={() => processPayment(tier.amount)}
                                        disabled={isLoading}
                                        className="w-full py-3 bg-transparent border border-foreground/20 group-hover:border-red group-hover:bg-red text-foreground group-hover:text-white font-oswald uppercase tracking-widest text-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
                                    >
                                        {isLoading ? t('buttons.processing') : `${t('buttons.select')} ${donationType === 'monthly' ? t('buttons.months') : ''}`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Amount */}
                <div className="max-w-2xl mx-auto bg-foreground/5 border border-foreground/10 p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="font-oswald text-xs tracking-widest text-foreground/50 uppercase">{t('customAmount.label')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-oswald text-foreground/40">$</span>
                                <input
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={customAmount}
                                    onChange={(e) => {
                                        setCustomAmount(e.target.value);
                                        setIsError(false);
                                    }}
                                    className={`w-full bg-background border px-8 py-4 font-bebas text-2xl outline-none transition-colors ${isError
                                        ? 'border-red placeholder:text-red/80'
                                        : 'border-foreground/10 focus:border-red'
                                        }`}
                                    placeholder={
                                        isError
                                            ? t('customAmount.errorMin')
                                            : donationType === 'sponsor'
                                                ? t('customAmount.placeholderMin')
                                                : t('customAmount.placeholder')
                                    }
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleDonate}
                            disabled={isLoading}
                            className="w-full md:w-auto px-12 py-4 bg-red hover:bg-[#c4151c] text-white font-oswald font-bold tracking-widest uppercase transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                        >
                            {isLoading ? t('customAmount.buttonWait') : (donationType === 'monthly' ? t('customAmount.buttonMonthly') : t('customAmount.button'))}
                        </button>
                    </div>
                </div>

                {/* Manage Subscription Section (for guest/unauthenticated users) */}
                <div className="max-w-2xl mx-auto bg-foreground/5 border border-foreground/10 p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue via-blue/50 to-transparent"></div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                            {portalStep === 'code' ? (
                                <ShieldCheck className="w-5 h-5 text-blue" />
                            ) : (
                                <CreditCard className="w-5 h-5 text-blue" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-bebas text-2xl text-foreground tracking-wide">{t('portal.title')}</h3>
                            <p className="font-oswald text-xs text-foreground/50 uppercase tracking-widest">{t('portal.subtitle')}</p>
                        </div>
                    </div>

                    {/* STEP 1: Email Input */}
                    {portalStep === 'email' && (
                        <>
                            <p className="font-oswald text-sm text-foreground/60 leading-relaxed mb-6">
                                {t('portal.description')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                    <input
                                        type="email"
                                        value={portalEmail}
                                        onChange={(e) => {
                                            setPortalEmail(e.target.value);
                                            setPortalError('');
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSendCode();
                                        }}
                                        placeholder={t('portal.emailPlaceholder')}
                                        className="w-full bg-background border border-foreground/10 focus:border-blue pl-11 pr-4 py-3.5 font-oswald text-sm outline-none transition-colors rounded-lg"
                                    />
                                </div>
                                <button
                                    onClick={handleSendCode}
                                    disabled={portalLoading || !portalEmail}
                                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue hover:bg-blue/90 text-white font-oswald font-semibold tracking-wider uppercase text-sm rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
                                >
                                    {portalLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Mail className="w-4 h-4" />
                                    )}
                                    {portalLoading ? t('portal.loading') : t('portal.sendCode')}
                                    {!portalLoading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 2: Verification Code Input */}
                    {portalStep === 'code' && (
                        <>
                            <div className="bg-blue/5 border border-blue/20 rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
                                <Mail className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                                <p className="font-oswald text-sm text-foreground/70">
                                    {t('portal.codeSentTo')} <strong className="text-foreground">{portalEmail}</strong>
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={verificationCode}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setVerificationCode(val);
                                            setPortalError('');
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleVerifyCode();
                                        }}
                                        placeholder={t('portal.codePlaceholder')}
                                        className="w-full bg-background border border-foreground/10 focus:border-blue pl-11 pr-4 py-3.5 font-oswald text-sm outline-none transition-colors rounded-lg tracking-[0.3em] text-center"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    onClick={handleVerifyCode}
                                    disabled={portalLoading || verificationCode.length < 6}
                                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue hover:bg-blue/90 text-white font-oswald font-semibold tracking-wider uppercase text-sm rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap"
                                >
                                    {portalLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <ShieldCheck className="w-4 h-4" />
                                    )}
                                    {portalLoading ? t('portal.loading') : t('portal.verifyButton')}
                                    {!portalLoading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={handlePortalBack}
                                    className="flex items-center gap-1.5 font-oswald text-xs text-foreground/50 hover:text-foreground/80 uppercase tracking-widest transition-colors"
                                >
                                    <ArrowLeft className="w-3 h-3" />
                                    {t('portal.back')}
                                </button>
                                <button
                                    onClick={handleSendCode}
                                    disabled={portalLoading}
                                    className="font-oswald text-xs text-blue hover:text-blue/80 uppercase tracking-widest transition-colors disabled:opacity-50"
                                >
                                    {t('portal.resendCode')}
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3: Loading/Redirecting */}
                    {portalStep === 'verified' && (
                        <div className="flex flex-col items-center py-4 gap-3">
                            <Loader2 className="w-6 h-6 animate-spin text-blue" />
                            <p className="font-oswald text-sm text-foreground/60 uppercase tracking-widest">
                                {t('portal.redirecting')}
                            </p>
                        </div>
                    )}

                    {/* No Subscription Found */}
                    {portalStep === 'not_found' && (
                        <div className="flex flex-col items-center text-center py-2">
                            <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-5">
                                <SearchX className="w-8 h-8 text-foreground/30" />
                            </div>
                            <h4 className="font-bebas text-2xl text-foreground tracking-wide mb-2">
                                {t('portal.notFound.title')}
                            </h4>
                            <p className="font-oswald text-sm text-foreground/50 leading-relaxed mb-6 max-w-sm">
                                {t('portal.notFound.message')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                                <button
                                    onClick={handleGoToMonthly}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-red hover:bg-[#c4151c] text-white font-oswald font-semibold tracking-wider uppercase text-sm rounded-xl transition-all duration-300 shadow-lg shadow-red/20 group"
                                >
                                    <Heart className="w-4 h-4" />
                                    {t('portal.notFound.donateButton')}
                                </button>
                                <button
                                    onClick={handlePortalBack}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-foreground/10 hover:border-foreground/20 text-foreground/60 hover:text-foreground font-oswald tracking-wider uppercase text-sm rounded-xl transition-all duration-300"
                                >
                                    {t('portal.notFound.tryAgain')}
                                </button>
                            </div>
                        </div>
                    )}

                    {portalError && (
                        <p className="mt-4 font-oswald text-sm text-red bg-red/10 border border-red/20 px-4 py-3 rounded-lg">
                            {portalError}
                        </p>
                    )}
                </div>

                <div className="text-center space-y-4 pt-8">
                    <p className="font-oswald text-xs text-foreground/40 uppercase tracking-widest">
                        {t('footer.taxInfo')}
                    </p>
                </div>

            </div>
        </main>
    );
}