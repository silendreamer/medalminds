-- Migration 0019: Drop Answer_old backup table
--
-- Answer_old was kept as a safety backup during migration 0018 (Answer restructure).
-- The new MultipleChoice + Answer tables have been verified and all app code
-- reads from them exclusively. Safe to drop.

DROP TABLE IF EXISTS "Answer_old";
