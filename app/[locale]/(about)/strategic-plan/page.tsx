import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import {
    ChartBar, Scale, Lock, Briefcase, Landmark, Zap, Users, Globe, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

export default function StrategicPlanPage() {
    const t = useTranslations('StrategicPlanPage');

    const incentives = [
        {
            title: t('incentives.cards.0.title'),
            icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
            lists: [
                t('incentives.cards.0.l0'),
                t('incentives.cards.0.l1'),
                t('incentives.cards.0.l2')
            ]
        },
        {
            title: t('incentives.cards.1.title'),
            icon: <Landmark className="w-6 h-6 md:w-8 md:h-8" />,
            lists: [
                t('incentives.cards.1.l0'),
                t('incentives.cards.1.l1')
            ]
        },
        {
            title: t('incentives.cards.2.title'),
            icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
            lists: [
                t('incentives.cards.2.l0'),
                t('incentives.cards.2.l1'),
                t('incentives.cards.2.l2')
            ]
        },
        {
            title: t('incentives.cards.3.title'),
            icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
            lists: [
                t('incentives.cards.3.l0'),
                t('incentives.cards.3.l1')
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-32">

                {/* --- Header & Executive Summary --- */}
                <div className="space-y-8 md:space-y-12 text-center md:text-left">
                    <div className="text-center space-y-4 md:space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">{t('header.subtitle')}</span>
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        </div>

                        <AnimatedTitle
                            text={t('header.title')}
                            className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-base md:text-xl tracking-wider uppercase">{t('header.tagline')}</p>
                    </div>

                    <div className="relative bg-blue border border-white/10 p-6 md:p-14 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-bl-[60px] md:rounded-bl-[100px]"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left mb-6 md:mb-10">
                                <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shrink-0 shadow-lg">
                                    <ChartBar className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="font-bebas text-2xl md:text-4xl text-white pt-1 md:pt-2">
                                    {t('executiveSummary.title')}
                                </h3>
                            </div>

                            <div className="font-oswald text-white/80 text-base md:text-xl leading-relaxed md:leading-loose space-y-4 md:space-y-6 text-center md:text-justify">
                                <p>
                                    {t('executiveSummary.p1')}
                                </p>
                                <p>
                                    {t('executiveSummary.p2')}
                                </p>
                                <p>
                                    {t('executiveSummary.p3')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 1. Political & Security Preconditions --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text={t('preconditions.title')}
                            className="text-3xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full items-center md:items-start text-center md:text-left">
                            <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white w-full">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Scale className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-xl md:text-2xl tracking-wide">{t('preconditions.card1.title')}</span>
                                </div>
                                <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 leading-relaxed text-base md:text-lg grow">
                                    <li className="flex gap-3 items-center md:items-start justify-center md:justify-start text-center md:text-left"><span className="text-red">‣</span> {t('preconditions.card1.list.0')}</li>
                                    <li className="flex gap-3 items-center md:items-start justify-center md:justify-start text-center md:text-left"><span className="text-red">‣</span> {t('preconditions.card1.list.1')}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full items-center md:items-start text-center md:text-left">
                            <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white w-full">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Lock className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-xl md:text-2xl tracking-wide">
                                        {AD_GRANTS_REVIEW_MODE ? t('preconditions.card2.reviewTitle') : t('preconditions.card2.title')}
                                    </span>
                                </div>
                                <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 leading-relaxed text-base md:text-lg grow">
                                    <li className="flex gap-3 items-center md:items-start justify-center md:justify-start text-center md:text-left">
                                        <span className="text-red">‣</span>
                                        <span>{AD_GRANTS_REVIEW_MODE ? t('preconditions.card2.list.review0') : t('preconditions.card2.list.0')}</span>
                                    </li>
                                    <li className="flex gap-3 items-center md:items-start justify-center md:justify-start text-center md:text-left">
                                        <span className="text-red">‣</span>
                                        <span>{t('preconditions.card2.list.1')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. Key Investment Incentives --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle
                            text={t('incentives.title')}
                            className="text-3xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-sm md:text-lg uppercase tracking-wider mt-2 md:mt-4">
                            {t('incentives.desc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {incentives.map((item, idx) => (
                            <div key={idx} className="relative bg-blue border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:border-white/30 transition-colors">

                                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left h-full">
                                    <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-linear-to-br from-red to-red/60 text-white border border-white/10 shadow-lg">
                                        {item.icon}
                                    </div>

                                    <h3 className="font-bebas text-2xl md:text-4xl text-white mb-4 md:mb-6">
                                        {item.title}
                                    </h3>

                                    <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 text-base md:text-lg leading-relaxed grow w-full">
                                        {item.lists.map((d, i) => (
                                            <li key={i} className="flex gap-3 items-center md:items-start justify-center md:justify-start text-center md:text-left">
                                                <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0 opacity-70 transition-opacity"></span>
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6 md:mt-8 w-12 h-0.5 bg-white/10 transition-all duration-700 mx-auto md:mx-0"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 3. Strategic Partnerships --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text={t('partnerships.title')}
                            className="text-3xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-sm md:text-lg uppercase tracking-wider mt-2 md:mt-4">
                            {t('partnerships.desc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Card 1 */}
                        <div className="relative bg-blue border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/30">
                            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col gap-6 md:gap-8 h-full">
                                <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-red to-red/60 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 shrink-0">
                                        <Globe className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-2xl md:text-4xl text-white transition-colors">{t('partnerships.card1.title')}</h3>
                                        <span className="font-oswald text-white/40 text-xs md:text-sm uppercase tracking-widest">{t('partnerships.card1.subtitle')}</span>
                                    </div>
                                </div>

                                <p className="font-oswald text-white/70 text-base md:text-xl leading-relaxed text-center sm:text-left">
                                    {t('partnerships.card1.desc')}
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative bg-blue border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/30">
                            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500"></div>

                            <div className="relative z-10 flex flex-col gap-6 md:gap-8 h-full">
                                <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-4 md:gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-red to-red/60 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 shrink-0">
                                        <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bebas text-2xl md:text-4xl text-white transition-colors">{t('partnerships.card2.title')}</h3>
                                        <span className="font-oswald text-white/40 text-xs md:text-sm uppercase tracking-widest">{t('partnerships.card2.subtitle')}</span>
                                    </div>
                                </div>

                                <p className="font-oswald text-white/70 text-base md:text-xl leading-relaxed text-center sm:text-left">
                                    {t('partnerships.card2.desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 4. Conclusion (Full Content) --- */}
                <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl">
                    <div className="absolute inset-0 bg-blue"></div>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/50 to-transparent"></div>

                    <div className="relative z-10 p-8 md:p-24 flex flex-col items-center text-center">
                        <div className="mb-6 md:mb-8 p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-full text-white animate-pulse">
                            <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12" />
                        </div>

                        <h2 className="text-4xl md:text-7xl font-bebas text-white mb-6 md:mb-8 leading-[0.9]">
                            {t('conclusion.title')}
                        </h2>

                        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                            <p className="font-oswald text-base md:text-2xl text-white/80 leading-relaxed">
                                {t('conclusion.p1')}
                            </p>

                            <div className="h-px w-24 md:w-32 bg-linear-to-r from-transparent via-red to-transparent mx-auto"></div>

                            <p className="font-oswald text-sm md:text-xl text-white/60 leading-relaxed uppercase tracking-wide">
                                {t('conclusion.p2')}
                            </p>
                        </div>
                    </div>

                    {/* Decorative side accents */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-20 md:h-32 bg-linear-to-b from-transparent via-red to-transparent opacity-50"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-20 md:h-32 bg-linear-to-b from-transparent via-red to-transparent opacity-50"></div>
                </div>

                {/* --- RESEARCH & SOURCING NOTE --- */}
                <div className="text-center max-w-3xl mx-auto px-4 -mb-8">
                    <p className="font-oswald text-foreground/50 text-xs md:text-sm leading-relaxed">
                        {t('researchNote')}
                    </p>
                </div>

                {/* --- DOWNLOAD DOCUMENT BUTTON --- */}
                <div className="flex justify-center pt-4 md:pt-8 relative z-10">
                    <Link
                        href="/about/ALEF_Strategic_Plan.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                {t('downloadButton')}
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>

            </div>
        </main>
    );
}