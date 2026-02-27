-- 1. Add onboarded flag to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarded BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS experience_level VARCHAR(20) DEFAULT 'Beginner';

-- 2. Create Question Bank
CREATE TABLE IF NOT EXISTS question_bank (
    id SERIAL PRIMARY KEY,
    role_id VARCHAR(50) NOT NULL,
    topic_tag VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_index INTEGER NOT NULL
);

-- 3. Create Assessment History
CREATE TABLE IF NOT EXISTS user_assessment_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    role_id VARCHAR(50),
    weak_topics JSONB,
    strong_topics JSONB,
    score INTEGER,
    assessment_type VARCHAR(20) DEFAULT 'Initial',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);