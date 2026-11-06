"use client";

import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { EVENTS, EventData } from "@/lib/eventsData";

const EventCard = ({
    event,
    isPast,
    t,
}: {
    event: EventData;
    isPast: boolean;
    t: ReturnType<typeof useTranslations>;
}) => (
    <div className="w-full bg-blue text-white relative overflow-hidden border border-white/15 rounded-xl shadow-2xl transition-all group">
        {/* Full Card Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-blue overflow-hidden pointer-events-none">
            <div className="w-full h-full relative transform transition-transform duration-1000 ease-out group-hover:scale-105">
                <SkeletonImage
                    src={event.image}
                    alt={`${event.titlePart1} ${event.titlePart2}`}
                    width={1200}
                    height={600}
                    style={{ width: "100%", height: "100%" }}
                    className="object-cover object-right opacity-60 transition-opacity duration-700"
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-blue via-blue/85 to-blue/20 pointer-events-none"></div>
        </div>

        {/* Content Side over Background */}
        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:p-16 flex flex-col items-start space-y-6 md:space-y-7 max-w-4xl w-full">
            {/* Tag Badge: Clean subtle style matching past event card */}
            <div>
                <span className="inline-flex items-center gap-2 font-oswald text-xs uppercase tracking-[0.25em] font-medium px-3 py-1 rounded-sm bg-white/10 text-white border border-white/20">
                    {!isPast && <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse"></span>}
                    {isPast ? t("tabs.eventArchiveTag") : event.tagline || t("tabs.upcoming")}
                </span>
            </div>

            {/* Title: Pure crisp white, single line across tablet and desktop */}
            <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bebas text-white tracking-wide leading-none md:whitespace-nowrap">
                    {event.titlePart1} {event.titlePart2}
                </h2>
                {event.subtitle && (
                    <p className="font-oswald text-white/90 text-sm sm:text-base font-medium tracking-wider uppercase mt-3">
                        {event.subtitle}
                    </p>
                )}
            </div>

            {/* Description */}
            <p className="font-oswald text-white/80 text-base md:text-lg leading-relaxed max-w-2xl border-l-2 border-white/30 pl-4">
                {event.description}
            </p>

            {/* Logistics */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 font-bebas text-base sm:text-lg pt-1 text-white/90">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span>
                        {event.displayDate} {event.time ? `• ${event.time}` : ""}
                    </span>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span>{event.venueName}</span>
                </div>
            </div>

            {/* Pricing / Contribution Badges if available */}
            {(event.admission || event.sponsorship) && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                    {event.admission && (
                        <span className="font-oswald text-xs tracking-wider uppercase px-3.5 py-1.5 bg-white/10 border border-white/15 text-white rounded-sm font-medium">
                            Admission: <strong className="text-white font-bold">{event.admission}</strong>
                        </span>
                    )}
                    {event.sponsorship && (
                        <span className="font-oswald text-xs tracking-wider uppercase px-3.5 py-1.5 bg-white/10 border border-white/15 text-white rounded-sm font-medium">
                            Sponsorship: <strong className="text-white font-bold">{event.sponsorship}</strong>
                        </span>
                    )}
                </div>
            )}

            {/* CTA Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                    href={event.href}
                    className="group/link inline-flex items-center gap-3 bg-red hover:bg-[#a00827] text-white px-8 py-3.5 text-base font-bold tracking-[0.2em] font-bebas uppercase transition-all shadow-xl rounded-sm cursor-pointer"
                >
                    <span>{t("tabs.learnMore")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    </div>
);

export default function EventsPage() {
    const t = useTranslations("EventsPage");
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

    // Automatically categorize events based on date comparison against current time
    const { upcomingEvents, pastEvents } = useMemo(() => {
        const now = new Date();
        const upcoming: EventData[] = [];
        const past: EventData[] = [];

        EVENTS.forEach((event) => {
            const eventDate = new Date(event.date);
            if (eventDate >= now) {
                upcoming.push(event);
            } else {
                past.push(event);
            }
        });

        return { upcomingEvents: upcoming, pastEvents: past };
    }, []);

    const upcomingCount = upcomingEvents.length;
    const pastCount = pastEvents.length;

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">

            {/* ── PAGE HEADER ── */}
            <div className="mb-16 text-center max-w-5xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-red rounded-full animate-pulse"></span>
                    <span className="font-oswald text-xs tracking-[0.3em] text-red uppercase">
                        {t("pageSubtitle")}
                    </span>
                </div>

                <AnimatedTitle
                    text={t("pageTitle")}
                    className="text-5xl mb-4 md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                />

                <p className="font-oswald text-lg md:text-xl text-foreground/60 leading-relaxed max-w-3xl mx-auto text-center">
                    {t("pageDescription")}
                </p>
            </div>

            {/* TABS */}
            <div className="relative flex w-full max-w-xl mx-auto border-b border-foreground/10 mb-16">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`w-1/2 pb-4 text-2xl md:text-3xl font-bebas uppercase tracking-wider transition-colors z-10 text-center cursor-pointer flex items-center justify-center gap-2 ${
                        activeTab === "upcoming"
                            ? "text-foreground"
                            : "text-foreground/40 hover:text-foreground/80"
                    }`}
                >
                    <span>{t("tabs.upcoming")}</span>
                    <span
                        className={`text-xs font-oswald px-2 py-0.5 rounded-full ${
                            upcomingCount > 0
                                ? "bg-red text-white"
                                : "bg-foreground/10 text-foreground/70"
                        }`}
                    >
                        {upcomingCount}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab("past")}
                    className={`w-1/2 pb-4 text-2xl md:text-3xl font-bebas uppercase tracking-wider transition-colors z-10 text-center cursor-pointer flex items-center justify-center gap-2 ${
                        activeTab === "past"
                            ? "text-foreground"
                            : "text-foreground/40 hover:text-foreground/80"
                    }`}
                >
                    <span>{t("tabs.past")}</span>
                    <span
                        className={`text-xs font-oswald px-2 py-0.5 rounded-full ${
                            pastCount > 0
                                ? "bg-red text-white"
                                : "bg-foreground/10 text-foreground/70"
                        }`}
                    >
                        {pastCount}
                    </span>
                </button>

                {/* Animated Underline */}
                <div
                    className="absolute bottom-0 h-[3px] bg-red transition-all duration-300 ease-in-out w-1/2 transform translate-y-[1.5px]"
                    style={{ left: activeTab === "upcoming" ? "0%" : "50%" }}
                />
            </div>

            {/* TAB CONTENT */}
            <div className="w-full max-w-7xl mx-auto">
                {activeTab === "upcoming" ? (
                    <div>
                        {upcomingEvents.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8">
                                {upcomingEvents.map((event) => (
                                    <EventCard
                                        key={event.slug}
                                        event={event}
                                        isPast={false}
                                        t={t}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white/5 border border-foreground/10 rounded-xl">
                                <p className="font-oswald text-foreground/70 text-lg uppercase tracking-widest">
                                    {t("tabs.noUpcoming")}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {pastEvents.length > 0 ? (
                            <div className="grid grid-cols-1 gap-8">
                                {pastEvents.map((event) => (
                                    <EventCard
                                        key={event.slug}
                                        event={event}
                                        isPast={true}
                                        t={t}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white/5 border border-foreground/10 rounded-xl">
                                <p className="font-oswald text-foreground/70 text-lg uppercase tracking-widest">
                                    {t("tabs.noUpcoming") || "No Past Events"}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </main>
    );
}
