import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, CalendarDays, Camera, GraduationCap, Mail, Microscope, Timer, Trophy, Zap } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { competitionPath, scienceBowlInfoPath } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Science Bowl Info Session | Medal Minds",
  description:
    "Overview of Science Bowl format, topics, scoring, team setup, preparation, and logistics based on the shared info session presentation."
};

const sourceUrl = "https://drive.google.com/file/d/1kBX9CKPOG5VUI4BdHHsPegqhUrPXAqSt/view";

const topics = ["Life Science", "Physical Science", "Earth and Space Science", "Energy", "Mathematics"];

const quickFacts = [
  { label: "Sponsor", value: "U.S. Department of Energy", icon: Trophy },
  { label: "Team size", value: "3 to 5 students", icon: GraduationCap },
  { label: "Style", value: "Fast-paced buzzer competition", icon: Zap },
  { label: "Question set", value: "15 toss-up / bonus pairs per round", icon: BookOpen }
];

const sections = [
  {
    title: "What is Science Bowl?",
    body: [
      "Science Bowl is an academic competition sponsored by the U.S. Department of Energy. It is a fast-paced buzzer-style event built around science and mathematics knowledge.",
      "Teams typically include 3 to 5 students, and rounds move quickly through toss-up and bonus questions."
    ]
  },
  {
    title: "What topics are covered?",
    body: [
      "The presentation lists five core subject areas: Life Science, Physical Science, Earth and Space Science, Energy, and Mathematics.",
      "That means students need both broad recall and the ability to shift quickly between disciplines."
    ]
  },
  {
    title: "How do questions work?",
    body: [
      "There are two question types. Toss-up questions are worth 4 points and, according to the presentation, teams have 7 seconds to answer after recognition. If a toss-up is answered correctly, the team earns a bonus question worth 10 points with 22 seconds to answer.",
      "For multiple-choice questions, answer options use W, X, Y, and Z instead of A, B, C, and D. Students can answer with either the letter or the full answer choice."
    ]
  },
  {
    title: "What are the response rules?",
    body: [
      "Any of the 4 or 5 team members may answer a toss-up by raising a hand and being recognized by the moderator.",
      "The deck also notes that team communication is allowed for both toss-ups and bonuses, but a team gets only one opportunity to answer a toss-up. If the toss-up is missed, the bonus is not read and the moderator moves on."
    ]
  },
  {
    title: "What is the competition structure?",
    body: [
      "The presentation describes at least three preliminary rounds, each using sets of 15 toss-up and bonus questions. The goal in prelims is to score as many points as possible.",
      "Teams with the highest combined point totals advance to elimination rounds, where sets of 15 questions continue until there is a clear winner."
    ]
  },
  {
    title: "How should teams prepare their setup?",
    body: [
      "The deck recommends two cameras for virtual play: one for Zoom and one showing the workspace, such as a laptop and a phone. A working microphone is also required.",
      "It explicitly says teams can reach out to sciencebowl@mit.edu if they need technology resources such as headphones, microphones, or webcams."
    ]
  },
  {
    title: "How do you get started?",
    body: [
      "First, find a teacher willing to serve as coach. The coach handles paperwork, helps the team practice, and accompanies the team to competitions.",
      "Then select 3 to 5 students in grades 6 through 8 for the team described in the presentation, and complete coach registration through the National Science Bowl website."
    ]
  },
  {
    title: "How should students prepare?",
    body: [
      "The deck points teams to official DOE preparation materials and sample questions from previous rounds.",
      "That lines up well with Medal Minds: learn the content, practice with real-format questions, and get comfortable with fast recall."
    ]
  }
];

export default function ScienceBowlInfoSessionPage() {
  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Science Bowl", href: competitionPath("science-bowl") },
            { label: "Info Session" }
          ]}
        />

        <section className="info-hero card spacious">
          <div className="info-hero-copy stack">
            <span className="eyebrow">Science Bowl Guide</span>
            <h1>Science Bowl info session</h1>
            <p className="subtitle">
              A clean summary of the shared presentation: what Science Bowl is, how rounds work, what topics are
              covered, how to register, and how to prepare.
            </p>
            <div className="actions">
              <Link className="button button-lg" href={competitionPath("science-bowl")}>
                Go to Science Bowl
              </Link>
              <a className="ghost-button button-lg" href={sourceUrl} rel="noreferrer" target="_blank">
                Open source PDF
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
                <h2>What students are expected to know</h2>
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
                <p>Presentation says teams have 7 seconds to answer after recognition.</p>
              </div>
              <div className="info-timeline-row">
                <span className="badge">Bonus</span>
                <strong>10 points</strong>
                <p>Read only after a correct toss-up. Presentation says teams have 22 seconds to answer.</p>
              </div>
              <div className="info-timeline-row">
                <span className="badge">Multiple choice</span>
                <strong>W / X / Y / Z</strong>
                <p>Students can answer with the letter or the full wording of the answer choice.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="stack">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Presentation summary</span>
              <h2>Everything covered in the deck</h2>
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
                <h2>Suggested first steps</h2>
              </div>
            </div>
            <div className="info-checklist">
              <div className="info-checklist-item">
                <span>1</span>
                <p>Find a teacher who can serve as the team coach.</p>
              </div>
              <div className="info-checklist-item">
                <span>2</span>
                <p>Select 3 to 5 students for the team described in the presentation.</p>
              </div>
              <div className="info-checklist-item">
                <span>3</span>
                <p>Register through the National Science Bowl coach registration process.</p>
              </div>
              <div className="info-checklist-item">
                <span>4</span>
                <p>Practice with official prep materials and sample question sets.</p>
              </div>
            </div>
          </article>

          <article className="card spacious stack">
            <div className="section-heading section-heading-tight">
              <div>
                <span className="eyebrow">Logistics note</span>
                <h2>Dates shown in the source deck</h2>
              </div>
            </div>
            <div className="info-alert-list">
              <div className="info-alert-row">
                <CalendarDays size={18} />
                <p>The presentation lists a regional competition date of February 19.</p>
              </div>
              <div className="info-alert-row">
                <Timer size={18} />
                <p>The presentation lists a registration deadline of February 5, with roster changes allowed until then.</p>
              </div>
              <div className="info-alert-row">
                <Camera size={18} />
                <p>For current-year accuracy, teams should verify dates and technical requirements with the organizer.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="card spacious info-contact-band">
          <div className="stack">
            <span className="eyebrow">Questions</span>
            <h2>Need help with Science Bowl?</h2>
            <p>
              The presentation repeatedly points students and coaches to the MIT regional contact for questions and
              technology support.
            </p>
          </div>
          <div className="actions">
            <a className="button button-lg" href="mailto:sciencebowl@mit.edu">
              <Mail size={18} />
              sciencebowl@mit.edu
            </a>
            <Link className="ghost-button button-lg" href={scienceBowlInfoPath()}>
              Stay on this guide
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
