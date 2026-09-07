import SkeletonImage from "../CommonCom/SkeletonImage";
import AnimatedTitle from "../CommonCom/AnimatedTitle";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

export default function HouseOfCorruption() {
    const t = useTranslations('HouseOfCorruption');
    const locale = useLocale();

    const titleText = AD_GRANTS_REVIEW_MODE ? t('reviewTitle') : t('title');
    const cardTitleText = AD_GRANTS_REVIEW_MODE ? t('reviewCardTitle') : t('cardTitle');
    const p1Content = AD_GRANTS_REVIEW_MODE ? t.raw('reviewP1') : t.raw('p1');
    const p2Content = AD_GRANTS_REVIEW_MODE ? t.raw('reviewP2') : t.raw('p2');
    const p3Content = AD_GRANTS_REVIEW_MODE ? t('reviewP3') : t('p3');
    const buttonText = AD_GRANTS_REVIEW_MODE ? t('reviewButton') : t('button');

    return (
        <section className="py-12 md:py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center justify-center mb-6 md:mb-12 pb-6 gap-4 text-center">
                    <AnimatedTitle
                        text={titleText}
                        className="text-4xl md:text-6xl font-bold font-bebas text-foreground uppercase leading-none"
                    />
                    <div className="flex items-center gap-2 text-foreground/60 font-oswald text-xs tracking-widest">
                        <span className="w-2 h-2 bg-red rounded-full inline-block"></span>
                        {t('subtitle')}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-blue rounded-2xl p-8 md:p-12 flex flex-col justify-between min-h-[550px] h-auto md:h-[600px] relative group">
                        <div className="flex justify-between items-start mb-8 font-oswald text-xs tracking-widest text-white/60">
                            <span>{t('caseFile')}</span>
                            <span>{t('totalLosses')}</span>
                        </div>

                        <div className="space-y-8 relative z-10 flex-1">
                            <div className="space-y-4">
                                <h3 className="text-3xl md:text-5xl text-white font-bebas tracking-wide leading-none">
                                    {cardTitleText}
                                </h3>
                            </div>

                            <div className="space-y-4 text-base md:text-lg text-white/60 font-oswald leading-relaxed">
                                <p dangerouslySetInnerHTML={{ __html: p1Content }} />
                                <p dangerouslySetInnerHTML={{ __html: p2Content }} />
                                <p>{p3Content}</p>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20 flex justify-between items-center">
                            <Link
                                href="/house-of-corruption"
                                className="group/btn flex items-center gap-4 w-full justify-between relative"
                            >
                                <span className="text-white font-bebas text-lg md:text-xl tracking-wider group-hover/btn:text-red transition-colors relative">
                                    {buttonText}
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-red transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-right group-hover/btn:origin-left ease-out"></span>
                                </span>
                                <div className="md:w-12 md:h-12 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover/btn:bg-red group-hover/btn:border-red transition-all duration-300 bg-theme-black">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-blue rounded-2xl p-2 h-[500px] md:h-[600px] relative overflow-hidden group">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            <SkeletonImage
                                src={
                                    locale === 'ar' ? '/houseOfCorruption/house-of-corruption-img-7-arabic.webp' :
                                        locale === 'fr' ? '/houseOfCorruption/house-of-corruption-img-7-french.webp' :
                                            locale === 'es' ? '/houseOfCorruption/house-of-corruption-img-7-spanish.webp' :
                                                '/houseOfCorruption/house-of-corruption-img-7.jpg'
                                }
                                alt="$1 Trillion Robbery"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}