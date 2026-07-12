import Link from "next/link";
import type { Lesson } from "@/types";
import { lessonPath } from "@/lib/routes";
import { normalizeLevel } from "@/lib/levels";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="card stack lesson-card">
      <div className="card-header">
        <div>
          <h3>{lesson.title}</h3>
          <p className="card-copy">{lesson.summary}</p>
        </div>
        <span className="badge">{lesson.estimatedMinutes} min</span>
      </div>
      <div className="badge-list">
        <span className="badge neutral">{lesson.subject}</span>
        <span className="badge neutral">{lesson.level}</span>
      </div>
      <Link className="button" href={lessonPath(lesson.competitionSlug, normalizeLevel(lesson.level), lesson.slug)}>
        Open lesson
      </Link>
    </article>
  );
}
