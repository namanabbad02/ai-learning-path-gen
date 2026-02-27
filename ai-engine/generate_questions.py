import json
import random

# Configuration: 35 Questions per role, split by difficulty
ROLES = [
    "role_fullstack","role_ds",
    "role_cyber",
    "role_devops",
    "role_mobile_ios",
    "role_mobile_android",
    "role_game_dev",
    "role_cloud_aws",
    "role_ui_ux",
    "role_blockchain","role_qa",
    "role_data_eng",
    "role_frontend",
    "role_backend",
    "role_ml_eng", 
    "role_product",
    "role_network",
    "role_embedded",
    "role_dba",
    "role_sre",
]

DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"]

# Startup Hack: Instead of manually writing 700 questions, we generate a 
# structure that looks real. In production, you replace this loop with GPT-4 API.
def generate_mock_questions():
    question_bank = []
    
    for role in ROLES:
        # Define topics relevant to the role (The AI needs these to map weak areas)
        if "data" in role:
            topics = ["Python Basics", "Pandas", "Statistics", "Machine Learning", "SQL"]
        elif "fullstack" in role:
            topics = ["HTML/CSS", "JavaScript", "React State", "Node.js API", "Database Normalization"]
        elif "cyber" in role:
            topics = ["Network Ports", "Encryption", "Firewalls", "Penetration Testing", "Linux Perms"]
        else:
            topics = ["General Logic", "Coding Basics", "System Design", "Algorithms", "Git"]

        for level in DIFFICULTIES:
            # 12 questions per level per role (approx 35 total)
            for _ in range(12):
                topic = random.choice(topics)
                q_data = {
                    "role_id": role,
                    "topic_tag": topic,
                    "difficulty": level,
                    "question_text": f"[{role.replace('role_', '').upper()} - {level}] Real-world interview question regarding {topic} functionality?",
                    "options": [
                        f"{topic} is used for styling",
                        f"{topic} optimizes memory",
                        f"{topic} handles requests",
                        f"{topic} is a design pattern"
                    ],
                    "correct_index": 1 # Randomize this in real app
                }
                question_bank.append(q_data)

    return question_bank

def save_to_json():
    data = generate_mock_questions()
    with open('../data/question_bank_dump.json', 'w') as f:
        json.dump(data, f, indent=2)
    print(f"✅ Generated {len(data)} specialized questions.")

if __name__ == "__main__":
    save_to_json()