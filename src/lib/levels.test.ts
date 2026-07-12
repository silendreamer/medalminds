import { describe, expect, it } from "vitest";
import { parseSchoolLevel, schoolLevelLabel, schoolLevelDisplay } from "./levels";

describe("parseSchoolLevel", () => {
  it('parses "middle-school" to MIDDLE_SCHOOL', () => {
    expect(parseSchoolLevel("middle-school")).toBe("MIDDLE_SCHOOL");
  });

  it('parses "high-school" to HIGH_SCHOOL', () => {
    expect(parseSchoolLevel("high-school")).toBe("HIGH_SCHOOL");
  });

  it("returns undefined for unknown values", () => {
    expect(parseSchoolLevel("grade-5")).toBeUndefined();
    expect(parseSchoolLevel("")).toBeUndefined();
    expect(parseSchoolLevel("MIDDLE_SCHOOL")).toBeUndefined();
  });
});

describe("schoolLevelLabel", () => {
  it('converts "middle-school" to "Middle School"', () => {
    expect(schoolLevelLabel("middle-school")).toBe("Middle School");
  });

  it('converts "high-school" to "High School"', () => {
    expect(schoolLevelLabel("high-school")).toBe("High School");
  });

  it('returns "" for unknown values', () => {
    expect(schoolLevelLabel("other")).toBe("");
    expect(schoolLevelLabel("")).toBe("");
  });
});

describe("schoolLevelDisplay", () => {
  it("displays MIDDLE_SCHOOL as Middle School", () => {
    expect(schoolLevelDisplay("MIDDLE_SCHOOL")).toBe("Middle School");
  });

  it("displays HIGH_SCHOOL as High School", () => {
    expect(schoolLevelDisplay("HIGH_SCHOOL")).toBe("High School");
  });
});
