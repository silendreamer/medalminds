# MedalMinds

MedalMinds is a simple Next.js MVP for academic competition prep at `medalminds.com`. It uses local TypeScript data files and dynamic routing to create mini-sites for:

- Science Bowl
- Science Olympiad
- Math Olympiad

The app includes practice questions, learning lessons, and test-taking flows for each competition. It is intentionally database-free for the MVP.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/`
- `/science-bowl`
- `/science-bowl/practice`
- `/science-bowl/buzzer`
- `/science-bowl/learning`
- `/science-bowl/learning/[lessonId]`
- `/science-bowl/tests`
- `/science-bowl/tests/[testId]`

The same structure is available for `/science-olympiad` and `/math-olympiad`.

## Data files

Local content lives in:

- `src/data/competitions.ts`
- `src/data/practiceQuestions.ts`
- `src/data/lessons.ts`
- `src/data/tests.ts`

Shared types live in `src/types/index.ts`. Data lookup helpers live in `src/lib/data.ts`.

## Add a new competition

1. Add a competition record to `src/data/competitions.ts`.
2. Add the new slug to the `CompetitionSlug` union in `src/types/index.ts`.
3. Add practice questions in `src/data/practiceQuestions.ts`.
4. Add lesson topics in `src/data/lessons.ts`.
5. Add test themes and question IDs in `src/data/tests.ts`.

Because the route structure is dynamic, pages for the new competition will work once the data exists.

## Add questions, lessons, and tests

Questions should include `id`, `competitionSlug`, `category`, `level`, `difficulty`, `type`, `prompt`, `correctAnswer`, and `explanation`. Multiple choice questions also include `choices`; short answer questions can include `alternateAnswers`.

Lessons include a slug, metadata, key concepts, content sections, and mini review questions.

Tests include metadata and a `questionIds` array. The test runner loads those local questions, shows one question at a time, allows navigation, and displays a scored review after submit.

## Future upgrade path

This MVP uses local TypeScript data to stay simple and deployable without external services. The data helpers in `src/lib/data.ts` keep UI code separate from storage, so the local arrays can later be replaced with PostgreSQL, Supabase, Firebase, or another database without rewriting the route and component structure.

Subdomain routing can also be added later by mapping hostnames like `science-bowl.medalminds.com` to the same competition slugs currently used in path-based routes.

## Disclaimer

This is an independent educational practice platform. It is not affiliated with or endorsed by any official competition organization.
