import json
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

# Connect to Postgres
conn = psycopg2.connect(
    dbname="learning_db", 
    user="admin", 
    password="password123", 
    host="localhost", 
    port="5433" # Use your correct port (5432 or 5433)
)
cur = conn.cursor()

def seed_questions():
    print("🗑️  Clearing old questions...")
    cur.execute("TRUNCATE TABLE question_bank RESTART IDENTITY")
    
    print("📂 Loading JSON...")
    with open('../data/question_bank_dump.json', 'r') as f:
        questions = json.load(f)
    
    print(f"🚀 Inserting {len(questions)} questions...")
    for q in questions:
        cur.execute("""
            INSERT INTO question_bank (role_id, topic_tag, difficulty, question_text, options, correct_index)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (q['role_id'], q['topic_tag'], q['difficulty'], q['question_text'], json.dumps(q['options']), q['correct_index']))
    
    conn.commit()
    print("✅ Success!")
    cur.close()
    conn.close()

if __name__ == "__main__":
    seed_questions()