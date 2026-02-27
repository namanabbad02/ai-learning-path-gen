-- Force add the missing columns to the existing table
ALTER TABLE user_assessment_history ADD COLUMN IF NOT EXISTS score INTEGER;
ALTER TABLE user_assessment_history ADD COLUMN IF NOT EXISTS assessment_type VARCHAR(20) DEFAULT 'Initial';

-- Just in case 'onboarded' was missed in users
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarded BOOLEAN DEFAULT FALSE;