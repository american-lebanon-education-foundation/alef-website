import { redirect } from "@/i18n/routing";
import { AD_GRANTS_REVIEW_MODE } from "@/app/config/adGrantsMode";
import AssassinatedLeadersView from "@/app/components/ResearchCom/AssassinatedLeadersView";

export default async function AssassinatedLeadersPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!AD_GRANTS_REVIEW_MODE) {
        redirect({ href: "/fallen-martyrs", locale });
    }

    return <AssassinatedLeadersView />;
}
