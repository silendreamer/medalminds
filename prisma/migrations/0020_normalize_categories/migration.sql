-- Migration 0020: Normalize Science Bowl category names to current PDF labels
--
-- NSB PDFs evolved their category naming across years. This consolidates older
-- variants into the names used in current (post-2015) question papers:
--   "Earth Science" / "Astronomy" / "Earth & Space" → "Earth and Space Science"
--
-- Categories kept as-is (already match current PDF naming):
--   Math, General Science, Life Science, Physical Science, Energy,
--   Biology, Chemistry, Physics, Earth and Space Science

UPDATE "Question"
  SET "category" = 'Earth and Space Science'
  WHERE "competitionId" = 'science-bowl'
    AND "category" IN ('Earth Science', 'Astronomy', 'Earth & Space', 'Earth and Space');

UPDATE "Lesson"
  SET "category" = 'Earth and Space Science'
  WHERE "competitionId" = 'science-bowl'
    AND "category" IN ('Earth Science', 'Astronomy', 'Earth & Space', 'Earth and Space');
