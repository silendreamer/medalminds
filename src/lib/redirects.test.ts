import { describe, expect, it } from "vitest";

import { sanitizeNextPath } from "./redirects";

// Table-driven coverage of the JSDoc behavior table in redirects.ts, plus the
// attack list from AUTH_SECURITY_PLAN.md. This is a pure function test: no
// DB, no network, hermetic by construction.

const DEFAULT_NEXT_PATH = "/account";

describe("sanitizeNextPath", () => {
  const cases: Array<{ name: string; input: string | null | undefined; expected: string }> = [
    { name: "simple valid path", input: "/account", expected: "/account" },
    {
      name: "valid path with query string",
      input: "/account/security?x=1",
      expected: "/account/security?x=1",
    },
    {
      name: "valid path with query string (AUTH-070 wording)",
      input: "/account/security?tab=1",
      expected: "/account/security?tab=1",
    },
    { name: "root path", input: "/", expected: "/" },
    { name: "valid path with fragment", input: "/a/b/c#frag", expected: "/a/b/c#frag" },
    { name: "null -> default", input: null, expected: DEFAULT_NEXT_PATH },
    { name: "undefined -> default", input: undefined, expected: DEFAULT_NEXT_PATH },
    { name: "empty string -> default", input: "", expected: DEFAULT_NEXT_PATH },
    { name: "missing leading slash -> default", input: "account", expected: DEFAULT_NEXT_PATH },
    { name: "protocol-relative //evil.com -> default", input: "//evil.com", expected: DEFAULT_NEXT_PATH },
    {
      name: "backslash after leading slash /\\evil.com -> default",
      input: "/\\evil.com",
      expected: DEFAULT_NEXT_PATH,
    },
    { name: "leading backslash \\evil.com -> default", input: "\\evil.com", expected: DEFAULT_NEXT_PATH },
    { name: "backslash anywhere /a\\b -> default", input: "/a\\b", expected: DEFAULT_NEXT_PATH },
    { name: "absolute URL https://evil.com -> default", input: "https://evil.com", expected: DEFAULT_NEXT_PATH },
    {
      name: "javascript: scheme, no leading slash -> default",
      input: "javascript:alert(1)",
      expected: DEFAULT_NEXT_PATH,
    },
    {
      name: "leading slash before scheme-looking text -> passes through unchanged",
      input: "/javascript:alert(1)",
      expected: "/javascript:alert(1)",
    },
    { name: "embedded newline -> default", input: "/x\n/y", expected: DEFAULT_NEXT_PATH },
    { name: "embedded tab -> default", input: "/x\t", expected: DEFAULT_NEXT_PATH },
    {
      name: "600-character path exceeds 512 cap -> default",
      input: "/" + "a".repeat(600),
      expected: DEFAULT_NEXT_PATH,
    },
    {
      name: "512-character valid path is exactly at the cap -> unchanged",
      input: "/" + "a".repeat(511),
      expected: "/" + "a".repeat(511),
    },
    { name: "attack: /account (already covered, repeated per task list)", input: "/account", expected: "/account" },
    {
      name: "attack: /\\evil (single backslash, no dot)",
      input: "/\\evil",
      expected: DEFAULT_NEXT_PATH,
    },
    {
      name: "attack: path not starting with / (relative)",
      input: "evil",
      expected: DEFAULT_NEXT_PATH,
    },
  ];

  for (const { name, input, expected } of cases) {
    it(`${name}: ${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
      expect(sanitizeNextPath(input)).toBe(expected);
    });
  }

  it("is a pure function with no side effects across repeated calls", () => {
    expect(sanitizeNextPath("/account")).toBe("/account");
    expect(sanitizeNextPath("/account")).toBe("/account");
  });
});
