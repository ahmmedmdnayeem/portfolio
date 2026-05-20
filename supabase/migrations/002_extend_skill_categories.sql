-- Allow new skill categories used by the portfolio (marketing, fullstack).
ALTER TABLE skills DROP CONSTRAINT IF EXISTS skills_category_check;
ALTER TABLE skills ADD CONSTRAINT skills_category_check
  CHECK (category IN ('blockchain', 'cybersecurity', 'languages', 'tools', 'frameworks', 'platforms', 'marketing', 'fullstack'));
