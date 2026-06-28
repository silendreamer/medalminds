import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, CalendarDays, GraduationCap, Microscope, Timer, Trophy, Zap } from "lucide-react";
import { competitionPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "National Science Bowl Team Guide | Rules, Format & Prep | Medal Minds",
  description:
    "Learn how the National Science Bowl works, including Science Bowl format, scoring, team roles, toss-ups, bonuses, rules, and practical NSB prep steps.",
  path: "/science-bowl/info-session",
  keywords: ["National Science Bowl rules", "Science Bowl format", "NSB team guide", "Science Bowl scoring"]
});

const rulesUrl = "https://science.osti.gov/-/media/wdts/nsb/pdf/NSB-Resources/Rules2026.pdf";
const doeUrl = "https://www.energy.gov/topics/national-science-bowl";

const topics = ["Biology", "Chemistry", "Earth and Space Science", "Physics", "Energy", "Mathematics"];

const quickFacts = [
  { label: "Sponsor", value: "U.S. Department of Energy", icon: Trophy },
  { label: "Team roster", value: "4 players + 1 alternate", icon: GraduationCap },
  { label: "Match style", value: "Fast-paced buzzer rounds", icon: Zap },
  { label: "Question types", value: "Toss-ups and bonuses", icon: BookOpen }
];

const sections = [
  {
    title: "What Students Compete In",
    body: [
      "Science Bowl is a team competition where students answer science and math questions under time pressure. It rewards knowledge, speed, accuracy, and calm communication.",
      "A strong team usually blends broad science coverage with a few students who can specialize deeply in areas like biology, physics, chemistry, Earth science, energy, or math."
    ]
  },
  {
    title: "What a Match Feels Like",
    body: [
      "Matches move quickly. The moderator reads toss-up questions to both teams, students buzz in, and correct toss-up answers unlock bonus questions for that team.",
      "The best teams do more than memorize facts. They listen carefully, avoid careless buzzes, and know when a teammate is better positioned to answer."
    ]
  },
  {
    title: "How Questions Work",
    body: [
      "Toss-up questions are worth 4 points. Any active player may buzz in, but the answer must come after recognition by the moderator or judge.",
      "A correct toss-up earns a bonus question worth 10 points. Bonus questions give the team time to confer and choose one answer."
    ]
  },
  {
    title: "Rules That Matter in Practice",
    body: [
      "Students should be careful about blurting, answering before recognition, and interrupting a question without being confident. Those mistakes can cost points or remove a team from answering.",
      "Nonverbal communication is allowed on toss-ups under current DOE rules, while bonuses allow team discussion. Teams should still confirm details with the official rule packet for their event."
    ]
  },
  {
    title: "How Tournaments Usually Run",
    body: [
      "Most events begin with round-robin or preliminary matches so teams get several games before elimination play. Advancement is usually based on wins, points, or event-specific tiebreakers.",
      "Regional events feed into the National Science Bowl pathway, so coaches should always check the current rules and regional organizer details before competition day."
    ]
  },
  {
    title: "What Coaches Handle",
    body: [
      "A teacher coach or advisor helps register the team, organize practice, communicate with families, and make sure students understand event rules and expectations.",
      "Coaches should build a predictable practice rhythm: content review, toss-up drills, bonus discussion practice, and short scrimmages under real timing."
    ]
  },
  {
    title: "How Students Should Train",
    body: [
      "Start with high-yield fundamentals: units, formulas, vocabulary, classifications, common lab concepts, and recurring facts from prior question sets.",
      "Then practice speed. Students should learn to recognize clues early, but also build judgment about when not to buzz."
    ]
  },
  {
    title: "How Medal Minds Fits",
    body: [
      "Medal Minds is built for the work between team practices: targeted lessons, real-format practice questions, topic review, and buzzer-style repetition.",
      "Use this guide to understand the event, then use the Science Bowl prep track to turn weak topics into repeatable points."
    ]
  }
];

export default function ScienceBowlInfoSessionPage() {
  return (
    <section className="section">
      <div className="container stack">
        <section className="info-hero card spacious">
          <div className="info-hero-copy stack">
            <span className="eyebrow">Science Bowl Team Guide</span>
            <h1>Build a team that can buzz with confidence</h1>
            <p className="subtitle">
              Learn how Science Bowl works, what students need to know, how matches are scored, and how to turn
              practice time into faster, cleaner answers.
            </p>
            <div className="actions">
              <Link className="button button-lg" href={competitionPath("science-bowl")}>
                Start Science Bowl Prep
              </Link>
              <a className="ghost-button button-lg" href={rulesUrl} rel="noreferrer" target="_blank">
                View Official Rules
              </a>
            </div>
          </div>

          <div className="info-hero-panel">
            <div className="info-facts-grid">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <article className="info-fact-card" key={fact.label}>
                    <span className="info-fact-icon">
                      <Icon size={18} />
                    </span>
                    <strong>{fact.value}</strong>
                    <span>{fact.label}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid two">
          <article className="card spacious stack">
            <div className="section-heading section-heading-tight">
              <div>
                <span className="eyebrow">Core topics</span>
                <h2>What students should be ready to answer</h2>
              </div>
            </div>
            <div className="info-topic-list">
              {topics.map((topic) => (
                <div className="info-topic-pill" key={topic}>
                  <Microscope size={16} />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="card spacious stack">
            <div className="section-heading section-heading-tight">
              <div>
                <span className="eyebrow">Format at a glance</span>
                <h2>Scoring and timing</h2>
              </div>
            </div>
            <div className="info-timeline">
              <div className="info-timeline-row">
                <span className="badge">Toss-up</span>
                <strong>4 points</strong>
                <p>Teams buzz in after the question is read. A recognized player must answer promptly.</p>
              </div>
              <div className="info-timeline-row">
                <span className="badge">Bonus</span>
                <strong>10 points</strong>
                <p>Earned after a correct toss-up. Teammates may confer before the captain gives the answer.</p>
              </div>
              <div className="info-timeline-row">
                <span className="badge">Match clock</span>
                <strong>Two halves</strong>
                <p>Regional matches use timed halves, so pacing and clean buzzes matter as much as content.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Competition essentials</span>
              <h2>What teams need to know before they play</h2>
            </div>
          </div>
          <div className="grid two info-section-grid">
            {sections.map((section) => (
              <article className="card spacious stack info-section-card" key={section.title}>
                <h3>{section.title}</h3>
                <div className="stack">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid two">
          <article className="card spacious stack">
            <div className="section-heading section-heading-tight">
              <div>
                <span className="eyebrow">Getting started</span>
                <h2>Suggested first steps for a new team</h2>
              </div>
            </div>
            <div className="info-checklist">
              <div className="info-checklist-item">
                <span>1</span>
                <p>Find a teacher or advisor who can coach, register, and coordinate the team.</p>
              </div>
              <div className="info-checklist-item">
                <span>2</span>
                <p>Build a roster of four active players plus an alternate, then assign topic strengths.</p>
              </div>
              <div className="info-checklist-item">
                <span>3</span>
                <p>Review the official DOE rules and your regional event requirements.</p>
              </div>
              <div className="info-checklist-item">
                <span>4</span>
                <p>Run weekly practice: content review, buzzer drills, bonus collaboration, and scrimmages.</p>
              </div>
            </div>
          </article>

          <article className="card spacious stack">
            <div className="section-heading section-heading-tight">
              <div>
                <span className="eyebrow">Practice plan</span>
                <h2>A simple weekly rhythm</h2>
              </div>
            </div>
            <div className="info-alert-list">
              <div className="info-alert-row">
                <CalendarDays size={18} />
                <p>Pick two focus subjects each week and review the highest-yield facts first.</p>
              </div>
              <div className="info-alert-row">
                <Timer size={18} />
                <p>Drill toss-ups under time pressure so students learn when to buzz and when to wait.</p>
              </div>
              <div className="info-alert-row">
                <BookOpen size={18} />
                <p>Review missed questions immediately and convert them into short study targets.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="card spacious info-contact-band">
          <div className="stack">
            <span className="eyebrow">Next steps</span>
            <h2>Ready to start preparing?</h2>
            <p>
              Use the official DOE materials for rules and registration details, then practice inside Medal Minds to
              build speed, coverage, and confidence before competition day.
            </p>
          </div>
          <div className="actions">
            <Link className="button button-lg" href={competitionPath("science-bowl")}>
              Start Practicing
            </Link>
            <a className="ghost-button button-lg" href={doeUrl} rel="noreferrer" target="_blank">
              Official DOE Page
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
