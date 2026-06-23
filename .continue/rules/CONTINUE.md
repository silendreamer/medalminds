# Project Guide: Medal Minds

This guide provides a comprehensive overview of the Medal Minds project, covering its purpose, technologies, architecture, and development practices. It is intended to help developers quickly understand and contribute to the codebase.

## 1. Project Overview

Medal Minds is an educational web application designed to help students prepare for competitive academic events such as the National Science Bowl, Science Olympiad, and Math Olympiad. It offers a variety of features including practice questions, interactive lessons, tests, and a real-time buzzer system for competitive drills.

**Key Technologies Used:**

*   **Next.js**: A React framework for building server-rendered and statically generated web applications.
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A superset of JavaScript that adds static typing to the language, enhancing code quality and maintainability.
*   **Prisma**: A modern open-source ORM (Object-Relational Mapper) for Node.js and TypeScript, used for database access.
*   **PostgreSQL**: A powerful, open-source object-relational database system.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs (inferred from `globals.css` structure).
*   **Vercel**: The platform used for deployment.

**High-Level Architecture:**

The application follows a standard Next.js architecture, leveraging its App Router for routing and API creation.

*   **Frontend**: Built with React and Next.js, handling all client-side rendering and user interactions.
*   **Backend (API Routes)**: Next.js API routes (`src/app/api/`) serve as the backend, providing data to the frontend and handling business logic, particularly for real-time features like the buzzer system.
*   **Database**: PostgreSQL, accessed via Prisma, stores all application data including questions, lessons, competitions, and buzzer room states.
*   **Static Assets**: Served from the `public/` directory.

## 2. Getting Started

Follow these steps to set up and run the Medal Minds project locally.

### Prerequisites

*   **Node.js**: Version 18.x or higher.
*   **npm**: Node Package Manager (comes with Node.js).
*   **PostgreSQL**: A running PostgreSQL instance. You'll need the connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd medalminds
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Copy the example environment file and update it with your database connection string and any other necessary variables.
    ```bash
    cp .env.example .env
    # Open .env and add your PostgreSQL connection string, e.g.:
    # DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
    ```
4.  **Database setup:**
    Generate the Prisma client, migrate your database schema, and seed the database with initial data.
    ```bash
    npm run db:generate
    npm run db:migrate
    npm run db:seed
    ```

### Basic Usage Examples

**Running the development server:**

```bash
npm run dev
```
This will start the Next.js development server, usually accessible at `http://localhost:3000`.

**Building the project for production:**

```bash
npm run build
```

**Running tests:**
_Note: As of this guide's creation, there isn't a dedicated testing framework configured or explicit test scripts beyond linting. This section will need to be updated once a testing strategy is established._
```bash
npm run lint
```
(This only runs linting for code quality, not functional tests.)

## 3. Project Structure

The project is organized into logical directories to enhance maintainability and scalability.

*   **`.continue/`**: Contains configuration files for the Continue development assistant, including this guide.
*   **`docs/`**: Project documentation and plans (e.g., `postgres-backend-plan.md`).
*   **`prisma/`**:
    *   `schema.prisma`: Defines the application's database schema and Prisma client configuration.
    *   `migrations/`: Stores database migration files managed by Prisma Migrate.
    *   `seed.ts`: Script for populating the database with initial data.
*   **`public/`**: Static assets like images (`public/assets/`), favicons, `robots.txt`, and `sitemap.xml`.
*   **`src/`**: Contains the main application source code.
    *   **`src/app/`**: Next.js App Router directory for pages and API routes.
        *   `src/app/api/`: Next.js API routes, e.g., for the buzzer system.
        *   `src/app/[competitionSlug]/`: Dynamic routes for individual competition pages (e.g., `/science-bowl/`).
        *   `src/app/[competitionSlug]/learning/`: Routes for lessons within a competition.
        *   `src/app/[competitionSlug]/practice/`: Routes for practice questions.
        *   `src/app/[competitionSlug]/tests/`: Routes for tests within a competition.
        *   `src/app/globals.css`: Global CSS styles, likely using Tailwind CSS conventions.
        *   `src/app/layout.tsx`: Root layout component for the entire application.
        *   `src/app/page.tsx`: The main landing page component.
    *   **`src/components/`**: Reusable React components. Examples include `Header.tsx`, `Footer.tsx`, `BuzzerArena.tsx`, `CompetitionCard.tsx`, `LessonCard.tsx`, `TestRunner.tsx`, etc.
    *   **`src/data/`**: Static data files, often used for initial content or specific competition data (e.g., `buzzerQuestions.ts`, `competitions.ts`, `lessons.ts`, `scienceBowlMiddleSchoolCurriculum.ts`).
    *   **`src/lib/`**: Utility functions, helper modules, and configuration.
        *   `src/lib/db.ts`: Prisma client initialization and database related utilities.
        *   `src/lib/seo.ts`: Functions for Search Engine Optimization.
        *   `src/lib/routes.ts`: Centralized route definitions.
        *   `src/lib/format.ts`: Data formatting utilities.
        *   `src/lib/buzzerRooms.ts`: Logic for the buzzer system's room management.
    *   **`src/types/`**: TypeScript type definitions.
*   **`package.json`**: Defines project metadata, scripts, and dependencies.
*   **`next.config.ts`**: Next.js configuration file.
*   **`tsconfig.json`**: TypeScript compiler configuration.

## 4. Development Workflow

### Coding Standards and Conventions

*   **TypeScript**: All new code should be written in TypeScript, leveraging its type-checking features for robustness.
*   **React Components**: Follow standard React best practices, including functional components, hooks, and clear props definitions.
*   **Styling**: The project uses CSS (likely following a utility-first approach similar to Tailwind CSS, though not explicitly configured as such in `package.json`). Styles are defined in `src/app/globals.css` and potentially inline or via CSS Modules for components (though `globals.css` suggests a global approach). Prefer using existing CSS variables where available for consistency.
*   **Prisma Schema**: Maintain a clear and well-documented `prisma/schema.prisma` with appropriate models, relations, and enums.

### Testing Approach

Currently, there is no formal unit or integration testing framework configured (e.g., Jest, React Testing Library). The primary form of "testing" is linting (`npm run lint`).

**Recommendation**: Integrate a testing framework (e.g., Jest with React Testing Library) to ensure code quality and prevent regressions, especially for critical components and business logic.

### Build and Deployment Process

*   **Build**: The project is built using `npm run build`.
*   **Vercel Deployment**: The `vercel-build` script (`prisma migrate deploy && prisma db seed && next build`) indicates that the database migrations and seeding are part of the deployment process on Vercel. This means database changes are applied automatically during Vercel builds.

### Contribution Guidelines

_(This section needs to be filled in by the project maintainers)_

*   **Branching Strategy**: (e.g., Git Flow, GitHub Flow)
*   **Pull Request Process**: (e.g., require reviews, link to issues)
*   **Commit Message Conventions**: (e.g., Conventional Commits)

## 5. Key Concepts

### Domain-Specific Terminology

*   **Competition**: An overarching category for academic events (e.g., Science Bowl, Math Olympiad).
*   **Question**: A single practice or competition question, which can be a `PRACTICE`, `TOSSUP`, `BONUS`, or `REVIEW` kind, with various formats (`MULTIPLE_CHOICE`, `SHORT_ANSWER`).
*   **Lesson**: Educational content covering specific concepts or topics.
*   **Test**: A collection of questions designed to simulate a competition or assess knowledge.
*   **Buzzer Room**: A real-time interactive session where participants can "buzz in" to answer questions, simulating a competitive environment.
*   **Curriculum Subject/Grade/Unit/Topic**: Hierarchical structure for organizing educational content.

### Core Abstractions

*   **Prisma Models**: The `prisma/schema.prisma` defines the core data models (`Competition`, `Question`, `Lesson`, `BuzzerRoom`, `CurriculumSubject`, etc.) and their relationships, which are central to the application's data layer.
*   **React Components**: The `src/components/` directory houses the building blocks of the UI.
*   **Next.js Pages/Layouts**: Handle routing and shared UI structures.
*   **API Endpoints**: `src/app/api/` provides the interface for data fetching and mutations, especially for real-time interactions.

### Design Patterns Used

*   **Component-Based Architecture**: The UI is built using modular and reusable React components.
*   **ORM (Object-Relational Mapping)**: Prisma is used to interact with the PostgreSQL database, abstracting SQL queries into TypeScript objects.
*   **Route-Based API**: Next.js API routes provide a clear and organized way to define backend endpoints.

## 6. Common Tasks

### Adding a New Competition

1.  **Define Competition Data**: Add a new entry to `src/data/competitions.ts` or similar data source.
2.  **Update Prisma Schema (if necessary)**: If the new competition type requires new fields or relationships, update `prisma/schema.prisma` and run `npm run db:migrate`.
3.  **Create Pages**: Create new Next.js pages under `src/app/[competitionSlug]/` if the competition requires unique layouts or functionalities.
4.  **Add Components**: Develop any specific React components needed for the new competition's UI.

### Adding New Questions or Lessons

1.  **Update Data Files**: Add new questions to `src/data/buzzerQuestions.ts`, `src/data/practiceQuestions.ts`, or similar, and new lessons to `src/data/lessons.ts`.
2.  **Consider Prisma Seeding**: If these are static initial data, ensure they are included in `prisma/seed.ts` to be loaded into the database.

### Running Database Migrations

When the `prisma/schema.prisma` is modified:

```bash
npm run db:migrate # Creates a new migration file and applies it
```

If you only need to generate the Prisma client after schema changes without creating new migrations:

```bash
npm run db:generate
```

## 7. Troubleshooting

### Common Issues and Solutions

*   **Database Connection Errors**:
    *   **Solution**: Double-check your `DATABASE_URL` in `.env`. Ensure your PostgreSQL server is running and accessible from your development environment.
*   **Prisma Client Not Found**:
    *   **Solution**: Run `npm run db:generate` to ensure the Prisma client is generated after installing dependencies or making schema changes.
*   **Next.js Build Errors**:
    *   **Solution**: Carefully read the error messages. Often, these are TypeScript errors (type mismatches) or syntax issues. Ensure all dependencies are installed.
*   **Buzzer System Issues (Local)**:
    *   **Solution**: Ensure no other processes are using the same port if you're trying to run multiple instances. Check the browser console for WebSocket connection errors.

### Debugging Tips

*   **Browser Developer Tools**: Use the console, network, and component inspectors for frontend debugging.
*   **VS Code Debugger**: Configure `launch.json` for debugging Next.js applications (both client and server-side).
*   **`console.log()`**: A simple but effective way to inspect variable values and execution flow in both frontend and backend (API routes).
*   **Prisma Studio**: Run `npx prisma studio` to visually inspect your database data and schema during development.

## 8. References

*   **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
*   **React Documentation**: [https://react.dev/](https://react.dev/)
*   **Prisma Documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
*   **TypeScript Documentation**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
