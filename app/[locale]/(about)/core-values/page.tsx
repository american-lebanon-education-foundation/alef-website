import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { ShieldCheck, Scale, Globe, TrendingUp, Users, Target, Flag, Briefcase, HandCoins, BarChart3, Radio, CheckCircle2, FileText } from 'lucide-react';
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

export default function CoreValuesPage() {
    const t = useTranslations('CoreValuesPage');

    const values = [
        {
            title: t('values.items.0.title'),
            icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('values.items.0.desc')
        },
        {
            title: t('values.items.1.title'),
            icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('values.items.1.desc')
        },
        {
            title: t('values.items.2.title'),
            icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('values.items.2.desc')
        },
        {
            title: t('values.items.3.title'),
            icon: <Scale className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('values.items.3.desc')
        },
        {
            title: t('values.items.4.title'),
            icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
            desc: t('values.items.4.desc')
        }
    ];

    const pillars = [
        {
            title: t('pillars.items.0.title'),
            desc: t('pillars.items.0.desc')
        },
        {
            title: t('pillars.items.1.title'),
            desc: t('pillars.items.1.desc')
        },
        {
            title: t('pillars.items.2.title'),
            desc: AD_GRANTS_REVIEW_MODE ? t('pillars.items.2.reviewDesc') : t('pillars.items.2.desc')
        },
        {
            title: t('pillars.items.3.title'),
            desc: AD_GRANTS_REVIEW_MODE ? t('pillars.items.3.reviewDesc') : t('pillars.items.3.desc')
        }
    ];

    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-16 md:space-y-32">

                {/* --- 1. INTRODUCTION, VISION & MISSION --- */}
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
                        <div className="h-1 w-20 md:w-32 bg-red mx-auto mb-6 md:mb-10"></div>

                        <p className="font-oswald text-foreground/60 text-base md:text-xl tracking-wider uppercase max-w-4xl mx-auto">
                            {t('header.tagline')}
                        </p>
                    </div>

                    <div className="relative bg-blue border border-white/10 p-6 md:p-14 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-bl-[80px] md:rounded-bl-[100px]"></div>
                        <div className="relative z-10">
                            <h3 className="font-bebas text-2xl md:text-4xl text-white mb-4 md:mb-6">{t('introduction.title')}</h3>
                            <p className="font-oswald text-white/80 text-base md:text-xl leading-relaxed md:leading-loose space-y-6 text-left md:text-justify">
                                {t('introduction.desc')}
                            </p>
                        </div>
                    </div>


                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Vision Card */}
                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full items-center md:items-start text-center md:text-left">
                            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white items-center md:items-start text-center md:text-left w-full">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Target className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-2xl md:text-3xl tracking-wide">{t('vision.title')}</span>
                                </div>
                                <p className="font-oswald text-white/70 text-base md:text-xl leading-relaxed grow text-center md:text-left">
                                    {t('vision.desc')}
                                </p>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="relative p-6 md:p-10 border border-white/10 bg-blue rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-blue/20 flex flex-col h-full items-center md:items-start text-center md:text-left">
                            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-bl-[60px] md:rounded-bl-[80px]"></div>
                            <div className="relative z-10 flex flex-col h-full gap-4 md:gap-6 text-white items-center md:items-start text-center md:text-left w-full">
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div className="p-3 bg-linear-to-br from-red to-red/60 rounded-lg text-white shadow-lg">
                                        <Flag className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>
                                    <span className="font-bebas text-2xl md:text-3xl tracking-wide">{t('mission.title')}</span>
                                </div>
                                <ul className="space-y-3 md:space-y-4 font-oswald text-white/70 text-sm md:text-lg leading-relaxed grow w-full">
                                    {[
                                        t('mission.list.0'),
                                        t('mission.list.1'),
                                        t('mission.list.2'),
                                        t('mission.list.3'),
                                        t('mission.list.4')
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-center md:items-start justify-center md:justify-start text-center md:text-left">
                                            <span className="w-1.5 h-1.5 bg-red rounded-full shrink-0 md:mt-2"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* // --- 2. CORE VALUES --- */}
                <div className="space-y-8 md:space-y-12">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle
                            text={t('values.title')}
                            className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <div className="h-1 w-20 md:w-24 bg-red mx-auto mt-4 md:mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {values.map((val, index) => (
                            <div key={index} className="relative bg-blue border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:border-white/30">

                                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left h-full">
                                    <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-linear-to-br from-red to-red/60 text-white border border-white/10 shadow-lg">
                                        {val.icon}
                                    </div>

                                    <h3 className="font-bebas text-2xl md:text-3xl text-white mb-2 md:mb-4 transition-colors duration-300">
                                        {val.title}
                                    </h3>

                                    <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed grow">
                                        {val.desc}
                                    </p>

                                    <div className="mt-6 md:mt-8 w-12 h-0.5 bg-white/10 transition-all duration-700 mx-auto md:mx-0"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* // --- 3. STRATEGIC PILLARS & INITIATIVES --- */}
                <div className="space-y-16 md:space-y-24">
                    {/* Pillars */}
                    <div>
                        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                            <AnimatedTitle
                                text={t('pillars.title')}
                                className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                            />
                            <p className="font-oswald text-foreground/60 text-sm md:text-lg mt-4 uppercase tracking-widest">
                                {t('pillars.subtitle')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {pillars.map((pillar, idx) => (
                                <div key={idx} className="relative bg-blue border border-white/10 p-8 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-20">
                                        <span className="font-bebas text-6xl md:text-8xl text-white">0{idx + 1}</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col h-full justify-center items-center md:items-start text-center md:text-left">
                                        <h3 className="font-bebas text-2xl md:text-4xl text-white mb-2 md:mb-4 pr-0 md:pr-12">{pillar.title}</h3>
                                        <div className="h-1 w-12 bg-red mb-4 md:mb-6 mx-auto md:mx-0"></div>
                                        <p className="font-oswald text-white/70 text-lg md:text-xl leading-relaxed">{pillar.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Initiatives */}
                    <div>
                        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                            <AnimatedTitle
                                text={t('initiatives.title')}
                                className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                            />
                        </div>

                        <div className="grid gap-4 md:gap-6">
                            {[
                                {
                                    t: AD_GRANTS_REVIEW_MODE ? t('initiatives.items.0.reviewT') : t('initiatives.items.0.t'),
                                    d: AD_GRANTS_REVIEW_MODE ? t('initiatives.items.0.reviewD') : t('initiatives.items.0.d'),
                                    i: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                                },
                                {
                                    t: t('initiatives.items.1.t'),
                                    d: t('initiatives.items.1.d'),
                                    i: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                                },
                                {
                                    t: AD_GRANTS_REVIEW_MODE ? t('initiatives.items.2.reviewT') : t('initiatives.items.2.t'),
                                    d: AD_GRANTS_REVIEW_MODE ? t('initiatives.items.2.reviewD') : t('initiatives.items.2.d'),
                                    i: <Globe className="w-5 h-5 md:w-6 md:h-6" />
                                },
                                {
                                    t: t('initiatives.items.3.t'),
                                    d: t('initiatives.items.3.d'),
                                    i: <Users className="w-5 h-5 md:w-6 md:h-6" />
                                },
                                {
                                    t: AD_GRANTS_REVIEW_MODE ? t('initiatives.items.4.reviewT') : t('initiatives.items.4.t'),
                                    d: AD_GRANTS_REVIEW_MODE ? t('initiatives.items.4.reviewD') : t('initiatives.items.4.d'),
                                    i: <Radio className="w-5 h-5 md:w-6 md:h-6" />
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="relative bg-blue border border-white/10 p-6 md:p-8 rounded-xl md:rounded-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-4 md:gap-6 group hover:bg-light-blue transition-colors duration-300">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red hidden md:block"></div>
                                    <div className="p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-xl text-white shrink-0 shadow-lg">
                                        {item.i}
                                    </div>
                                    <div className="grow">
                                        <h3 className="font-bebas text-xl md:text-2xl text-white mb-1">{item.t}</h3>
                                        <p className="font-oswald text-white/60 text-base md:text-lg">{item.d}</p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="p-2 border border-white/10 rounded-full text-white/40 group-hover:text-white transition-colors">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* // --- 4. DIVERSITY & STRUCTURE --- */}
                <div className="space-y-12 md:space-y-16">
                    <div className="text-center max-w-4xl mx-auto">
                        <AnimatedTitle
                            text={t('diversity.title')}
                            className="text-4xl md:text-5xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 text-base md:text-lg mt-4 md:mt-6 max-w-2xl mx-auto">
                            {t('diversity.desc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <DiversityCard
                            icon={<Users className="w-6 h-6 md:w-8 md:h-8" />}
                            title={t('diversity.cards.0.title')}
                            desc={t('diversity.cards.0.desc')}
                        />
                        <DiversityCard
                            icon={<Briefcase className="w-6 h-6 md:w-8 md:h-8" />}
                            title={t('diversity.cards.1.title')}
                            desc={t('diversity.cards.1.desc')}
                        />
                        <DiversityCard
                            icon={<Target className="w-6 h-6 md:w-8 md:h-8" />}
                            title={t('diversity.cards.2.title')}
                            desc={t('diversity.cards.2.desc')}
                        />
                        <DiversityCard
                            icon={<Globe className="w-6 h-6 md:w-8 md:h-8" />}
                            title={t('diversity.cards.3.title')}
                            desc={t('diversity.cards.3.desc')}
                        />
                    </div>

                    <div className="border-t border-white/10 pt-16 md:pt-20">
                        <div className="bg-blue rounded-2xl md:rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                            <h2 className="text-3xl md:text-4xl font-bebas text-white mb-8 md:mb-12 text-center relative z-10">{t('diversity.structure.title')}</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
                                {[
                                    { name: t('diversity.structure.executive'), icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white" /> },
                                    { name: t('diversity.structure.advisory'), icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-white" /> },
                                    { name: t('diversity.structure.taskForces'), icon: <Target className="w-6 h-6 md:w-8 md:h-8 text-white" /> },
                                    { name: t('diversity.structure.partners'), icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" /> }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 p-6 md:p-8 rounded-xl md:rounded-2xl border border-white/5 flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors">
                                        <div className="p-3 md:p-4 bg-linear-to-br from-red to-red/60 rounded-xl shadow-lg">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-bebas text-xl md:text-2xl text-white tracking-wide">{item.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* // --- 5. FUNDING & SUPPORT --- */}
                <div className="bg-blue rounded-2xl md:rounded-3xl p-6 md:p-14 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="inline-flex items-center gap-4 px-4.5 py-2 rounded-lg bg-linear-to-br from-red to-red/60 text-white border border-white/10 shadow-md shadow-red/20 mb-4">
                                <HandCoins className="w-4 h-4 md:w-5 md:h-5 text-white shrink-0" />
                                <span className="font-oswald tracking-widest uppercase text-xs md:text-sm font-bold">{t('funding.tag')}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bebas text-white mb-4 md:mb-6">{t('funding.title')}</h2>
                            <p className="font-oswald text-white/70 leading-relaxed text-base md:text-xl">
                                {t('funding.desc')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {[
                                t('funding.list.0'),
                                t('funding.list.1'),
                                t('funding.list.2'),
                                t('funding.list.3'),
                                t('funding.list.4'),
                                t('funding.list.5')
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-center md:justify-start gap-3 p-3 md:p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-center md:text-left">
                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-red shrink-0" />
                                    <span className="font-bebas text-base md:text-lg text-white tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* // --- 6. METRICS FOR SUCCESS --- */}
                <div className="space-y-10 md:space-y-14">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimatedTitle
                            text={t('metrics.title')}
                            className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                        />
                        <p className="font-oswald text-foreground/60 mt-4 md:mt-6 text-base md:text-xl">
                            {t('metrics.desc')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />, idx: 0 },
                            { icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />, idx: 1 },
                            { icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />, idx: 2 },
                            { icon: <Users className="w-5 h-5 md:w-6 md:h-6" />, idx: 3 },
                            { icon: <Radio className="w-5 h-5 md:w-6 md:h-6" />, idx: 4 },
                            { icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />, idx: 5 }
                        ].map(({ icon, idx }) => {
                            const prefix = AD_GRANTS_REVIEW_MODE ? `metrics.reviewCards.${idx}` : `metrics.cards.${idx}`;
                            return (
                                <MetricCard
                                    key={idx}
                                    icon={icon}
                                    title={t(`${prefix}.title`)}
                                    goal={t(`${prefix}.goal`)}
                                    metrics={[t(`${prefix}.m1`), t(`${prefix}.m2`)]}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* --- ACTION BUTTONS (READ CORE VALUES & FAQ) --- */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8 md:pt-16 relative z-10">
                    <Link
                        href="/about/ALEF_Core_Values.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-10 md:px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                {t('downloadButton')}
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>

                    <Link href="/faq">
                        <button className="group relative bg-transparent border border-foreground/70 text-foreground px-10 md:px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                                {t('faqButton')}
                            </span>
                            <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

// Updated sub-components with better props
function DiversityCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="bg-blue border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl flex flex-col gap-4 md:gap-6 relative overflow-hidden group hover:border-white/30 transition-colors items-center md:items-start text-center md:text-left">
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-red/10 transition-colors duration-500"></div>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-red to-red/60 rounded-2xl flex items-center justify-center text-white border border-white/5 relative z-10 shadow-lg">
                {icon}
            </div>
            <div className="relative z-10">
                <h3 className="font-bebas text-2xl md:text-3xl text-white mb-2 md:mb-4">{title}</h3>
                <p className="font-oswald text-white/70 text-base md:text-lg leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function MetricCard({ title, goal, metrics, icon }: { title: string, goal: string, metrics: string[], icon: React.ReactNode }) {
    return (
        <div className="group bg-blue p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden flex flex-col h-full border border-white/10 hover:border-white/30 transition-colors items-center sm:items-start text-center sm:text-left">
            <div className="mb-6 flex flex-col items-center sm:items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-red to-red/60 rounded-xl flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg">
                    {icon}
                </div>
                <h4 className="font-bebas text-2xl md:text-3xl text-white mb-2">{title}</h4>
                <div className="inline-block px-2 py-1 md:px-3 md:py-1 rounded bg-white/5 border border-white/10 text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
                    Goal: {goal}
                </div>
            </div>

            <div className="mt-auto pt-4 md:pt-6 border-t border-white/5 w-full">
                <ul className="space-y-2 md:space-y-3">
                    {metrics.map((m, i) => (
                        <li key={i} className="flex gap-3 items-start font-oswald text-white/70 text-sm md:text-base leading-snug group-hover:text-white/90 transition-colors justify-center sm:justify-start">
                            <span className="w-1.5 h-1.5 bg-red rounded-full mt-1.5 md:mt-2 shrink-0"></span>
                            <span>{m}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}