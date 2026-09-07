import Hero from "@/app/components/HomeCom/Hero";
import PresidentialLetter from "@/app/components/HomeCom/PresidentialLetter";
import ChairmanMessage from "@/app/components/HomeCom/ChairmanMessage";
import WhoWeAre from "@/app/components/HomeCom/WhoWeAre";
import dynamic from "next/dynamic";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";

export const revalidate = 60;

// Below-fold sections — loaded lazily after initial paint
const BlogsAndArticles = dynamic(() => import("@/app/components/HomeCom/BlogsAndArticles"));
const AlliedOrganizations = dynamic(() => import("@/app/components/HomeCom/AliiedOrganizations"));
const HouseOfCorruption = dynamic(() => import("@/app/components/HomeCom/HouseOfCorruption"));
const HouseOfCards = dynamic(() => import("@/app/components/HomeCom/HouseOfCards"));
const Media = dynamic(() => import("@/app/components/HomeCom/Media"));
const CTASection = dynamic(() => import("@/app/components/CommonCom/CTASection"));

export default function Home() {
  return (
    <main>
      <Hero />
      {!AD_GRANTS_REVIEW_MODE && <PresidentialLetter />}
      <ChairmanMessage />
      <WhoWeAre />
      <CTASection type="subscribe" />
      <HouseOfCorruption />
      {!AD_GRANTS_REVIEW_MODE && <HouseOfCards />}
      <CTASection type="donate" />
      <BlogsAndArticles />
      <CTASection type="join" />
      <AlliedOrganizations />

      <Media />
    </main>
  );
}