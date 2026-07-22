import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // Lesson bodies (fs.readFile at request time) AND the per-subject/level
    // question shards (see src/data/nsbQuestions.ts). Removing either entry makes
    // the corresponding fs.readFile fail on Vercel and the loader silently
    // returns []. The monolithic questions.json is intentionally NOT traced — it
    // is the committed source of truth for the content scripts, not a runtime
    // dependency, so it must not be bundled into the serverless functions.
    "/**": ["./content/nsb/lessons/**", "./content/nsb/json/questions/**"]
  },
  turbopack: {
    root: path.resolve(__dirname)
  }
};

export default nextConfig;
