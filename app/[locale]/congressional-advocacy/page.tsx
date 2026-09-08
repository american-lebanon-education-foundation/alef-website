"use client";

import { useMemo, useState, useEffect } from "react";
import AnimatedTitle from "../../components/CommonCom/AnimatedTitle";
import FilterBar from "../../components/CommonCom/FilterBar";
import SkeletonImage from "../../components/CommonCom/SkeletonImage";
import CongressionalActions from "@/app/components/HomeCom/CongressionalActions";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

// Member Data Types
interface Member {
    name: string;
    state: string;
    desc: string;
    img: string;
    contact?: string;
    chamber?: string;
    party?: string;
}

// Helper to highlight text
const highlightText = (text: string, query: string) => {
    if (!query || !text) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-red/70 text-white rounded px-0.5">
                {part}
            </span>
        ) : (
            part
        )
    );
};

// Card Component
const MemberCard = ({ member, searchQuery }: { member: Member; searchQuery: string }) => {
    const isArabicName = /[\u0600-\u06FF]/.test(member.name);
    const isArabicDesc = /[\u0600-\u06FF]/.test(member.desc);

    const content = (
        <div className="aspect-4/5 relative overflow-hidden bg-gray-100">
            <SkeletonImage
                src={`/congressionalAdvocasy/${member.img}`}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 lg:group-hover:scale-110"
            />

            {/* Base Gradient - Always visible for text contrast */}
            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-500" />

            {/* Premium Hover Color Wash - Desktop Only */}
            <div className="absolute inset-0 bg-blue/90 opacity-0 lg:group-hover:opacity-90 transition-opacity duration-500 mix-blend-multiply hidden lg:block" />

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                {/* Name/State Container */}
                <div className="transform transition-transform duration-500 lg:group-hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className={`${isArabicName ? 'font-oswald text-2xl' : 'font-bebas text-3xl tracking-wide'} drop-shadow-md`}>
                            {highlightText(member.name, searchQuery)}
                        </h3>
                        <span className={`bg-red text-white text-[10px] font-bold px-2 py-0.5 rounded font-oswald shadow-sm border border-red/50 ${isArabicName ? '' : 'tracking-widest'}`}>{member.state}</span>
                    </div>
                </div>

                {/* Description Reveal Animation - Always Visible on Mobile, Hover on Desktop */}
                <div className="grid transition-all duration-500 ease-out grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <div className="pt-2 lg:pt-3 transition-opacity duration-500 delay-100 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                            <div className="w-12 h-0.5 bg-red mb-2 lg:mb-3"></div>
                            <p className={`text-white/90 font-oswald text-sm font-light leading-relaxed ${isArabicDesc ? '' : 'uppercase tracking-wide'}`}>
                                {member.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const baseClasses = "group relative bg-white/5 border border-black/5 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500";

    if (member.contact) {
        return (
            <a
                href={member.contact}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClasses} cursor-pointer block`}
            >
                {content}
            </a>
        );
    }

    return (
        <div className={baseClasses}>
            {content}
        </div>
    );
};

export default function CongressionalAdvocacyPage() {
    const t = useTranslations('CongressionalAdvocacyPage');
    const router = useRouter();

    useEffect(() => {
        if (AD_GRANTS_REVIEW_MODE) {
            router.replace('/alef-profile');
        }
    }, [router]);

    if (AD_GRANTS_REVIEW_MODE) {
        return null;
    }

    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [chamberFilter, setChamberFilter] = useState<"All" | "Senate" | "House" | "CongressLatest">("All");

    // Unified List for filtering
    const allMembers = useMemo(() => {
        // Fetch raw data
        const membersData = t.raw('members') as {
            senate_republicans: Member[],
            senate_democrats: Member[],
            house_republicans: Member[],
            house_democrats: Member[]
        };

        // Fallback or access
        const senateRep = membersData?.senate_republicans || [];
        const senateDem = membersData?.senate_democrats || [];
        const houseRep = membersData?.house_republicans || [];
        const houseDem = membersData?.house_democrats || [];

        return [
            ...senateRep.map(m => ({ ...m, chamber: "Senate", party: "Republican" })),
            ...senateDem.map(m => ({ ...m, chamber: "Senate", party: "Democrat" })),
            ...houseRep.map(m => ({ ...m, chamber: "House", party: "Republican" })),
            ...houseDem.map(m => ({ ...m, chamber: "House", party: "Democrat" }))
        ];
    }, [t]); // Dependency on t ensures it updates on language change

    // Filter Logic
    const filteredMembers = useMemo(() => {
        return allMembers.filter(m => {
            // Search Text - Use strict name matching only
            const lowerQuery = searchQuery.toLowerCase();
            const matchesSearch = m.name.toLowerCase().includes(lowerQuery);

            if (!matchesSearch) return false;

            // Chamber Filter
            if (chamberFilter === "All") return true;
            if (chamberFilter === "CongressLatest") return false; // Don't show members in this tab
            return m.chamber === chamberFilter;
        });
    }, [allMembers, searchQuery, chamberFilter]);

    // Grouping for Display
    const senateRepublicans = filteredMembers.filter(m => m.chamber === "Senate" && m.party === "Republican");
    const senateDemocrats = filteredMembers.filter(m => m.chamber === "Senate" && m.party === "Democrat");
    const houseRepublicans = filteredMembers.filter(m => m.chamber === "House" && m.party === "Republican");
    const houseDemocrats = filteredMembers.filter(m => m.chamber === "House" && m.party === "Democrat");

    const showSenate = (chamberFilter === "All" || chamberFilter === "Senate") && (senateRepublicans.length > 0 || senateDemocrats.length > 0);
    const showHouse = (chamberFilter === "All" || chamberFilter === "House") && (houseRepublicans.length > 0 || houseDemocrats.length > 0);

    return (
        <main className="bg-background min-h-screen pb-24">
            {/* HERO / HEADER */}
            <div className="pt-32 pb-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto text-center">
                <AnimatedTitle
                    text={t('title')}
                    className="text-5xl md:text-7xl lg:text-8xl font-bebas font-bold text-foreground leading-none"
                />

                <div className="max-w-4xl mx-auto space-y-6 mt-10">
                    <p className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                        {t('intro.p1')}
                    </p>
                    <p className="font-oswald text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                        {t('intro.p2')}
                    </p>
                </div>
            </div>

            {/* FILTER BAR - Added Here */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
                <FilterBar
                    tabs={[t('filters.all'), t('filters.senate'), t('filters.house'), t('filters.congressLatest')]}
                    activeTab={
                        chamberFilter === "All" ? t('filters.all') :
                            chamberFilter === "Senate" ? t('filters.senate') :
                                chamberFilter === "House" ? t('filters.house') :
                                    t('filters.congressLatest')
                    }
                    onTabChange={(tab) => {
                        if (tab === t('filters.all')) setChamberFilter("All");
                        else if (tab === t('filters.senate')) setChamberFilter("Senate");
                        else if (tab === t('filters.house')) setChamberFilter("House");
                        else if (tab === t('filters.congressLatest')) setChamberFilter("CongressLatest");
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchPlaceholder={t('filters.searchPlaceholder')}
                />
            </div>



            {/* NO RESULTS MESSAGE */}
            {filteredMembers.length === 0 && chamberFilter !== "CongressLatest" && (
                <div className="max-w-7xl mx-auto px-4 text-center py-20">
                    <p className="text-foreground/60 text-xl font-oswald uppercase tracking-widest">
                        {t('filters.noResults')} &quot;{searchQuery}&quot;
                    </p>
                    <button
                        onClick={() => { setChamberFilter("All"); setSearchQuery(""); }}
                        className="text-red font-oswald text-sm underline underline-offset-4 hover:text-foreground mt-4"
                    >
                        {t('filters.clear')}
                    </button>
                </div>
            )}

            {/* SENATE SECTION */}
            {showSenate && (
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="h-px flex-1 bg-foreground/70"></span>
                        <h2 className="font-bebas text-3xl md:text-5xl text-foreground">{t('sections.senate')}</h2>
                        <span className="h-px flex-1 bg-foreground/70"></span>
                    </div>

                    {/* Republicans */}
                    {senateRepublicans.length > 0 && (
                        <div className="mb-16">
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2  md:pl-4 border-l-4 border-red">{t('sections.republicans')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {senateRepublicans.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Democrats */}
                    {senateDemocrats.length > 0 && (
                        <div>
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2 md:pl-4 border-l-4 border-red">{t('sections.democrats')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {senateDemocrats.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* HOUSE SECTION */}
            {showHouse && (
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="h-px flex-1 bg-foreground/70"></span>
                        <h2 className="font-bebas text-3xl md:text-5xl text-foreground">{t('sections.house')}</h2>
                        <span className="h-px flex-1 bg-foreground/70"></span>
                    </div>

                    {/* Republicans */}
                    {houseRepublicans.length > 0 && (
                        <div className="mb-16">
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2 md:pl-4 border-l-4 border-red">{t('sections.republicans')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {houseRepublicans.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Democrats */}
                    {houseDemocrats.length > 0 && (
                        <div>
                            <h3 className="font-oswald text-xl md:text-2xl text-red mb-8 uppercase tracking-widest pl-2 md:pl-4 border-l-4 border-red">{t('sections.democrats')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {houseDemocrats.map((member, i) => (
                                    <MemberCard key={i} member={member} searchQuery={searchQuery} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* LEGISLATIVE UPDATES / CONGRESS LATEST SECTION - MOVED TO BOTTOM */}
            {(chamberFilter === "All" || chamberFilter === "CongressLatest") && (
                <>
                    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* NEW SECTION HEADER matching Senate/House style */}
                        <div className="flex items-center gap-4 mb-12">
                            <span className="h-px flex-1 bg-foreground/70"></span>
                            <h2 className="font-bebas text-3xl md:text-5xl text-foreground">{t('filters.congressLatest')}</h2>
                            <span className="h-px flex-1 bg-foreground/70"></span>
                        </div>

                        <div className="flex flex-col gap-6">
                            {(t.raw('latestItems') as { tag: string; title: string; committee: string; access: string; date: string; link: string }[]).map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative block bg-blue border border-white/10 p-8 md:p-12 rounded-xl overflow-hidden group hover:border-red/30 hover:scale-[1.02] transition-all duration-500 ring-1 ring-white/5 cursor-pointer"
                                >
                                    {/* Background Decor - Static, no hover change */}
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-light-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                                    <div className="relative z-10 space-y-6 pr-0 md:pr-24">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3">
                                                <span className="bg-red text-white text-xs font-bold px-3 py-1 rounded-sm font-oswald tracking-widest">{item.tag}</span>
                                            </div>

                                            <h3 className="font-bebas text-3xl md:text-5xl text-white transition-colors duration-300 leading-[0.9] max-w-4xl">
                                                {item.title}
                                            </h3>

                                            <div className="flex items-center gap-2 text-white/50 text-sm font-oswald font-light group-hover:text-white/70 transition-colors">
                                                <span>{item.committee}</span>
                                                <span>•</span>
                                                <span>{item.date}</span>
                                                <span>•</span>
                                                <span>{item.access}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Icon - Always Visible */}
                                    <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block">
                                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-red group-hover:border-red transition-all duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white transition-colors duration-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <CongressionalActions />
                </>
            )}

        </main>
    );
}
