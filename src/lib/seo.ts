import type { Metadata } from "next";
import { competitions } from "@/data/competitions";
import type { CompetitionSlug } from "@/types";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://medalminds.vercel.app";

export const seoKeywords = [
  "National Science Bowl",
  "Science Bowl",
  "NSB",
  "Science Bowl practice questions",
  "Science Bowl prep",
  "Science Bowl buzzer practice",
  "middle school Science Bowl",
  "science olympiad",
  "Science Olympiad practice",
  "math olympiad",
  "olympiad prep",
  "academic competition prep"
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = []
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Medal Minds",
      type: "website",
      images: [
        {
          url: absoluteUrl("/assets/logo.png"),
          width: 1254,
          height: 1254,
          alt: "Medal Minds logo"
        }
      ]
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [absoluteUrl("/assets/logo.png")]
    }
  };
}

export function getCompetitionSeo(slug: CompetitionSlug) {
  const competition = competitions.find((item) => item.slug === slug);
  if (!competition) return undefined;

  if (slug === "science-bowl") {
    return {
      title: "Science Bowl Practice Questions, Lessons & Buzzer Prep | Medal Minds",
      description:
        "Prepare for the National Science Bowl with Science Bowl practice questions, NSB buzzer drills, topic lessons, and high-yield review for biology, chemistry, physics, energy, Earth science, and math.",
      keywords: [
        "National Science Bowl prep",
        "NSB practice",
        "Science Bowl questions",
        "Science Bowl study guide"
      ]
    };
  }

  return {
    title: `${competition.name} Practice, Lessons & Competition Prep | Medal Minds`,
    description: `${competition.description} Practice with targeted lessons, questions, review, and competition-ready study paths for ${competition.name}.`,
    keywords: [`${competition.name} prep`, `${competition.name} practice`, `${competition.name} lessons`]
  };
}

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Medal Minds",
        url: siteUrl,
        logo: absoluteUrl("/assets/logo.png")
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Medal Minds",
        publisher: {
          "@id": `${siteUrl}/#organization`
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/science-bowl/practice?subject={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LearningResource",
        "@id": `${siteUrl}/science-bowl#learning-resource`,
        name: "Science Bowl Practice Questions and Buzzer Prep",
        description:
          "National Science Bowl practice questions, topic lessons, quick tests, and buzzer-style practice for students preparing for Science Bowl.",
        url: absoluteUrl("/science-bowl"),
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        educationalLevel: ["Middle School", "High School"],
        teaches: ["Science Bowl", "National Science Bowl", "Biology", "Chemistry", "Physics", "Energy", "Earth and Space Science", "Mathematics"]
      }
    ]
  };
}
