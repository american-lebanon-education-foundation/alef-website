"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import AnimatedTitle from "@/app/components/CommonCom/AnimatedTitle";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { sendGAEvent } from "@next/third-parties/google";
import { 
  ShieldAlert, 
  Users, 
  Globe, 
  TrendingUp, 
  FileText, 
  Scale, 
  Megaphone, 
  Award, 
  Briefcase, 
  BookOpen, 
  PhoneCall, 
  DollarSign, 
  Check
} from "lucide-react";

export default function HaaCampaignPage() {
  const t = useTranslations("HaaCampaignPage");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // Signature state
  const [baseSignatures, setBaseSignatures] = useState(0);
  const signatureGoal = 15000;
  const [signatures, setSignatures] = useState(0);
  const [hasSigned, setHasSigned] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const heroRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Fetch real petition count from GoHighLevel
  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/petition-count");
        if (res.ok) {
          const data = await res.json();
          setBaseSignatures(data.count || 0);
        }
      } catch (err) {
        console.error("Failed to fetch petition count:", err);
      }
    }
    fetchCount();
  }, []);

  // Animate counter on load or when count updates
  useEffect(() => {
    const start = 0;
    const end = hasSigned ? baseSignatures + 1 : baseSignatures;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function (cubic out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setSignatures(Math.round(start + easedProgress * (end - start)));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setSignatures(end);
      }
    }

    requestAnimationFrame(updateCounter);
  }, [baseSignatures, hasSigned]);

  // Track scroll position to toggle sticky progress bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isScrollingDown = scrollPosition > lastScrollY.current;

      // Show sticky bar whenever scrolling down and not at the very top
      if (scrollPosition > 10 && isScrollingDown) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }

      // Update last scroll position (ensuring it's not negative on iOS bouncy scroll)
      lastScrollY.current = Math.max(0, scrollPosition);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Form submission handler
  const handleSignPetition = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormError("");

    try {
      const res = await fetch("/api/sign-petition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormStatus("success");
        setHasSigned(true);
        sendGAEvent("event", "petition_signed", {
          event_category: "campaign",
          event_label: "hezbollah_accountability_act_petition",
        });
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      } else {
        setFormStatus("error");
        setFormError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Sign petition error:", err);
      setFormStatus("error");
      setFormError("Failed to connect to the server. Please check your internet connection and try again.");
    }
  };

  const progressPercentage = Math.min((signatures / signatureGoal) * 100, 100);

  // Pillars list matching translate keys
  const pillars = [
    { key: "financial", icon: <DollarSign className="w-6 h-6 text-white" /> },
    { key: "sovereign", icon: <Scale className="w-6 h-6 text-white" /> },
    { key: "congressional", icon: <Briefcase className="w-6 h-6 text-white" /> },
    { key: "diaspora", icon: <Megaphone className="w-6 h-6 text-white" /> },
  ];

  // Activities list matching translate keys
  const activities = [
    { key: "01" },
    { key: "02" },
    { key: "03" },
    { key: "04" },
    { key: "05" },
    { key: "06" },
  ];

  // Task force roles
  const roles = [
    { key: "legal", icon: <Scale className="w-5 h-5 text-white" /> },
    { key: "financial", icon: <DollarSign className="w-5 h-5 text-white" /> },
    { key: "intelligence", icon: <ShieldAlert className="w-5 h-5 text-white" /> },
    { key: "policy", icon: <FileText className="w-5 h-5 text-white" /> },
    { key: "diaspora", icon: <Users className="w-5 h-5 text-white" /> },
    { key: "communications", icon: <Megaphone className="w-5 h-5 text-white" /> },
  ];

  // Budget items
  const budgetItems = [
    { key: "research", range: "$55k – $80k" },
    { key: "briefings", range: "$20k – $30k" },
    { key: "ads", range: "$15k – $20k" },
    { key: "content", range: "$10k – $15k" },
    { key: "admin", range: "$5k – $10k" },
  ];

  // Awareness strategies
  const awarenessStrategies = [
    { key: "visibility", icon: <BookOpen className="w-6 h-6 text-white" /> },
    { key: "thought", icon: <Award className="w-6 h-6 text-white" /> },
    { key: "pitches", icon: <FileText className="w-6 h-6 text-white" /> },
    { key: "infographics", icon: <Globe className="w-6 h-6 text-white" /> },
    { key: "updates", icon: <TrendingUp className="w-6 h-6 text-white" /> },
    { key: "webinars", icon: <PhoneCall className="w-6 h-6 text-white" /> },
  ];

  // Tiers benefits helper
  const getTierBenefits = (tierKey: "supporter" | "advocate" | "guardian") => {
    try {
      const val = t.raw(`donate.tiers.${tierKey}.benefits`);
      if (Array.isArray(val)) {
        return val;
      }
    } catch {
      // ignore
    }
    return [];
  };

  // Outcomes list helper
  const getOutcomes = () => {
    try {    
      const val = t.raw("outcomes.list");
      if (Array.isArray(val)) {
        return val;
      }
    } catch {
      // ignore
    }
    return [];   
  };

  const getOutcomeNumbers = () => {
    try {    
      const val = t.raw("outcomes.numbers");
      if (Array.isArray(val)) {
        return val;
      }
    } catch {
      // ignore
    }
    return ["5+", "15k+", "20+", "8k+", "1k+", "12"];   
  };

  const outcomes = getOutcomes();
  const outcomeNumbers = getOutcomeNumbers();

  return (
    <main className="min-h-screen bg-background relative">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} 
        />
      </div>

      {/* --- HERO SECTION --- */}
      <div ref={heroRef} className="relative pt-32 pb-20 md:pb-28 px-4 md:px-12 lg:px-24 border-b border-white/5 overflow-hidden">
        {/* Floating cedar watermark behind hero */}
        <div className="absolute right-0 bottom-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] opacity-[0.02] pointer-events-none translate-x-1/4 translate-y-1/4 select-none">
          <svg viewBox="0 0 400 500" fill="currentColor" className="w-full h-full text-white">
            <path d="M200 480 L200 220 M200 220 L130 300 M200 220 L270 300 M200 300 L100 380 M200 300 L300 380 M200 160 L150 240 M200 160 L250 240 M200 110 L165 170 M200 110 L235 170 M200 70 L178 110 M200 70 L222 110 M200 40 L190 70 M200 40 L210 70" stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none"/>
            <ellipse cx="200" cy="30" rx="18" ry="12"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 relative z-10 flex flex-col items-center text-center">
          <div className="space-y-4 md:space-y-6 flex flex-col items-center">
            <div className="inline-block py-1.5 px-4 rounded border border-red/30 bg-red/10 text-red font-oswald text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">
              {t("billStamp")}
            </div>
            
            <div className="space-y-2">
              <AnimatedTitle
                as="h1"
                text={t("heroTitle1") || "Hold Hezbollah Accountable."}
                className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none"
              />
              <AnimatedTitle
                text={t("heroTitle2") || "Restore Lebanon's Sovereignty."}
                className="text-4xl md:text-7xl lg:text-8xl font-bold font-bebas text-foreground uppercase leading-none mt-1"
              />
            </div>

            <p className="font-oswald text-base md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
              {t("heroSub")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a 
              href="https://www.zeffy.com/en-US/donation-form/support-the-hezbollah-accountability-act"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-red hover:bg-[#b0151b] text-white px-8 py-4 font-bold tracking-wider transition-all font-oswald uppercase hover:shadow-[0_0_20px_rgba(227,27,35,0.3)] text-sm cursor-pointer border border-transparent isolate"
            >
              <span className="relative z-10 tracking-wider">{t("ctaFund")}</span>
              <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out z-0" />
            </a>
            <a 
              href="#petition"
              onClick={(e) => handleScrollTo(e, "petition")}
              className="group relative bg-transparent border border-foreground/30 hover:border-black text-foreground px-8 py-4 font-bold tracking-wider transition-all font-oswald uppercase text-sm cursor-pointer overflow-hidden isolate"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">{t("ctaPetition")}</span>
              <div className="absolute inset-0 bg-black transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10" />
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12 md:pt-16 border-t border-foreground/10">
            <div className="space-y-2">
              <div className="font-bebas text-4xl md:text-6xl text-foreground font-bold">5+</div>
              <div 
                className="font-oswald text-[10px] md:text-xs text-foreground/50 uppercase tracking-widest leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("stats.congressMembers") }}
              />
            </div>
            <div className="space-y-2">
              <div className="font-bebas text-4xl md:text-6xl text-foreground font-bold">12</div>
              <div 
                className="font-oswald text-[10px] md:text-xs text-foreground/50 uppercase tracking-widest leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("stats.briefingsPlanned") }}
              />
            </div>
            <div className="space-y-2">
              <div className="font-bebas text-4xl md:text-6xl text-foreground font-bold">8</div>
              <div 
                className="font-oswald text-[10px] md:text-xs text-foreground/50 uppercase tracking-widest leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("stats.taskForce") }}
              />
            </div>
            <div className="space-y-2">
              <div className="font-bebas text-4xl md:text-6xl text-red font-bold">$150k</div>
              <div 
                className="font-oswald text-[10px] md:text-xs text-foreground/50 uppercase tracking-widest leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("stats.campaignGoal") }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 lg:px-24 pt-16 pb-40 md:py-24 space-y-20 md:space-y-32 z-10 relative">

        {/* --- SECTION 1: THE CHALLENGE --- */}
        <section className="space-y-10 md:space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
              {t("challenge.tag")}
            </span>
            <AnimatedTitle 
              as="h2"
              text={t("challenge.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-foreground uppercase leading-tight"
            />
            <p className="font-oswald text-base md:text-lg text-foreground/75 leading-relaxed max-w-4xl">
              {t("challenge.lead")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4">
            {pillars.map((pillar) => (
              <div 
                key={pillar.key} 
                className="p-6 md:p-8 bg-blue border border-white/10 rounded-2xl flex gap-5 items-start hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/10"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg flex items-center justify-center shrink-0">
                  {pillar.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bebas text-2xl text-white tracking-wide">
                    {t(`challenge.pillars.${pillar.key}.title`)}
                  </h3>
                  <p className="font-oswald text-sm md:text-base text-white/70 leading-relaxed">
                    {t(`challenge.pillars.${pillar.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: THE TASK FORCE --- */}
        <section className="space-y-10 md:space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
              {t("taskForce.tag")}
            </span>
            <AnimatedTitle 
              as="h2"
              text={t("taskForce.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-foreground uppercase leading-tight"
            />
            <p className="font-oswald text-base md:text-lg text-foreground/75 leading-relaxed max-w-4xl">
              {t("taskForce.lead")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div 
                key={role.key} 
                className="p-6 bg-blue border border-white/10 rounded-xl relative overflow-hidden flex flex-col justify-between shadow-lg"
              >
                {/* Subtle corner detail */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/2 rounded-bl-3xl"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg flex items-center justify-center">
                    {role.icon}
                  </div>
                  <div>
                    <span className="inline-block bg-linear-to-br from-red to-red/60 text-white border border-white/10 shadow-sm text-[10px] px-2.5 py-1 rounded font-oswald tracking-widest uppercase font-bold mb-2">
                      {t(`taskForce.roles.${role.key}.role`)}
                    </span>
                    <h3 className="font-bebas text-xl text-white leading-tight">
                      {t(`taskForce.roles.${role.key}.title`)}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: KEY ACTIVITIES --- */}
        <section className="space-y-10 md:space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
              {t("activities.tag")}
            </span>
            <AnimatedTitle 
              as="h2"
              text={t("activities.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-foreground uppercase leading-tight"
            />
            <p className="font-oswald text-base md:text-lg text-foreground/75 leading-relaxed max-w-4xl">
              {t("activities.lead")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <div 
                key={act.key} 
                className="p-6 bg-blue border border-white/10 rounded-xl flex gap-5 items-start hover:border-white/20 transition-all duration-300 shadow-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg flex items-center justify-center font-bebas text-lg text-white font-bold shrink-0">
                  {act.key}
                </div>
                <div className="space-y-2">
                  <h4 className="font-bebas text-lg text-white tracking-wide">
                    {t(`activities.list.${act.key}.title`)}
                  </h4>
                  <p className="font-oswald text-xs md:text-sm text-white/60 leading-relaxed">
                    {t(`activities.list.${act.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: 12-MONTH OUTCOMES --- */}
        <section className="space-y-10 md:space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
              {t("outcomes.tag")}
            </span>
            <AnimatedTitle 
              as="h2"
              text={t("outcomes.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-foreground uppercase leading-tight"
            />
            <p className="font-oswald text-base md:text-lg text-foreground/75 leading-relaxed max-w-4xl">
              {t("outcomes.lead")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {outcomes.map((desc, idx) => {
              return (
                <div 
                  key={idx} 
                  className="p-6 md:p-8 bg-blue border border-white/10 rounded-2xl flex flex-col justify-between hover:border-red/20 hover:translate-y-[-2px] transition-all duration-300 shadow-md"
                >
                  <div className="px-4 py-1.5 rounded-xl bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg flex items-center justify-center font-bebas text-4xl md:text-5xl text-white font-bold shrink-0 mb-4 self-start select-none">
                    {outcomeNumbers[idx] || (idx + 1)}
                  </div>
                  <p className="font-oswald text-sm md:text-base text-white/85 leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- SECTION 5: BUDGET --- */}
        <section className="space-y-10 md:space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
              {t("budget.tag")}
            </span>
            <AnimatedTitle 
              as="h2"
              text={t("budget.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-foreground uppercase leading-tight"
            />
            <p className="font-oswald text-base md:text-lg text-foreground/75 leading-relaxed max-w-4xl">
              {t("budget.lead")}
            </p>
          </div>

          <div className="bg-blue border border-white/10 p-6 md:p-12 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 rounded-bl-full"></div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-oswald border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 text-white/50 text-xs md:text-sm uppercase tracking-widest font-medium">
                      {t("budget.headers.item")}
                    </th>
                    <th className="py-4 text-white/50 text-xs md:text-sm uppercase tracking-widest font-medium text-right">
                      {t("budget.headers.range")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budgetItems.map((item) => (
                    <tr key={item.key} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="py-4.5 text-white font-medium text-sm md:text-base">
                        {t(`budget.items.${item.key}`)}
                      </td>
                      <td className="py-4.5 text-right">
                        <span className="px-3 py-1 rounded-lg bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg text-white font-bold text-xs md:text-sm inline-block select-none">
                          {item.range}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
              <span className="font-bebas text-lg md:text-2xl text-white uppercase tracking-wider">
                {t("budget.total")}
              </span>
              <span className="px-4 py-2 rounded-xl bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg font-bebas text-2xl md:text-4xl text-white font-bold inline-block select-none">
                $100k – $150k
              </span>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: PETITION FORM --- */}
        <section id="petition" className="scroll-mt-32">
          <div className="bg-blue border border-white/10 px-5 py-8 md:p-16 rounded-3xl relative overflow-hidden shadow-2xl">
            {/* Background glowing circle decorator */}
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red/10 rounded-full blur-3xl pointer-events-none"></div>

            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center space-y-6 py-10 animate-fade-in text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] mb-2">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>

                <AnimatedTitle 
                  as="h2"
                  text={t("petition.successTitle") || "Thank You"}
                  className="text-4xl md:text-6xl font-bebas text-white uppercase leading-none"
                />

                <p className="text-white/80 font-oswald text-base md:text-xl max-w-xl mx-auto leading-relaxed">
                  {t("petition.successMsg")}
                </p>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
                <div className="text-center space-y-4">
                  <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
                    {t("petition.sticky.label")}
                  </span>
                  <AnimatedTitle 
                    as="h2"
                    text={t("petition.title")}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-white uppercase leading-none"
                  />
                  <p className="font-oswald text-sm md:text-base text-white/60 leading-relaxed max-w-2xl mx-auto">
                    {t("petition.description")}
                  </p>
                </div>

                {/* Progress bar inside form card */}
                <div className="space-y-3 max-w-xl mx-auto bg-black/20 p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center text-xs md:text-sm font-oswald uppercase tracking-wider">
                    <span className="text-white/70">{t("petition.sticky.label")}</span>
                    <div className="flex gap-1.5 items-center">
                      <span className="px-3 py-1 rounded-lg bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg text-white font-bold font-bebas text-lg md:text-xl inline-block select-none leading-none">
                        {signatures.toLocaleString()}
                      </span>
                      <span className="text-white/70">{t("petition.sticky.goal")}</span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSignPetition} className="max-w-2xl mx-auto pt-4 space-y-5 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-white/60 font-oswald text-xs uppercase tracking-wider block mb-1">
                        {t("petition.fields.firstName")}
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder={t("petition.fields.firstName")}
                        className="w-full bg-background text-foreground px-4 py-3 md:py-3.5 border border-white/10 rounded-sm font-oswald text-sm md:text-base focus:border-red focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-white/60 font-oswald text-xs uppercase tracking-wider block mb-1">
                        {t("petition.fields.lastName")}
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder={t("petition.fields.lastName")}
                        className="w-full bg-background text-foreground px-4 py-3 md:py-3.5 border border-white/10 rounded-sm font-oswald text-sm md:text-base focus:border-red focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-white/60 font-oswald text-xs uppercase tracking-wider block mb-1">
                        {t("petition.fields.email")}
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("petition.fields.email")}
                        className="w-full bg-background text-foreground px-4 py-3 md:py-3.5 border border-white/10 rounded-sm font-oswald text-sm md:text-base focus:border-red focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-white/60 font-oswald text-xs uppercase tracking-wider block mb-1">
                        {t("petition.fields.phone")}
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="US"
                        placeholder={t("petition.fields.phone")}
                        value={formData.phone}
                        onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                        className="w-full bg-background text-foreground px-4 py-3 border border-white/10 rounded-sm font-oswald text-sm md:text-base focus-within:border-red transition-colors flex items-center gap-2 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-foreground [&_.PhoneInputCountry]:mr-2 [&_.PhoneInputCountrySelect]:bg-background [&_.PhoneInputCountrySelect]:text-foreground"
                      />
                    </div>
                  </div>

                  {formError && (
                    <p className="text-red font-oswald text-xs uppercase tracking-wider text-center pt-2">
                      {formError}
                    </p>
                  )}

                  <button 
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full bg-red hover:bg-[#b0151b] text-white px-8 py-4 font-bold tracking-wider transition-all font-oswald uppercase hover:shadow-[0_0_20px_rgba(227,27,35,0.4)] text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "loading" ? t("petition.btnSigning") : t("petition.btnSign")}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* --- SECTION 7: DONOR TIERS --- */}
        <section id="donate" className="scroll-mt-32 space-y-10 md:space-y-12">
          <div className="space-y-4 text-center">
            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
              {t("donate.tag")}
            </span>
            <AnimatedTitle 
              as="h2"
              text={t("donate.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-foreground uppercase leading-tight"
            />
            <p className="font-oswald text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto">
              {t("donate.lead")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 items-stretch">
            {/* Tier 1: Supporter */}
            <div className="p-6 md:p-8 bg-blue border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/10">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-6">
                  <span className="font-oswald text-[10px] text-red/80 tracking-widest uppercase font-bold block">
                    {t("donate.tiers.startingAt")}
                  </span>
                  <h3 className="font-bebas text-3xl text-white leading-tight">
                    $100 — {t("donate.tiers.supporter.name")}
                  </h3>
                </div>
                
                <ul className="space-y-3.5 font-oswald text-white/70 text-sm md:text-base leading-relaxed">
                  {getTierBenefits("supporter").map((benefit, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-white bg-red rounded-full p-1 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="https://www.zeffy.com/en-US/donation-form/support-the-hezbollah-accountability-act"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-3.5 uppercase tracking-widest font-oswald text-xs transition-colors"
              >
                {t("donate.tiers.contribute", { amount: "$100" })}
              </a>
            </div>

            {/* Tier 2: Advocate */}
            <div className="p-6 md:p-8 bg-blue border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-xl shadow-black/10">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-6">
                  <span className="font-oswald text-[10px] text-red/80 tracking-widest uppercase font-bold block">
                    {t("donate.tiers.advocateTier")}
                  </span>
                  <h3 className="font-bebas text-3xl text-white leading-tight">
                    $500 — {t("donate.tiers.advocate.name")}
                  </h3>
                </div>
                
                <ul className="space-y-3.5 font-oswald text-white/70 text-sm md:text-base leading-relaxed">
                  {getTierBenefits("advocate").map((benefit, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-white bg-red rounded-full p-1 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="https://www.zeffy.com/en-US/donation-form/support-the-hezbollah-accountability-act"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block text-center bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-3.5 uppercase tracking-widest font-oswald text-xs transition-colors"
              >
                {t("donate.tiers.contribute", { amount: "$500" })}
              </a>
            </div>

            {/* Tier 3: Guardian (Featured) */}
            <div className="p-6 md:p-8 bg-linear-to-br from-[#021024] to-blue border-2 border-red rounded-2xl flex flex-col justify-between lg:scale-105 relative z-10 shadow-2xl shadow-red-950/10">
              {/* Featured Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red text-white text-[10px] md:text-xs font-bold font-oswald tracking-[0.2em] px-4 py-1.5 uppercase rounded-full shadow-lg shadow-red-950/20">
                {t("donate.tiers.flagshipTier")}
              </div>

              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-6 pt-2">
                  <span className="font-oswald text-[10px] text-red tracking-widest uppercase font-bold block">
                    {t("donate.tiers.flagshipTier")}
                  </span>
                  <h3 className="font-bebas text-3xl text-white leading-tight">
                    $2,500+ — {t("donate.tiers.guardian.name")}
                  </h3>
                </div>
                
                <ul className="space-y-3.5 font-oswald text-white/90 text-sm md:text-base leading-relaxed">
                  {getTierBenefits("guardian").map((benefit, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Check className="w-5 h-5 text-white bg-red rounded-full p-1 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="https://www.zeffy.com/en-US/donation-form/support-the-hezbollah-accountability-act"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block text-center bg-red hover:bg-[#b0151b] text-white font-bold py-4 uppercase tracking-widest font-oswald text-xs transition-all hover:scale-[1.02] shadow-lg shadow-red-950/30"
              >
                {t("donate.tiers.becomeGuardian")}
              </a>
            </div>
          </div>
        </section>

        {/* --- SECTION 8: AWARENESS STRATEGY --- */}
        <section className="space-y-10 md:space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="font-oswald text-red tracking-[0.2em] uppercase text-xs md:text-sm font-bold block">
              {t("awareness.tag")}
            </span>
            <AnimatedTitle 
              as="h2"
              text={t("awareness.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-foreground uppercase leading-tight"
            />
            <p className="font-oswald text-base md:text-lg text-foreground/75 leading-relaxed max-w-4xl">
              {t("awareness.lead")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awarenessStrategies.map((strat) => (
              <div 
                key={strat.key} 
                className="p-6 md:p-8 bg-blue border border-white/10 rounded-2xl flex flex-col gap-4 shadow-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-red to-red/60 border border-white/10 shadow-lg flex items-center justify-center shrink-0">
                  {strat.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bebas text-xl text-white tracking-wide leading-tight">
                    {t(`awareness.items.${strat.key}.title`)}
                  </h3>
                  <p className="font-oswald text-xs md:text-sm text-white/70 leading-relaxed">
                    {t(`awareness.items.${strat.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 9: FINAL CTA --- */}
        <section className="text-center bg-blue border border-white/10 px-6 py-8 md:p-16 rounded-3xl relative overflow-hidden shadow-2xl space-y-6 md:space-y-8">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/2 rounded-br-full"></div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            <AnimatedTitle 
              as="h2"
              text={t("finalCta.title")}
              className="text-3xl md:text-5xl lg:text-6xl font-bold font-bebas text-white uppercase leading-none"
            />
            <p className="font-oswald text-sm md:text-base text-white/70 leading-relaxed">
              {t("finalCta.text")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="https://www.zeffy.com/en-US/donation-form/support-the-hezbollah-accountability-act"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-red hover:bg-[#b0151b] text-white px-8 py-4 font-bold tracking-wider transition-all font-oswald uppercase hover:shadow-[0_0_20px_rgba(227,27,35,0.3)] text-sm cursor-pointer border border-transparent isolate"
            >
              <span className="relative z-10 tracking-wider">{t("ctaFund")}</span>
              <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out z-0" />
            </a>
            <a 
              href="#petition"
              onClick={(e) => handleScrollTo(e, "petition")}
              className="group relative bg-transparent border border-white/30 hover:border-white text-white px-8 py-4 font-bold tracking-wider transition-all font-oswald uppercase text-sm cursor-pointer overflow-hidden isolate"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{t("ctaPetition")}</span>
              <div className="absolute inset-0 bg-white transform scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-500 ease-out -z-10" />
            </a>
          </div>
        </section>

      </div>

      {/* --- STICKY BOTTOM PETITION PROGRESS BAR --- */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-foreground/10 px-6 md:px-12 lg:px-24 py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 shadow-2xl transition-all duration-500 ${
          isStickyVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Left Side: Brand */}
        <div className="shrink-0 font-bebas text-sm md:text-lg text-foreground tracking-wider uppercase">
          {t("petition.sticky.brand")}
        </div>

        {/* Center: Progress & Counter */}
        <div className="flex-1 max-w-xl w-full flex items-center gap-4">
          <span className="font-oswald text-[10px] text-foreground/75 uppercase tracking-widest hidden sm:inline whitespace-nowrap">
            {t("petition.sticky.label")}
          </span>
          
          {/* Progress fill track */}
          <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-red rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-baseline gap-1 font-oswald whitespace-nowrap shrink-0">
            <span className="font-bebas text-lg md:text-xl text-red font-bold leading-none">{signatures.toLocaleString()}</span>
            <span className="text-[10px] md:text-xs text-foreground/75 leading-none">{t("petition.sticky.goal")}</span>
          </div>
        </div>

        {/* Right Side: CTA Button */}
        <div className="shrink-0 w-full md:w-auto">
          {hasSigned ? (
            <a 
              href="https://www.zeffy.com/en-US/donation-form/support-the-hezbollah-accountability-act"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto block text-center bg-red hover:bg-[#b0151b] text-white px-6 py-2.5 font-bold tracking-wider font-oswald uppercase text-xs cursor-pointer"
            >
              {t("petition.sticky.cta")}
            </a>
          ) : (
            <a 
              href="#petition"
              onClick={(e) => handleScrollTo(e, "petition")}
              className="w-full md:w-auto block text-center bg-red hover:bg-[#b0151b] text-white px-6 py-2.5 font-bold tracking-wider font-oswald uppercase text-xs cursor-pointer"
            >
              {t("petition.btnSign")}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
