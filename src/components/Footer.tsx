"use client";

import { usePathname } from "next/navigation";
import { Atom } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/brainbowl") {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand footer-brand">
          <span className="brand-mark">
            <Atom size={22} />
          </span>
          OlympiadPrep Hub
        </div>
        <p>
          This is an independent educational practice platform. It is not affiliated with or endorsed by any
          official competition organization.
        </p>
      </div>
    </footer>
  );
}
