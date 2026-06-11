import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCompetitionBySlug, getLessonBySlug, isCompetitionSlug } from "@/lib/data";
import { competitionPath, learningPath } from "@/lib/routes";

export default async function LessonDetailPage({
  params
}: {
  params: Promise<{ competitionSlug: string; lessonId: string }>;
}) {
  const { competitionSlug, lessonId } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = getCompetitionBySlug(competitionSlug);
  const lesson = getLessonBySlug(competitionSlug, lessonId);
  if (!competition || !lesson) notFound();

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: competitionPath(competitionSlug) },
            { label: "Learning", href: learningPath(competitionSlug) },
            { label: lesson.title }
          ]}
        />
        <article className="card spacious stack">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>{lesson.title}</h1>
            <p className="subtitle">{lesson.summary}</p>
          </div>
          <div className="badge-list">
            <span className="badge">{lesson.category}</span>
            <span className="badge neutral">{lesson.level}</span>
            <span className="badge neutral">{lesson.estimatedMinutes} minutes</span>
          </div>
          <div className="content-section stack">
            <h2>Key concepts</h2>
            <div className="badge-list">
              {lesson.keyConcepts.map((concept) => (
                <span className="badge neutral" key={concept}>
                  {concept}
                </span>
              ))}
            </div>
          </div>
          {lesson.contentSections.map((section) => (
            <section className="content-section stack" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <section className="content-section stack">
            <h2>Mini review</h2>
            {lesson.reviewQuestions.map((question) => (
              <div className="feedback" key={question}>
                {question}
              </div>
            ))}
          </section>
        </article>
      </div>
    </section>
  );
}
