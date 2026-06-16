"use client";

import { Medal } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand footer-brand">
          <span aria-hidden="true" className="brand-mark">
            <Medal size={22} />
          </span>
          <span className="brand-copy">
            <strong>Medal Minds</strong>
          </span>
        </div>
        <p>
          This is an independent educational practice platform. It is not affiliated with or endorsed by any
          official competition organization.
        </p>
      </div>
    </footer>
  );
}
