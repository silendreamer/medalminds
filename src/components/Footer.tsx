"use client";

import { MedalMark } from "@/components/MedalMark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <span aria-hidden="true" className="brand-mark">
              <MedalMark size={40} />
            </span>
            <span className="brand-copy">
              <strong>Medal Minds</strong>
            </span>
          </div>
          <p className="disclaimer">
            This is an independent educational practice platform. It is not affiliated with or endorsed by any official
            competition organization.
          </p>
        </div>
      </div>
    </footer>
  );
}
