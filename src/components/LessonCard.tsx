import Link from "next/link";
import type { Lesson } from "@/types";
import { lessonPath } from "@/lib/routes";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="card stack">
      <div className="card-header">
        <div>
          <h3>{lesson.title}</h3>
          <p>{lesson.summary}</p>
        </div>
        <span className="badge">{lesson.estimatedMinutes} min</span>
      </div>
      <div className="badge-list">
        <span className="badge neutral">{lesson.category}</span>
        <span className="badge neutral">{lesson.level}</span>
      </div>
      <Link className="button" href={lessonPath(lesson.competitionSlug, lesson.slug)}>
        Open lesson
      </Link>
    </article>
  );
}
