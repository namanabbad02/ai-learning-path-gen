import json
import os
from db_connector import db

# Path to the dataset
DATA_PATH = os.path.join(os.path.dirname(__file__), '../data/career_data.json')

def load_data():
    """Reads the JSON file."""
    if not os.path.exists(DATA_PATH):
        print(f"❌ Data file not found at {DATA_PATH}")
        return None
    
    with open(DATA_PATH, 'r') as f:
        return json.load(f)

def clear_database():
    """Wipes the database clean before seeding (Prevent duplicates)."""
    print("🧹 Clearing existing graph data...")
    query = "MATCH (n) DETACH DELETE n"
    db.execute_query(query)

def seed_roles(roles):
    """Creates Career Role nodes and links them to required skills."""
    print("🚀 Seeding Roles...")
    for role in roles:
        # 1. Create the Role Node
        query_role = """
        MERGE (c:Career {id: $id})
        ON CREATE SET c.title = $title, c.description = $desc, c.salary = $salary
        """
        db.execute_query(query_role, {
            "id": role['id'],
            "title": role['title'],
            "desc": role['description'],
            "salary": role['salary_range']
        })

        # 2. Link Role to Skills (Relationship: REQUIRES_SKILL)
        for skill_name in role['required_skills']:
            # Note: We assume the skill node might be created later, 
            # so we use MERGE on both ends to ensure existence.
            query_rel = """
            MATCH (c:Career {id: $role_id})
            MERGE (s:Skill {name: $skill_name})
            MERGE (c)-[:REQUIRES_SKILL]->(s)
            """
            db.execute_query(query_rel, {
                "role_id": role['id'], 
                "skill_name": skill_name
            })

def seed_skills(skills):
    """Creates Skill nodes and handles prerequisites (Skill Tree)."""
    print("🧠 Seeding Skills & Prerequisites...")
    for skill in skills:
        # 1. Create/Update Skill Node
        query_skill = """
        MERGE (s:Skill {name: $name})
        SET s.id = $id, s.category = $category, s.difficulty = $difficulty
        """
        db.execute_query(query_skill, {
            "id": skill['id'],
            "name": skill['name'],
            "category": skill['category'],
            "difficulty": skill['difficulty']
        })

        # 2. Link Prerequisites (Skill -> REQUIRES -> Skill)
        # Example: Machine Learning -> REQUIRES -> Python
        for prereq_id in skill['prerequisites']:
            query_prereq = """
            MATCH (s:Skill {id: $skill_id})
            MATCH (p:Skill {id: $prereq_id})
            MERGE (s)-[:PREREQUISITE]->(p)
            """
            db.execute_query(query_prereq, {
                "skill_id": skill['id'],
                "prereq_id": prereq_id
            })

def seed_resources(resources):
    """Creates Learning Resource nodes (Courses, Articles)."""
    print("📚 Seeding Learning Resources...")
    for res in resources:
        # 1. Create Resource Node
        query_res = """
        MERGE (r:Resource {id: $id})
        SET r.title = $title, r.type = $type, r.url = $url, r.duration = $duration
        """
        db.execute_query(query_res, {
            "id": res['id'],
            "title": res['title'],
            "type": res['type'],
            "url": res['url'],
            "duration": res['duration']
        })

        # 2. Link Resource to Skill (Resource -> TEACHES -> Skill)
        for skill_id in res['teaches']:
            query_teach = """
            MATCH (r:Resource {id: $res_id})
            MATCH (s:Skill {id: $skill_id})
            MERGE (r)-[:TEACHES]->(s)
            """
            db.execute_query(query_teach, {
                "res_id": res['id'],
                "skill_id": skill_id
            })

def main():
    data = load_data()
    if not data:
        return

    clear_database()
    
    # Order matters here slightly, but MERGE handles most dependency issues.
    # We process skills first so the nodes exist when Roles look for them.
    seed_skills(data['skills']) 
    seed_roles(data['roles'])
    seed_resources(data['resources'])

    print("✨ Knowledge Graph Seeding Complete!")
    db.close()

if __name__ == "__main__":
    main()