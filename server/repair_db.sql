-- 1. Fix Users Table (For Dashboard Persistence)
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_role VARCHAR(50);

-- 2. Fix History Table (For Trend Chart)
ALTER TABLE user_assessment_history ADD COLUMN IF NOT EXISTS score INTEGER;
ALTER TABLE user_assessment_history ADD COLUMN IF NOT EXISTS assessment_type VARCHAR(20) DEFAULT 'Initial';

-- 3. Fix Users Onboarding (For Logic Flow)
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarded BOOLEAN DEFAULT FALSE;

-- 4. Check if data exists (This won't change data, just a sanity check)
SELECT count(*) as history_count FROM user_assessment_history;