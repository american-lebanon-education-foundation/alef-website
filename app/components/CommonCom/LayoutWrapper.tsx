"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import JoinUs from "./JoinUs";
import { ThemeProvider } from "./ThemeProvider";

const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const UploadFAB = dynamic(() => import("./UploadFAB"), { ssr: false });

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Check if we're on the Sanity Studio route or Donate Success page or Login page
    // Using includes() to handle internationalized routes (e.g., /en/login, /ar/login, etc.)
    const isStudioRoute = pathname?.startsWith("/studio");
    const isDonateSuccess = pathname?.includes("/donate/success");
    const isLoginPage = pathname?.includes("/login");

    // If we're on these routes, render only the children without the site layout
    if (isStudioRoute || isDonateSuccess || isLoginPage) {
        return <>{children}</>;
    }

    const isProfilePage = pathname?.includes("/profile");

    // For all other routes, render the full site layout
    return (
        <ThemeProvider>
            <SmoothScroll />
            <Navbar />
            <UploadFAB />
            {children}
            {!isProfilePage && <JoinUs />}
            {!isProfilePage && <Footer />}
        </ThemeProvider>
    );
}
