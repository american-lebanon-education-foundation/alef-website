import { redirect } from "@/i18n/routing";
import AssassinatedLeadersView from "@/app/components/ResearchCom/AssassinatedLeadersView";

export default async function AssassinatedLeadersPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    redirect({ href: "/fallen-martyrs", locale });
    return <AssassinatedLeadersView />;
}
