"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface NavbarUserButtonProps {
  variant?: "desktop" | "mobile";
  onCloseMobile?: () => void;
}

export default function NavbarUserButton({
  variant = "desktop",
  onCloseMobile,
}: NavbarUserButtonProps) {
  const [user] = useAuthState(auth);
  const t = useTranslations("Navbar");

  if (variant === "mobile") {
    if (user) {
      return (
        <Link
          href="/profile"
          onClick={onCloseMobile}
          className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors font-oswald uppercase text-sm tracking-wider"
        >
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-foreground/20"
              width={32}
              height={32}
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 rounded-full border border-foreground/20 bg-foreground/5 flex items-center justify-center">
              <span className="font-bebas text-sm">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
              </span>
            </div>
          )}
          {t("profile")}
        </Link>
      );
    }

    return (
      <Link
        href="/login"
        onClick={onCloseMobile}
        className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors font-oswald uppercase text-sm tracking-wider"
      >
        <UserIcon className="w-4 h-4" />
        {t("login")}
      </Link>
    );
  }

  // Desktop variant
  if (user) {
    return (
      <Link
        href="/profile"
        className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-foreground/20 hover:border-red transition-all duration-300 group cursor-pointer"
        aria-label="My Profile"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt={user.displayName || "User Profile"}
            className="w-full h-full object-cover"
            width={40}
            height={40}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
            <span className="font-bebas text-lg text-foreground/70 group-hover:text-foreground">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-5 h-5" />}
            </span>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="text-foreground/90 hover:text-foreground transition-colors p-2 hover:bg-foreground/10 rounded-none flex items-center justify-center cursor-pointer"
      aria-label="Login"
    >
      <UserIcon className="w-5 h-5" />
    </Link>
  );
}
