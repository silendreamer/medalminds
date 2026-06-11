import type { Metadata } from "next";
import Image from "next/image";
import { Fraunces, Outfit } from "next/font/google";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Camera,
  Check,
  Dna,
  FlaskConical,
  GitBranch,
  Globe2,
  MessageCircle,
  PlayCircle,
  Search,
  Sigma,
  Sparkles,
  Star,
  Target,
  Timer,
  Trophy,
  Users,
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "BrainBowl — Science Bowl prep for middle & high school",
  description:
    "Thousands of real-format toss-up & bonus questions across Biology, Chemistry, Physics, Math, Earth Science and Energy. Built for student competitors.",
  openGraph: {
    title: "BrainBowl — Science Bowl prep for middle & high school",
    description:
      "Thousands of real-format toss-up & bonus questions across Biology, Chemistry, Physics, Math, Earth Science and Energy. Built for student competitors."
  },
  twitter: {
    card: "summary_large_image",
    title: "BrainBowl — Science Bowl prep for middle & high school",
    description:
      "Thousands of real-format toss-up & bonus questions across Biology, Chemistry, Physics, Math, Earth Science and Energy. Built for student competitors."
  }
};

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-fraunces"
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit"
});

const subjects = [
  {
    name: "Biology",
    icon: Dna,
    description: "Cells, genetics, ecology, physiology, and rapid recall for life science rounds.",
    questions: "2,140",
    topics: "48",
    students: "8.6k",
    rating: "4.9",
    reviews: "1,284"
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    description: "Stoichiometry, reactions, bonding, acids and bases, and lab-fluent vocabulary.",
    questions: "1,760",
    topics: "42",
    students: "6.9k",
    rating: "4.8",
    reviews: "942"
  },
  {
    name: "Physics",
    icon: Zap,
    description: "Mechanics, circuits, waves, optics, energy, and formula-first problem habits.",
    questions: "1,980",
    topics: "46",
    students: "7.4k",
    rating: "4.9",
    reviews: "1,103"
  },
  {
    name: "Math",
    icon: Sigma,
    description: "Mental math, algebra, geometry, estimation, and fast Science Bowl calculations.",
    questions: "1,250",
    topics: "31",
    students: "5.2k",
    rating: "4.8",
    reviews: "804"
  },
  {
    name: "Earth & Space",
    icon: Globe2,
    description: "Geology, astronomy, weather, climate, maps, stars, and planetary systems.",
    questions: "1,620",
    topics: "39",
    students: "6.1k",
    rating: "4.9",
    reviews: "876"
  },
  {
    name: "Energy",
    icon: Atom,
    description: "Power, renewables, energy transfer, grids, fuels, and applied DOE-style topics.",
    questions: "1,310",
    topics: "29",
    students: "4.8k",
    rating: "4.8",
    reviews: "692"
  }
];

const packs = [
  ["Biology Toss-Up Sprint", "Free", "MS + HS", "450 questions", "4.9"],
  ["Physics Speed Calculations", "Pro", "HS", "320 questions", "4.8"],
  ["Chemistry Core Concepts", "Free", "MS + HS", "390 questions", "4.9"],
  ["Earth & Space Lightning Round", "Pro", "MS", "280 questions", "4.8"],
  ["Energy Systems Bonus Set", "Free", "HS", "240 questions", "4.7"],
  ["Mixed Nationals Warmup", "Pro", "MS + HS", "600 questions", "5.0"]
];

const steps = [
  ["Learn", BookOpen, "Review concise explainers built around the clues competitors actually hear."],
  ["Drill", Target, "Practice targeted toss-ups and bonuses with instant explanation after every answer."],
  ["Compete", Trophy, "Run timed buzzer sets that feel sharp, fast, and tournament-ready."],
  ["Improve", Sparkles, "Track topic accuracy and turn weak spots into the next practice plan."]
];

const testimonials = [
  [
    "Student captain",
    "BrainBowl helped our team turn scattered practice into a routine. The buzzer timing made our scrimmages feel real."
  ],
  [
    "Middle school coach",
    "The subject breakdown is exactly what I need for rotations. Students can drill independently while I coach strategy."
  ],
  [
    "11th grader",
    "I finally know which topics are costing me points. The explanations are quick enough that I keep practicing."
  ]
];

const faqs = [
  ["Is it free?", "Yes. The free plan includes daily practice, core question packs, and team-ready starter tools."],
  ["What grades is BrainBowl for?", "BrainBowl is built for US middle school grades 6-8 and high school grades 9-12 competitors."],
  ["Does it follow real NSB format?", "The practice flow is inspired by toss-up and bonus pacing, with timed buzzes and subject-balanced sets."],
  ["Can coaches see team progress?", "Coach tools are static in this MVP, but the product design includes team dashboards and topic accuracy views."],
  ["Does it work on mobile?", "Yes. The landing page and practice concepts are designed mobile-first for phones, tablets, and laptops."],
  ["Can we use it for tournaments?", "BrainBowl is ideal for team practice, mock rounds, and tournament warmups, but it is not an official event platform."]
];

function Logo() {
  return (
    <a className="bb-logo" href="#">
      <span className="bb-logo-mark">
        <Atom size={24} />
      </span>
      <span>BrainBowl</span>
    </a>
  );
}

export default function BrainBowlPage() {
  return (
    <div className={`brainbowl-page ${fraunces.variable} ${outfit.variable}`}>
      <header className="bb-nav">
        <div className="bb-container bb-nav-inner">
          <Logo />
          <nav className="bb-nav-links" aria-label="BrainBowl navigation">
            <a href="#subjects">Subjects</a>
            <a href="#practice">Practice</a>
            <a href="#coaches">For Coaches</a>
            <a href="#tournaments">Tournaments</a>
          </nav>
          <label className="bb-search">
            <Search size={18} />
            <input placeholder="Search topics" />
          </label>
          <div className="bb-nav-actions">
            <a className="bb-link-button" href="#">
              Log in
            </a>
            <a className="bb-button bb-button-primary" href="#">
              Start practicing free
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="bb-hero" id="practice">
          <div className="bb-container bb-hero-grid">
            <div className="bb-hero-copy">
              <span className="bb-badge">
                <Sparkles size={16} /> Built for the 2026 season
              </span>
              <h1>
                Crush your next <span>Science Bowl</span>
              </h1>
              <p>
                Fast, focused prep for middle and high school competitors who want stronger recall,
                smarter buzzing, and a clearer path from practice to podium.
              </p>
              <ul className="bb-checks">
                {["10,000+ questions", "6 subjects", "Timed buzzer", "Topic accuracy", "Free forever"].map((item) => (
                  <li key={item}>
                    <Check size={18} /> {item}
                  </li>
                ))}
              </ul>
              <div className="bb-hero-actions">
                <a className="bb-button bb-button-primary" href="#">
                  Start practicing free <ArrowRight size={18} />
                </a>
                <a className="bb-button bb-button-outline" href="#">
                  Browse subjects
                </a>
              </div>
            </div>
            <div className="bb-hero-art">
              <Image
                alt="Colorful quiz buzzer surrounded by science icons"
                src="/assets/brainbowl-hero.png"
                width={900}
                height={900}
                priority
              />
              <div className="bb-chip bb-chip-one">15-question streak!</div>
              <div className="bb-chip bb-chip-two">5.2s avg buzz</div>
            </div>
          </div>
        </section>

        <section className="bb-trust">
          <div className="bb-container bb-trust-inner">
            <strong>4.9★ student rating</strong>
            <span>Thomas Jefferson HS</span>
            <span>Stuyvesant</span>
            <span>Mission San Jose</span>
            <span>BASIS Scottsdale</span>
          </div>
        </section>

        <section className="bb-section" id="subjects">
          <div className="bb-container">
            <div className="bb-section-head">
              <span className="bb-kicker">Subjects</span>
              <h2>Drill every Science Bowl category with purpose.</h2>
              <p>Each subject blends quick recall, explanations, topic stats, and MS + HS level coverage.</p>
            </div>
            <div className="bb-subject-grid">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <article className="bb-card bb-subject-card" key={subject.name}>
                    <div className="bb-card-top">
                      <span className="bb-icon-tile">
                        <Icon size={24} />
                      </span>
                      <div>
                        <h3>{subject.name}</h3>
                        <p>{subject.description}</p>
                      </div>
                    </div>
                    <div className="bb-mini-stats">
                      <span>
                        <strong>{subject.questions}</strong> Questions
                      </span>
                      <span>
                        <strong>{subject.topics}</strong> Topics
                      </span>
                      <span>
                        <strong>{subject.students}</strong> Students
                      </span>
                      <span>
                        <strong>MS + HS</strong> Level
                      </span>
                    </div>
                    <div className="bb-rating-row">
                      <span>
                        <Star size={16} fill="currentColor" /> {subject.rating} ({subject.reviews})
                      </span>
                      <a href="#">
                        Start drilling <ArrowRight size={16} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bb-section">
          <div className="bb-container">
            <div className="bb-section-head">
              <span className="bb-kicker">Top question packs</span>
              <h2>Start with a focused set.</h2>
            </div>
            <div className="bb-pack-grid">
              {packs.map(([title, tier, level, count, rating]) => (
                <article className="bb-card bb-pack-card" key={title}>
                  <div className="bb-card-top">
                    <h3>{title}</h3>
                    <span className={`bb-pill ${tier === "Pro" ? "bb-pill-pro" : ""}`}>{tier}</span>
                  </div>
                  <p>{level} · {count}</p>
                  <div className="bb-rating-row">
                    <span>
                      <Star size={16} fill="currentColor" /> {rating}
                    </span>
                    <a href="#">
                      Open pack <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bb-section">
          <div className="bb-container">
            <div className="bb-section-head">
              <span className="bb-kicker">How it works</span>
              <h2>Four moves from shaky recall to confident buzzes.</h2>
            </div>
            <div className="bb-step-grid">
              {steps.map(([title, Icon, body], index) => (
                <article className="bb-step" key={title as string}>
                  <span>{index + 1}</span>
                  <Icon size={26} />
                  <h3>{title as string}</h3>
                  <p>{body as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bb-section bb-buzzer-section" id="tournaments">
          <div className="bb-container bb-buzzer-grid">
            <div>
              <span className="bb-kicker">Buzzer preview</span>
              <h2>Practice the real rhythm of Science Bowl.</h2>
              <p>
                BrainBowl trains quick recognition without rewarding random guesses. Timers, streaks,
                and response speed help students feel the pressure before tournament day.
              </p>
              <div className="bb-buzzer-points">
                <span><Timer size={18} /> Timed toss-ups</span>
                <span><Target size={18} /> Topic accuracy</span>
                <span><Users size={18} /> Team scrimmage ready</span>
              </div>
            </div>
            <div className="bb-buzzer-card">
              <div className="bb-buzzer-top">
                <span>TOSS-UP · Biology</span>
                <strong>0:04</strong>
              </div>
              <h3>Which organelle is the primary site of ATP production in eukaryotic cells?</h3>
              <div className="bb-options">
                <span>W. Ribosome</span>
                <span>X. Golgi apparatus</span>
                <span className="correct">Y. Mitochondrion</span>
                <span>Z. Nucleus</span>
              </div>
              <div className="bb-buzzer-bottom">
                <span>+4 points · streak ×7</span>
                <span>Buzz: 2.1s</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bb-stats-band">
          <div className="bb-container bb-stats-grid">
            {["10,000+|questions", "6|subjects", "32,000+|students", "4.9★|rating"].map((item) => {
              const [value, label] = item.split("|");
              return (
                <div className="bb-stat-tile" key={item}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bb-section" id="coaches">
          <div className="bb-container">
            <div className="bb-coach-banner">
              <div>
                <span className="bb-kicker">For coaches</span>
                <h2>Run your whole Science Bowl team in one place</h2>
                <p>Assign packs, organize practice blocks, and keep every competitor moving toward stronger categories.</p>
              </div>
              <div className="bb-hero-actions">
                <a className="bb-button bb-button-light" href="#">
                  Create a team
                </a>
                <a className="bb-button bb-button-glass" href="#">
                  See coach tools
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bb-section">
          <div className="bb-container">
            <div className="bb-section-head">
              <span className="bb-kicker">Pricing</span>
              <h2>Start free. Upgrade when practice gets serious.</h2>
            </div>
            <div className="bb-pricing-grid">
              <article className="bb-card bb-price-card">
                <h3>Free</h3>
                <strong>$0 <span>forever</span></strong>
                <ul>
                  <li><Check size={17} /> Daily practice questions</li>
                  <li><Check size={17} /> Core subject packs</li>
                  <li><Check size={17} /> Timed buzzer preview</li>
                </ul>
                <a className="bb-button bb-button-outline" href="#">Start free</a>
              </article>
              <article className="bb-card bb-price-card featured">
                <span className="bb-pill bb-pill-pro">Most popular</span>
                <h3>Pro</h3>
                <strong>$8 <span>/mo</span></strong>
                <ul>
                  <li><Check size={17} /> Unlimited question packs</li>
                  <li><Check size={17} /> Advanced topic accuracy</li>
                  <li><Check size={17} /> Coach-ready team tools</li>
                  <li><Check size={17} /> Tournament warmup sets</li>
                </ul>
                <a className="bb-button bb-button-primary" href="#">Go Pro</a>
              </article>
            </div>
            <p className="bb-school-link">
              Need school or district pricing? <a href="#">Talk to us</a>.
            </p>
          </div>
        </section>

        <section className="bb-section">
          <div className="bb-container">
            <div className="bb-section-head">
              <span className="bb-kicker">Testimonials</span>
              <h2>Built for teams who practice with intent.</h2>
            </div>
            <div className="bb-testimonial-grid">
              {testimonials.map(([role, quote]) => (
                <article className="bb-card bb-testimonial" key={role}>
                  <div className="bb-stars">★★★★★</div>
                  <p>“{quote}”</p>
                  <strong>{role}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bb-section">
          <div className="bb-container">
            <div className="bb-section-head">
              <span className="bb-kicker">FAQ</span>
              <h2>Fast answers before your next round.</h2>
            </div>
            <div className="bb-faq">
              {faqs.map(([question, answer]) => (
                <details className="bb-accordion" key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bb-final-cta">
          <div className="bb-container bb-final-inner">
            <Trophy size={42} />
            <div>
              <h2>Your buzzer is waiting.</h2>
              <p>Get the next set in your inbox and start practicing free.</p>
            </div>
            <form className="bb-email-form">
              <input type="email" placeholder="student@example.com" aria-label="Email address" />
              <button type="submit">Start practicing free</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bb-footer">
        <div className="bb-container bb-footer-grid">
          <div>
            <Logo />
            <p>Real-format Science Bowl prep for sharp teams and ambitious competitors.</p>
            <div className="bb-socials">
              <a href="#" aria-label="Instagram"><Camera size={18} /></a>
              <a href="#" aria-label="Twitter"><MessageCircle size={18} /></a>
              <a href="#" aria-label="YouTube"><PlayCircle size={18} /></a>
              <a href="#" aria-label="GitHub"><GitBranch size={18} /></a>
            </div>
          </div>
          <div>
            <h3>Practice</h3>
            <a href="#">Subjects</a>
            <a href="#">Question packs</a>
            <a href="#">Buzzer mode</a>
          </div>
          <div>
            <h3>For Schools</h3>
            <a href="#">Coach tools</a>
            <a href="#">Team plans</a>
            <a href="#">District pricing</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy</a>
          </div>
        </div>
        <div className="bb-container bb-legal">
          Not affiliated with the U.S. Department of Energy or National Science Bowl®.
        </div>
      </footer>
    </div>
  );
}
