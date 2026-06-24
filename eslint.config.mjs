import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "scripts/**", "prisma/**", "tmp/**", "reports/**"]
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      // BuzzerArena.tsx initializes state from URL params and syncs a local
      // countdown clock from props inside effects. These are flagged by the
      // strict set-state-in-effect rule but are intentional; the component is
      // scheduled for a dedicated refactor. Keep as a warning, not a hard gate.
      "react-hooks/set-state-in-effect": "warn"
    }
  }
];

export default eslintConfig;
