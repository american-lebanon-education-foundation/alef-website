import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

const sponsors = [
    {
        id: "blackhawk",
        logo: "/ourSponsors/Blackhawk Partners.png"
    },
    {
        id: "capitol",
        logo: "/ourSponsors/The Capitol Institute.png"
    },
    {
        id: "nic",
        logo: "/ourSponsors/National Iranian Congress.png"
    },
    {
        id: "guardians",
        logo: "/ourSponsors/Flag_of_the_Guardians_of_the_Cedars.svg.png"
    }
];

export default function SponsorsPage() {
    const t = useTranslations('SponsorsPage');

    const activeSponsors = sponsors.filter((sponsor) => {
        if (AD_GRANTS_REVIEW_MODE) {
            return sponsor.id !== "nic" && sponsor.id !== "guardians";
        }
        return true;
    });

    return (
        <main className="min-h-screen bg-background pt-24 md:pt-32 pb-16 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                        <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold">
                            {t('header.subtitle')}
                        </span>
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red rounded-full animate-pulse"></span>
                    </div>

                    <AnimatedTitle
                        text={t('header.title')}
                        className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
                    />

                    <p className="font-oswald text-foreground/60 text-lg max-w-2xl mx-auto">
                        {t('header.description')}
                    </p>

                    {/* Sponsor Funds Disclaimer */}
                    <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-6 py-3 max-w-2xl mx-auto">
                        <p className="font-oswald text-foreground/70 text-sm md:text-base leading-relaxed">
                            {t('header.fundsDisclaimer')}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {activeSponsors.map((sponsor) => (
                        <div
                            key={sponsor.id}
                            className="bg-blue border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 relative p-8 shadow-xl items-center sm:items-start text-center sm:text-left"
                        >
                            {/* Logo area */}
                            <div className="bg-white rounded-xl flex items-center justify-center p-6 h-40 w-full relative overflow-hidden shadow-inner mb-6">
                                <Image
                                    src={sponsor.logo}
                                    alt={`${t(`partners.list.${sponsor.id}.name`)} logo`}
                                    fill
                                    className="object-contain p-4 relative z-10"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-4 flex-1 items-center sm:items-start text-center sm:text-left">
                                <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-wide">
                                    {t(`partners.list.${sponsor.id}.name`)}
                                </h3>

                                <p className="font-oswald text-white/60 text-base leading-relaxed flex-1 mt-2">
                                    {t(`partners.list.${sponsor.id}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center pt-12 border-t border-foreground/10">
                    <p className="font-oswald text-foreground/50 uppercase tracking-widest text-sm mb-6">
                        {t('cta.text')}
                    </p>
                    <Link href="/donate" className="inline-block bg-red hover:bg-[#c4151c] text-white px-8 py-3 uppercase font-oswald tracking-widest text-sm rounded transition-colors shadow-lg shadow-red/20">
                        {t('cta.button')}
                    </Link>
                </div>

            </div>
        </main>
    );
}
