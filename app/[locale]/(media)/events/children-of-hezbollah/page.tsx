"use client";

import SkeletonImage from "@/app/components/CommonCom/SkeletonImage";
import {
    Calendar,
    MapPin,
    Clock,
    Ticket,
    Award,
    BookOpen,
    ArrowRight,
    X,
    HeartHandshake,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ChildrenOfHezbollahEventPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Schema.org Event structured data for SEO
    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "An Exclusive Evening at Trump Tower: Children of Hezbollah Book Launch",
        startDate: "2026-12-02T18:00:00-05:00",
        endDate: "2026-12-02T22:00:00-05:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: "Electrum Gallery, 19th floor, Trump Tower",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Fifth Avenue, between 56th and 57th Street",
                addressLocality: "New York",
                addressRegion: "NY",
                postalCode: "10022",
                addressCountry: "US",
            },
        },
        image: [
            "https://www.usalef.org/events/trump-tower.jpg",
            "https://www.usalef.org/events/children-of-hezbollah.jpg",
        ],
        description:
            "An exclusive evening at Trump Tower in New York City to introduce Children of Hezbollah by Lebanese Shiite leader Ali Khalife, examining how children are drawn into extremist ideology.",
        organizer: {
            "@type": "Organization",
            name: "American Lebanon Education Foundation (ALEF)",
            url: "https://www.usalef.org",
        },
        performer: [
            {
                "@type": "Person",
                name: "Ali Khalife",
                jobTitle: "Author, Lebanese Shiite Leader",
            },
            {
                "@type": "Person",
                name: "Ziad K. Abdelnour",
                jobTitle: "Founding Chairman, ALEF",
            },
        ],
        offers: [
            {
                "@type": "Offer",
                name: "General Admission",
                price: "250",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: "https://www.zeffy.com/en-US/ticketing/an-exclusive-evening-at-trump-tower-children-of-hezbollah",
            },
            {
                "@type": "Offer",
                name: "Sponsorship",
                price: "2500",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: "https://www.zeffy.com/en-US/ticketing/an-exclusive-evening-at-trump-tower-children-of-hezbollah",
            },
        ],
    };

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />

            {/* ── HERO BANNER (Full-bleed Background matching Event Cards) ── */}
            <div className="w-full max-w-7xl mx-auto mb-20">
                <div className="w-full bg-blue text-white relative overflow-hidden border border-white/15 rounded-xl shadow-2xl transition-all group">
                    {/* Full Card Background Image with Smooth Gradient Overlay */}
                    <div className="absolute inset-0 z-0 bg-blue overflow-hidden pointer-events-none">
                        <div className="w-full h-full relative transform transition-transform duration-1000 ease-out group-hover:scale-105">
                            <SkeletonImage
                                src="/events/trump-tower.jpg"
                                alt="Trump Tower"
                                width={1400}
                                height={700}
                                style={{ width: "100%", height: "100%" }}
                                className="object-cover object-right opacity-45 transition-opacity duration-700"
                                priority
                            />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-r from-blue via-blue/85 to-blue/20 pointer-events-none" />
                    </div>

                    {/* Content Side over Background */}
                    <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:p-16 flex flex-col items-start space-y-6 md:space-y-7 max-w-4xl w-full">
                        {/* Tag Badge */}
                        <div>
                            <span className="inline-flex items-center gap-2 font-oswald text-xs uppercase tracking-[0.25em] font-medium px-3.5 py-1.5 rounded-sm bg-white/10 text-white border border-white/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse"></span>
                                Upcoming Gala • Book Launch &amp; Fundraiser
                            </span>
                        </div>

                        {/* Title: Single Line across Tablet and Desktop */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bebas text-white tracking-wide leading-none md:whitespace-nowrap">
                                AN EXCLUSIVE EVENING AT TRUMP TOWER
                            </h1>
                            <p className="font-oswald text-white/90 text-sm sm:text-base md:text-lg font-medium tracking-wider uppercase mt-3">
                                Introducing &ldquo;Children of Hezbollah&rdquo; by Lebanese Shiite leader Ali Khalife
                            </p>
                        </div>

                        {/* Excerpt */}
                        <p className="font-oswald text-white/80 text-base md:text-lg leading-relaxed max-w-2xl border-l-2 border-white/30 pl-4">
                            The American Lebanon Education Foundation (ALEF) invites you to an exclusive evening in New York City. The book examines how children are drawn into extremist ideology, bringing that crucial message to readers, educators, and policymakers.
                        </p>

                        {/* Logistics Grid: 4 Compact High-Contrast Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 w-full max-w-2xl">
                            <div className="bg-white/5 border border-white/10 rounded-sm p-3.5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <span className="block font-bebas text-lg sm:text-xl text-white leading-none">
                                        Wednesday, Dec 2, 2026
                                    </span>
                                    <span className="block font-oswald text-xs text-white/50 uppercase tracking-wider mt-1">
                                        Date
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-sm p-3.5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <span className="block font-bebas text-lg sm:text-xl text-white leading-none">
                                        6:00 PM EST
                                    </span>
                                    <span className="block font-oswald text-xs text-white/50 uppercase tracking-wider mt-1">
                                        Evening Gathering
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-sm p-3.5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <span className="block font-bebas text-lg sm:text-xl text-white leading-none">
                                        Trump Tower • 19th Fl
                                    </span>
                                    <span className="block font-oswald text-xs text-white/50 uppercase tracking-wider mt-1">
                                        Electrum Gallery, NYC
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-sm p-3.5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center shrink-0">
                                    <Ticket className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <span className="block font-bebas text-lg sm:text-xl text-white leading-none">
                                        $250 / $2,500
                                    </span>
                                    <span className="block font-oswald text-xs text-white/50 uppercase tracking-wider mt-1">
                                        Admission / Sponsor
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="pt-2 flex flex-wrap items-center gap-4">
                            <a
                                href="https://www.zeffy.com/en-US/ticketing/an-exclusive-evening-at-trump-tower-children-of-hezbollah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-red hover:bg-[#a00827] text-white px-8 py-4 text-lg font-bold tracking-[0.2em] font-bebas uppercase transition-all shadow-xl rounded-sm inline-flex items-center gap-3 cursor-pointer"
                            >
                                <span>Reserve Your Seat ($250)</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a
                                href="https://www.zeffy.com/en-US/ticketing/an-exclusive-evening-at-trump-tower-children-of-hezbollah"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative bg-transparent hover:bg-white hover:text-blue border border-white/60 text-white px-8 py-4 text-lg font-bold tracking-[0.2em] font-bebas uppercase transition-all rounded-sm inline-flex items-center gap-3 cursor-pointer"
                            >
                                <Award className="w-5 h-5 text-white group-hover:text-blue" />
                                <span>Become a Sponsor ($2,500)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECTION 2: OFFICIAL INVITATION (Centered & Featuring Book Image) ── */}
            <div className="w-full max-w-5xl mx-auto mb-20 px-2 sm:px-4">
                <div className="bg-blue border border-white/15 p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl relative text-center flex flex-col items-center">

                    {/* Official Letter Header */}
                    <div className="border-b border-white/10 pb-6 mb-8 w-full max-w-2xl mx-auto text-center">
                        <span className="inline-block bg-white/10 text-white font-oswald text-xs uppercase tracking-[0.25em] font-medium px-3.5 py-1 rounded-sm mb-3">
                            Official Invitation
                        </span>
                        <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase leading-tight">
                            From the Office of the Chairman
                        </h2>
                        <p className="font-oswald text-white/60 text-sm uppercase tracking-wider mt-1">
                            American Lebanon Education Foundation (ALEF)
                        </p>
                    </div>

                    {/* Featured Book Showcase right in Section 2 */}
                    <div className="my-6 flex flex-col items-center">
                        <div
                            className="relative w-44 sm:w-52 md:w-60 aspect-[1/1.4] rounded-md overflow-hidden border border-white/20 shadow-[0_25px_50px_rgba(0,0,0,0.85)] cursor-pointer group/book transition-transform hover:scale-105"
                            onClick={() => setSelectedImage("/events/children-of-hezbollah.jpg")}
                            title="Click to view full cover"
                        >
                            <Image
                                src="/events/children-of-hezbollah.jpg"
                                alt="Children of Hezbollah Book Cover by Ali Khalife"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <p className="font-oswald text-xs uppercase tracking-widest text-white/50 mt-3 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-red" />
                            <span>Featured Publication • Click cover to zoom</span>
                        </p>
                    </div>

                    {/* Centered Letter Body */}
                    <div className="max-w-3xl mx-auto space-y-6 font-oswald text-white/80 text-lg md:text-xl leading-relaxed text-center">
                        <p className="font-bold text-white text-xl">
                            Dear Friends, Supporters and Sponsors,
                        </p>
                        <p>
                            I hope this finds you well.
                        </p>
                        <p>
                            The American Lebanon Education Foundation (ALEF) invites you to an exclusive evening at Trump Tower in New York City on <strong className="text-white">Wednesday December 2nd at 6:00 pm</strong>.
                        </p>
                        <p>
                            We are hosting this gathering to introduce <strong className="text-white italic">Children of Hezbollah</strong>, by Lebanese Shiite leader <strong className="text-white">Ali Khalife</strong>. The book examines how children are drawn into extremist ideology, and the evening is meant to bring that message to readers, educators, and policymakers.
                        </p>
                        <p>
                            This is more than a fundraiser. It is a chance to stand behind education, freedom of thought, and the right of Lebanon&rsquo;s next generation to grow up with hope rather than hatred.
                        </p>

                        {/* Highlighted Callout Quote */}
                        <div className="my-8 border-y border-white/15 bg-white/5 py-6 px-8 rounded-sm shadow-lg">
                            <p className="font-bebas text-2xl sm:text-3xl text-white tracking-wide leading-snug">
                                &ldquo;What happens to a nation when its children are taught to embrace extremism instead of opportunity, education, and peace?&rdquo;
                            </p>
                        </div>

                        <p>
                            Your presence supports the translation, publication, release, and distribution of <strong className="text-white italic">Children of Hezbollah</strong>, so the book followed by a massive media campaign can reach readers and concerned citizens beyond Lebanon.
                        </p>
                        <p>
                            The evening will bring together people committed to confronting extremism, defending freedom of thought, and building a better future for Lebanon.
                        </p>

                        {/* Mission Vision */}
                        <p>
                            We invite you to be part of a mission that crosses politics and sectarian lines: to protect children from indoctrination to challenge extremism through knowledge, and to help Lebanon reclaim its future.
                        </p>
                        <p className="text-white font-medium">
                            The future of Lebanon cannot be built by sacrificing its children to extremism. It must be built by empowering them through education, freedom, and opportunity.
                        </p>

                        {/* Sign-off */}
                        <div className="pt-8 border-t border-white/10 text-center w-full">
                            <p className="text-white/60 mb-2">With gratitude,</p>
                            <p className="font-bebas text-2xl md:text-3xl text-white leading-none">Ziad K. Abdelnour</p>
                            <p className="text-white/80 font-semibold text-sm tracking-widest uppercase mt-1">Founding Chairman</p>
                            <p className="text-white/70 text-sm">American Lebanon Education Foundation (ALEF)</p>
                            <p className="text-white/50 text-xs mt-2">
                                445 Park Avenue, New York, NY 10022 •{" "}
                                <a
                                    href="https://www.Usalef.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors underline"
                                >
                                    www.Usalef.org
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RESERVATION / BOOKING SECTION ── */}
            <div id="reserve" className="w-full max-w-5xl mx-auto mb-20 px-2 sm:px-4">
                <div className="bg-blue border border-white/15 p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl relative overflow-hidden">
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <div>
                            <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 font-oswald text-xs uppercase tracking-[0.25em] font-medium px-3.5 py-1.5 rounded-sm">
                                <Ticket className="w-3.5 h-3.5 text-white" />
                                Seats &amp; Sponsorship
                            </span>
                        </div>

                        <h3 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-none">
                            Reserve Your Seat
                        </h3>

                        <p className="font-oswald text-white/75 text-lg md:text-xl leading-relaxed">
                            Join leaders, policymakers, educators, and friends of freedom at Trump Tower on December 2nd. Every ticket directly funds the distribution of <span className="text-white italic font-semibold">Children of Hezbollah</span> and its media campaign.
                        </p>

                        {/* Tier Cards */}
                        <div className="grid sm:grid-cols-2 gap-6 pt-4 text-left">
                            {/* Standard Entry */}
                            <div className="bg-black/35 border border-white/15 p-6 sm:p-8 rounded-sm flex flex-col justify-between">
                                <div>
                                    <span className="font-oswald text-xs uppercase text-white/50 tracking-widest block mb-1">
                                        Standard Entry
                                    </span>
                                    <h4 className="font-bebas text-3xl text-white mb-2">General Admission</h4>
                                    <div className="font-bebas text-4xl sm:text-5xl text-white mb-4">
                                        $250 <span className="text-sm font-oswald text-white/60 uppercase">/ person</span>
                                    </div>
                                    <p className="font-oswald text-white/70 text-sm leading-relaxed mb-6">
                                        Admission to the exclusive evening at Trump Tower, cocktail reception, and author presentation. Admission is the contribution.
                                    </p>
                                </div>
                                <a
                                    href="https://www.zeffy.com/en-US/ticketing/an-exclusive-evening-at-trump-tower-children-of-hezbollah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center bg-red hover:bg-[#a00827] text-white py-3.5 px-6 font-bebas text-xl uppercase tracking-wider transition-colors block rounded-sm shadow-lg font-bold"
                                >
                                    Reserve Ticket ($250)
                                </a>
                            </div>

                            {/* Sponsorship */}
                            <div className="bg-black/35 border-2 border-white/30 p-6 sm:p-8 rounded-sm flex flex-col justify-between relative shadow-xl">
                                <div className="absolute top-0 right-0 bg-red text-white text-[10px] font-oswald uppercase tracking-widest px-3 py-1 font-bold">
                                    Key Supporter
                                </div>
                                <div>
                                    <span className="font-oswald text-xs uppercase text-white/60 tracking-widest block mb-1">
                                        Premier Level
                                    </span>
                                    <h4 className="font-bebas text-3xl text-white mb-2">Event Sponsorship</h4>
                                    <div className="font-bebas text-4xl sm:text-5xl text-white mb-4">
                                        $2,500 <span className="text-sm font-oswald text-white/60 uppercase">/ package</span>
                                    </div>
                                    <p className="font-oswald text-white/70 text-sm leading-relaxed mb-6">
                                        Recognized as an official sponsor supporting the publication, translation, and nationwide media mobilization campaign.
                                    </p>
                                </div>
                                <a
                                    href="https://www.zeffy.com/en-US/ticketing/an-exclusive-evening-at-trump-tower-children-of-hezbollah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center bg-white text-blue hover:bg-white/90 py-3.5 px-6 font-bebas text-xl uppercase tracking-wider transition-colors block font-bold rounded-sm shadow-lg"
                                >
                                    Become a Sponsor ($2,500)
                                </a>
                            </div>
                        </div>

                        {/* Guest Attendance Note */}
                        <div className="pt-6 border-t border-white/10 text-white/70 font-oswald text-sm">
                            <p className="italic">
                                If you are attending with a guest, please clear the name with us in advance.
                            </p>
                        </div>

                        {/* Alternative Contribution */}
                        <div className="pt-4 bg-white/5 border border-white/10 p-6 rounded-sm text-center">
                            <HeartHandshake className="w-8 h-8 text-white mx-auto mb-2 opacity-80" />
                            <h5 className="font-bebas text-2xl text-white uppercase mb-2">
                                Cannot attend in person?
                            </h5>
                            <p className="font-oswald text-white/70 text-base max-w-xl mx-auto mb-4">
                                You can always support our educational mission and youth empowerment programs from anywhere:
                            </p>
                            <a
                                href="https://usalef.org/campaigns/alef-youth-sovereignty-academy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white hover:text-red font-oswald font-semibold text-sm uppercase tracking-widest underline transition-colors"
                            >
                                <span>Support ALEF Youth Sovereignty Academy</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BACK BUTTON ── */}
            <div className="flex justify-center mt-4">
                <Link href="/events">
                    <button className="group relative bg-transparent border border-foreground/70 text-foreground px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase font-oswald overflow-hidden transition-all hover:border-foreground/50 isolate cursor-pointer">
                        <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                            Back to All Events
                        </span>
                        <div className="absolute inset-0 bg-foreground transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10"></div>
                    </button>
                </Link>
            </div>

            {/* ── IMAGE LIGHTBOX MODAL ── */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 bg-red hover:bg-[#a00827] text-white p-3 rounded-full transition-colors shadow-2xl"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div
                        className="relative w-full max-w-5xl h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Full screen photo"
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </div>
                </div>
            )}

        </main>
    );
}
