"use client";

import { Link } from "@/i18n/routing";
import SkeletonImage from "./SkeletonImage";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.155 17c1.472 0 2.548-.828 2.548-2.31V9.923h-2.1v.794c-.655-.783-1.638-1.2-2.73-1.2-2.073 0-3.805 1.637-3.805 3.967 0 2.33 1.732 3.967 3.805 3.967 1.092 0 2.075-.417 2.73-1.2v.228c0 .324-.263.633-.674.633-.424 0-.67-.282-.693-.655H11.08c.038 1.411 1.258 2.546 3.076 2.546Z"/>
        <path d="M11.96 15.603c-1.077 0-1.928-.888-1.928-2.12 0-1.231.85-2.12 1.927-2.12 1.077 0 1.928.889 1.928 2.12 0 1.232-.851 2.12-1.928 2.12Z"/>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-2-2.302A8.006 8.006 0 0 0 12 20a8 8 0 1 0-8-8c0 .878.14 1.723.4 2.515"/>
    </svg>
);
import { useTranslations } from "next-intl";
import { sendGAEvent } from '@next/third-parties/google';
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');
    // For nested keys like 'Navbar.menu', we can access them via the main tNav if we passed 'Navbar' 
    // but useTranslations return a function that can access nested keys if setup correctly, 
    // or we can just use useTranslations('Navbar.menu') separately.
    // However, simpler is just tNav('menu.ourProfile') if tNav is 'Navbar'.

    // Let's check how next-intl works: useTranslations('Namespace') -> t('key').
    // If I want 'Navbar.menu.ourProfile', I can use useTranslations('Navbar') -> t('menu.ourProfile')
    // OR useTranslations('Navbar.menu') -> t('ourProfile').
    // In the previous code, I used tMenu('ourProfile') where tMenu was 'Navbar.menu'.

    const tMenu = useTranslations('Navbar.menu');

    return (
        <footer className="bg-blue pt-16 pb-8 px-6 md:px-12 lg:px-24 border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    <div className="space-y-6">
                        <Link href="/" className="block relative w-50 h-18">
                            <SkeletonImage
                                src="/home/logo.webp"
                                alt="ALEF Logo"
                                fill
                                className=" bg-white p-1"
                            />
                        </Link>
                        <p className="text-white/60 text-sm font-oswald leading-relaxed max-w-xs">
                            {t('description')}
                        </p>
                        <p className="text-white/60 text-sm font-oswald leading-relaxed max-w-xs border-t border-white/10 pt-3">
                            {t('nonprofitDisclosure')}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <SocialButton icon={<Facebook className="w-4 h-4" />} href="https://www.facebook.com/share/g/1CAf9Dn4A3/" />
                            <SocialButton icon={<Linkedin className="w-4 h-4" />} href="https://www.linkedin.com/groups/16682004/" />
                            <SocialButton icon={<Instagram className="w-4 h-4" />} href="https://www.instagram.com/alef_foundation/" />
                            <SocialButton icon={<ThreadsIcon className="w-4 h-4" />} href="https://www.threads.com/@alef_foundation" />
                            <SocialButton icon={<TikTokIcon className="w-4 h-4" />} href="https://www.tiktok.com/in/about" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">{t('explore')}</h3>
                        <ul className="space-y-4">
                            <li><NavLink href="/">{tNav('home')}</NavLink></li>
                            <li><NavLink href="/alef-profile">{tMenu('ourProfile')}</NavLink></li>
                            <li><NavLink href="/experts-corner">{tMenu('expertsCorner')}</NavLink></li>
                            {!AD_GRANTS_REVIEW_MODE && <li><NavLink href="/congressional-advocacy">{tNav('congressional')}</NavLink></li>}
                            <li><NavLink href="/contact">{tNav('contact')}</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">{t('resources')}</h3>
                        <ul className="space-y-4">
                            <li><NavLink href="/blogs-and-articles">{tMenu('blogsAndArticles')}</NavLink></li>
                            <li><NavLink href="/house-of-cards">{tMenu('houseOfCards')}</NavLink></li>
                            <li><NavLink href="/archives">{tMenu('archives')}</NavLink></li>
                            <li><NavLink href="/podcasts">{tMenu('podcasts')}</NavLink></li>
                            <li><NavLink href="/events">{tMenu('events')}</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bebas text-lg text-white mb-6 tracking-wider">{t('contact')}</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-red shrink-0 mt-0.5" />
                                <span
                                    className="text-white/70 font-oswald text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: t.raw('address') }}
                                />
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-red shrink-0" />
                                <a href="mailto:contact@usalef.org" dir="ltr" className="text-white/70 hover:text-white transition-colors font-oswald text-sm">
                                    contact@usalef.org
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-red shrink-0" />
                                <a href="tel:+12129702533" dir="ltr" className="text-white/70 hover:text-white transition-colors font-oswald text-sm">
                                    +1 (212) 970-ALEF
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    {/* Left: Copyright */}
                    <div className="flex justify-center lg:justify-start">
                        <p className="text-white/40 text-[10px] font-oswald uppercase tracking-wider whitespace-nowrap">
                            {t('copyright')} © {new Date().getFullYear()} {t('rights')}
                        </p>
                    </div>

                    {/* Center: Legal Disclaimer */}
                    <div className="flex justify-center text-center">
                        <span className="text-white/40 text-[10px] font-oswald uppercase tracking-wider">
                            {t('legal1')}
                            <a
                                href="/footerDocuments/Legal Notice and Disclaimer.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors underline underline-offset-2 mx-1"
                            >
                                {t('legal2')}
                            </a>
                            {t('legal3')}
                        </span>
                    </div>

                    {/* Right: Privacy, Terms & Return Policy */}
                    <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-4">
                        <a
                            href="/footerDocuments/privacyPolicy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors"
                        >
                            {t('privacy')}
                        </a>
                        <a
                            href="/footerDocuments/termsAndConditions.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors"
                        >
                            {t('terms')}
                        </a>
                        <a
                            href="/footerDocuments/returnpolicy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white text-[10px] font-oswald uppercase tracking-wider transition-colors"
                        >
                            {t('returnPolicy')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-white/60 hover:text-red transition-colors font-oswald text-sm tracking-wide uppercase block">
            {children}
        </Link>
    );
}

function SocialButton({ icon, href, label }: { icon: React.ReactNode, href: string, label?: string }) {
    const platform = href.includes('facebook') ? 'facebook' : href.includes('linkedin') ? 'linkedin' : href.includes('instagram') ? 'instagram' : href.includes('threads') ? 'threads' : href.includes('tiktok') ? 'tiktok' : 'other';
    const displayLabel = label || platform;
    
    return (
        <a
            href={href}
            target="_blank"
            onClick={() => sendGAEvent('event', 'social_click', { platform, url: href })}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-red hover:border-red hover:text-white transition-all duration-300 relative group"
            aria-label={displayLabel}
        >
            {icon}
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red text-white text-[10px] font-oswald uppercase tracking-wider px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl shadow-red/20 translate-y-1 group-hover:-translate-y-1">
                {displayLabel}
            </span>
        </a>
    );
}