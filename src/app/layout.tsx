import type { Metadata } from "next";
import { Suspense } from "react";
import { Poppins, Open_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AutoBreadcrumbs } from "@/components/AutoBreadcrumbs";
import { buildMetadata, siteUrl, structuredData } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata({
    title: "Medal Minds | National Science Bowl, Science Bowl & Olympiad Prep",
    description:
      "Prepare for the National Science Bowl, Science Bowl, NSB, Science Olympiad, and Math Olympiad with practice questions, lessons, buzzer drills, and high-yield study paths.",
    path: "/"
  }),
  applicationName: "Medal Minds",
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: "/logo-mm.svg",
    apple: "/logo-mm.svg"
  }
};

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

const bodyFont = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
          type="application/ld+json"
        />
        <div className="page-shell" style={{ padding: "24px" }}>
          <div className="screen" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Suspense fallback={null}>
              <AutoBreadcrumbs />
            </Suspense>
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
