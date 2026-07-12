import { describe, expect, it } from "vitest";
import { slugifySubject } from "./subjects";

// Step 0: Pin current URL slug output for every real subject across all three competitions.
// These MUST NOT change — they are indexed by search engines.
// Formula under test: name.toLowerCase().replace(/[\s&]+/g, "-")

describe("slugifySubject — Science Bowl subjects", () => {
  it("Biology", () => expect(slugifySubject("Biology")).toBe("biology"));
  it("Chemistry", () => expect(slugifySubject("Chemistry")).toBe("chemistry"));
  it("Physics", () => expect(slugifySubject("Physics")).toBe("physics"));
  it("Earth and Space", () => expect(slugifySubject("Earth and Space")).toBe("earth-and-space"));
  it("Energy", () => expect(slugifySubject("Energy")).toBe("energy"));
  it("Math", () => expect(slugifySubject("Math")).toBe("math"));
});

describe("slugifySubject — Science Olympiad subjects", () => {
  it("Anatomy", () => expect(slugifySubject("Anatomy")).toBe("anatomy"));
  it("Astronomy", () => expect(slugifySubject("Astronomy")).toBe("astronomy"));
  it("Disease Detectives", () => expect(slugifySubject("Disease Detectives")).toBe("disease-detectives"));
  it("Dynamic Planet", () => expect(slugifySubject("Dynamic Planet")).toBe("dynamic-planet"));
  it("Forensics", () => expect(slugifySubject("Forensics")).toBe("forensics"));
  it("Machines", () => expect(slugifySubject("Machines")).toBe("machines"));
});

describe("slugifySubject — Math Olympiad subjects", () => {
  it("Number Theory", () => expect(slugifySubject("Number Theory")).toBe("number-theory"));
  it("Algebra", () => expect(slugifySubject("Algebra")).toBe("algebra"));
  it("Geometry", () => expect(slugifySubject("Geometry")).toBe("geometry"));
  it("Combinatorics", () => expect(slugifySubject("Combinatorics")).toBe("combinatorics"));
  it("Probability", () => expect(slugifySubject("Probability")).toBe("probability"));
  it("Logic", () => expect(slugifySubject("Logic")).toBe("logic"));
});
