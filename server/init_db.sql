-- 1. Users Table: Stores login info and basic profile
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    career_goal VARCHAR(100), -- e.g., "Data Scientist"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Skills: Tracks what the user already knows (Self-reported or Assessed)
CREATE TABLE IF NOT EXISTS user_skills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(50) NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5), -- 1=Beginner, 5=Expert
    verified BOOLEAN DEFAULT FALSE
);

-- 3. Assessment Results: Stores quiz scores
CREATE TABLE IF NOT EXISTS assessment_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    skill_focus VARCHAR(50), -- e.g., "Python Logic"
    score INTEGER,
    total_questions INTEGER,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Learning Progress: Tracks which courses the user has started/completed
CREATE TABLE IF NOT EXISTS learning_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    resource_id VARCHAR(50), -- Matches the ID in Neo4j/JSON
    status VARCHAR(20) DEFAULT 'IN_PROGRESS', -- 'COMPLETED', 'IN_PROGRESS'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_option CHAR(1), -- 'A', 'B', 'C', 'D'
    category VARCHAR(50) -- 'Logic', 'Coding', 'Math'
);

-- Insert 15 Logical/Coding Questions
INSERT INTO quiz_questions (question_text, option_a, option_b, option_c, option_d, correct_option, category) VALUES
('What is the output of 2 + "2" in JavaScript?', '4', '22', 'Error', 'NaN', 'B', 'Coding'),
('Which data structure uses LIFO?', 'Queue', 'Array', 'Stack', 'Tree', 'C', 'Coding'),
('Complete the series: 2, 6, 12, 20, ?', '28', '30', '32', '42', 'B', 'Logic'),
('What does SQL stand for?', 'Structured Question List', 'Simple Query Language', 'Structured Query Language', 'System Query Logic', 'C', 'Coding'),
('Which is NOT a programming language?', 'HTML', 'Python', 'Java', 'C++', 'A', 'Coding'),
('If A is B’s brother, B is C’s sister, and C is D’s father, how is D related to A?', 'Nephew/Niece', 'Brother', 'Uncle', 'Cousin', 'A', 'Logic'),
('Which complexity is the most efficient?', 'O(n)', 'O(n^2)', 'O(log n)', 'O(1)', 'D', 'Coding'),
('Binary representation of 5 is:', '100', '101', '110', '011', 'B', 'Math'),
('What is a "commit" in Git?', 'Saving changes', 'Deleting a file', 'Uploading to server', 'Running code', 'A', 'Coding'),
('Which protocol secures web traffic?', 'HTTP', 'FTP', 'SMTP', 'HTTPS', 'D', 'Coding'),
('Solve: 10 / 2 * (3 + 2) = ?', '1', '25', '0.5', '10', 'B', 'Math'),
('What is the full form of AI?', 'Automated Intel', 'Artificial Intelligence', 'Applied Input', 'Advanced Interface', 'B', 'Coding'),
('In Python, lists are:', 'Mutable', 'Immutable', 'Static', 'None of above', 'A', 'Coding'),
('Logical Operator for AND is:', '||', '&&', '!', '#', 'B', 'Coding'),
('Next prime number after 7 is:', '9', '10', '11', '13', 'C', 'Math');


-- 1. Enhanced User Profile (Added experience level)
ALTER TABLE users ADD COLUMN IF NOT EXISTS experience_level VARCHAR(20) DEFAULT 'Beginner'; -- 'Beginner', 'Intermediate', 'Advanced'

-- 2. Detailed Question Bank
-- Stores questions mapped to a Role AND a specific Skill Topic (e.g., 'Data Scientist' -> 'Pandas')
CREATE TABLE IF NOT EXISTS question_bank (
    id SERIAL PRIMARY KEY,
    role_id VARCHAR(50) NOT NULL,   -- e.g., 'role_data_scientist'
    topic_tag VARCHAR(50) NOT NULL, -- e.g., 'Pandas', 'Calculus', 'React Hooks'
    difficulty VARCHAR(20) NOT NULL, -- 'Beginner', 'Intermediate', 'Advanced'
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,         -- Stores ["Op A", "Op B", "Op C", "Op D"]
    correct_index INTEGER NOT NULL  -- 0, 1, 2, or 3
);

-- 3. Assessment Logs (Granular Tracking)
CREATE TABLE IF NOT EXISTS user_assessment_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    role_id VARCHAR(50),
    weak_topics JSONB, -- Stores list of topics user failed e.g. ["Pandas", "Recursion"]
    strong_topics JSONB, -- Stores list of topics user passed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);