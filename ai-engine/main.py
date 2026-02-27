# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from typing import List, Optional
# from db_connector import db
# import uvicorn

# # Initialize the API app
# app = FastAPI(title="AI Learning Path Generator", version="1.0")

# # --- Data Models (Input/Output definitions) ---

# # 1. Request Model (Updated with Quiz Score)
# class UserRequest(BaseModel):
#     target_role_id: str  # e.g., "role_data_scientist"
#     current_skills: List[str] = [] # Skills user already knows
#     quiz_score: int = 0  # New: Score from the assessment

# # 2. Resource Output Model
# class Resource(BaseModel):
#     title: str
#     type: str
#     url: str
#     duration: str

# # 3. Step Output Model
# class LearningStep(BaseModel):
#     step_number: int
#     skill_name: str
#     reason: str
#     resources: List[Resource]

# # 4. Final Path Response
# class LearningPathResponse(BaseModel):
#     role_title: str
#     estimated_duration: str
#     path: List[LearningStep]
#     note: str = "" # New: specific AI feedback

# # 5. Role Output Model (For the Role Explorer Page)
# class RoleResponse(BaseModel):
#     id: str
#     title: str
#     description: str

# # --- Core Logic ---

# @app.get("/")
# def health_check():
#     return {"status": "AI Engine is running", "database_connected": db.driver is not None}

# # --- Endpoint 1: Get All Roles (For Role Explorer) ---
# @app.get("/roles", response_model=List[RoleResponse])
# def get_all_roles():
#     """
#     Fetches all available career roles directly from the Knowledge Graph.
#     """
#     query = """
#     MATCH (c:Career)
#     RETURN c.id as id, c.title as title, c.description as description
#     ORDER BY c.title ASC
#     """
    
#     try:
#         results = db.execute_query(query)
#         roles = []
#         for record in results:
#             roles.append(RoleResponse(
#                 id=record['id'],
#                 title=record['title'],
#                 description=record['description']
#             ))
#         return roles
#     except Exception as e:
#         print(f"Error fetching roles: {e}")
#         raise HTTPException(status_code=500, detail="Database Error")

# # --- Endpoint 2: Generate Path (The AI Brain) ---
# @app.post("/recommend", response_model=LearningPathResponse)
# def generate_learning_path(request: UserRequest):
#     """
#     The Core AI Logic:
#     1. Identify skills required for the Target Role.
#     2. Filter based on what user knows AND their quiz score.
#     3. Traverse Graph for prerequisites.
#     4. Return sequenced path.
#     """
    
#     # 1. Get Role Details
#     role_query = "MATCH (r:Career {id: $role_id}) RETURN r.title as title"
#     role_result = db.execute_query(role_query, {"role_id": request.target_role_id})
    
#     if not role_result:
#         raise HTTPException(status_code=404, detail="Target Role not found")
    
#     role_title = role_result[0]['title']

#     # 2. AI Logic Adjustment based on Score
#     ai_note = ""
#     effective_existing_skills = request.current_skills.copy()

#     # Logic: If score is high, assume they know 'Beginner' stuff
#     # If score is low, maybe we don't skip anything, or we add a note.
#     if request.quiz_score < 40:
#         ai_note = "Based on your assessment score (< 40%), we have included foundational modules to build strong basics."
#     elif request.quiz_score > 80:
#         ai_note = "Excellent assessment score! We have optimized the path for an accelerated pace."

#     # 3. Find Missing Skills & Prerequisites (Graph Traversal)
#     path_query = """
#     MATCH (r:Career {id: $role_id})-[:REQUIRES_SKILL]->(target_skill:Skill)
#     WHERE NOT target_skill.id IN $existing_skills
    
#     // Optional: Find prerequisites for these target skills
#     OPTIONAL MATCH path = (target_skill)-[:PREREQUISITE*0..3]->(req_skill:Skill)
#     WHERE NOT req_skill.id IN $existing_skills
    
#     // Return unique skills needed
#     WITH DISTINCT req_skill, target_skill
#     RETURN req_skill.id as skill_id, req_skill.name as skill_name, req_skill.difficulty as difficulty
#     """
    
#     skills_data = db.execute_query(path_query, {
#         "role_id": request.target_role_id,
#         "existing_skills": effective_existing_skills
#     })

#     # 4. Sort Skills & Remove Duplicates
#     difficulty_order = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}
    
#     seen_skills = set()
#     unique_skills = []
#     for skill in skills_data:
#         if skill['skill_id'] not in seen_skills:
#             unique_skills.append(skill)
#             seen_skills.add(skill['skill_id'])

#     sorted_skills = sorted(unique_skills, key=lambda x: difficulty_order.get(x['difficulty'], 4))

#     # 5. Generate the Path Steps with Resources
#     learning_path = []
#     total_duration_hours = 0
    
#     for index, skill in enumerate(sorted_skills):
#         # Fetch resources
#         res_query = """
#         MATCH (r:Resource)-[:TEACHES]->(s:Skill {id: $skill_id})
#         RETURN r.title as title, r.type as type, r.url as url, r.duration as duration
#         """
#         resources_data = db.execute_query(res_query, {"skill_id": skill['skill_id']})
        
#         formatted_resources = []
#         for res in resources_data:
#             formatted_resources.append(Resource(
#                 title=res['title'], 
#                 type=res['type'], 
#                 url=res['url'], 
#                 duration=res['duration']
#             ))
#             try:
#                 hours = int(res['duration'].split(" ")[0])
#                 total_duration_hours += hours
#             except:
#                 pass

#         step = LearningStep(
#             step_number=index + 1,
#             skill_name=skill['skill_name'],
#             reason=f"Required step for {role_title}",
#             resources=formatted_resources
#         )
#         learning_path.append(step)

#     return LearningPathResponse(
#         role_title=role_title,
#         estimated_duration=f"{total_duration_hours} Hours",
#         path=learning_path,
#         note=ai_note
#     )

# # --- Run Server ---
# if __name__ == "__main__":
#     print("🚀 Starting AI Engine on port 8000...")
#     uvicorn.run(app, host="0.0.0.0", port=8000)


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from db_connector import db
import uvicorn

# Initialize the API app
app = FastAPI(title="AI Learning Path Generator", version="2.0")

# --- Data Models (Input/Output definitions) ---

# 1. Request Model (Granular Topic Analysis)
class UserRequest(BaseModel):
    target_role_id: str             # e.g., "role_data_scientist"
    weak_topics: List[str] = []     # e.g., ["Pandas", "Recursion"] - User failed these
    strong_topics: List[str] = []   # e.g., ["Python Basics", "SQL"] - User passed these

# 2. Resource Output Model
class Resource(BaseModel):
    title: str
    type: str
    url: str
    duration: str

# 3. Step Output Model
class LearningStep(BaseModel):
    step_number: int
    skill_name: str
    reason: str
    resources: List[Resource]

# 4. Final Path Response
class LearningPathResponse(BaseModel):
    role_title: str
    estimated_duration: str
    path: List[LearningStep]
    note: str = "" # Specific AI feedback based on performance

# 5. Role Output Model (For the Role Explorer Page)
class RoleResponse(BaseModel):
    id: str
    title: str
    description: str

# --- Core Logic ---

@app.get("/")
def health_check():
    return {"status": "AI Engine is running", "database_connected": db.driver is not None}

# --- Endpoint 1: Get All Roles (For Role Explorer) ---
@app.get("/roles", response_model=List[RoleResponse])
def get_all_roles():
    """
    Fetches all available career roles directly from the Knowledge Graph.
    """
    query = """
    MATCH (c:Career)
    RETURN c.id as id, c.title as title, c.description as description
    ORDER BY c.title ASC
    """
    
    try:
        results = db.execute_query(query)
        roles = []
        for record in results:
            roles.append(RoleResponse(
                id=record['id'],
                title=record['title'],
                description=record['description']
            ))
        return roles
    except Exception as e:
        print(f"Error fetching roles: {e}")
        raise HTTPException(status_code=500, detail="Database Error")

# --- Endpoint 2: Generate Personalized Path (The AI Brain) ---
# @app.post("/recommend", response_model=LearningPathResponse)
# def generate_learning_path(request: UserRequest):
#     """
#     The Hyper-Personalized AI Logic:
#     1. ANALYZE: Look at Weak vs Strong topics.
#     2. REMEDIATE: Generate 'Refresher' steps for Weak topics.
#     3. OPTIMIZE: Query Graph for Role Skills, strictly EXCLUDING Strong topics.
#     4. SEQUENCE: Merge Remedial steps + Core Curriculum.
#     """
    
#     # 1. Get Role Details
#     role_query = "MATCH (r:Career {id: $role_id}) RETURN r.title as title"
#     role_result = db.execute_query(role_query, {"role_id": request.target_role_id})
    
#     if not role_result:
#         raise HTTPException(status_code=404, detail="Target Role not found")
    
#     role_title = role_result[0]['title']
    
#     learning_path = []
#     total_duration_hours = 0

#     # --- PHASE A: REMEDIAL STEPS (Address Weaknesses First) ---
#     # If user failed specific topics, we insert them at the start (Step 0)
#     if request.weak_topics:
#         for topic in request.weak_topics:
#             # Try to find a specific resource in our Graph for this topic
#             # We use regex match (?i) for case-insensitive search
#             resource_query = """
#             MATCH (r:Resource)-[:TEACHES]->(s:Skill)
#             WHERE s.name =~ '(?i).*' + $topic + '.*'
#             RETURN r.title as title, r.type as type, r.url as url, r.duration as duration
#             LIMIT 1
#             """
#             res_result = db.execute_query(resource_query, {"topic": topic})
            
#             remedial_resources = []
#             if res_result:
#                 r = res_result[0]
#                 remedial_resources.append(Resource(
#                     title=r['title'], type="Remedial " + r['type'], url=r['url'], duration=r['duration']
#                 ))
#             else:
#                 # Fallback: If graph has no specific resource for this granular topic, generate a smart search link
#                 remedial_resources.append(Resource(
#                     title=f"Deep Dive: {topic}",
#                     type="Generated Search",
#                     url=f"https://www.google.com/search?q={topic}+tutorial+for+beginners",
#                     duration="2 Hours"
#                 ))
#                 total_duration_hours += 2

#             learning_path.append(LearningStep(
#                 step_number=0, 
#                 skill_name=f"Refresher: {topic}", 
#                 reason="Gap identified in assessment. Prioritized for revision.",
#                 resources=remedial_resources
#             ))

#     # --- PHASE B: CORE CURRICULUM (Graph Traversal) ---
#     # Find skills required for the role, BUT filter out what they already know (Strong Topics)
    
#     path_query = """
#     MATCH (r:Career {id: $role_id})-[:REQUIRES_SKILL]->(target_skill:Skill)
    
#     // CRITICAL: Exclude skills that match the user's strong topics
#     WHERE NOT target_skill.name IN $strong_topics
    
#     // Find prerequisites for the remaining skills
#     OPTIONAL MATCH path = (target_skill)-[:PREREQUISITE*0..3]->(req_skill:Skill)
#     WHERE NOT req_skill.name IN $strong_topics
    
#     // Return unique skills needed
#     WITH DISTINCT req_skill, target_skill
#     RETURN req_skill.id as skill_id, req_skill.name as skill_name, req_skill.difficulty as difficulty
#     """
    
#     skills_data = db.execute_query(path_query, {
#         "role_id": request.target_role_id,
#         "strong_topics": request.strong_topics
#     })

#     # Sort Skills (Beginner -> Advanced)
#     difficulty_order = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}
    
#     seen_skills = set()
#     unique_skills = []
#     for skill in skills_data:
#         if skill['skill_id'] not in seen_skills:
#             unique_skills.append(skill)
#             seen_skills.add(skill['skill_id'])

#     sorted_skills = sorted(unique_skills, key=lambda x: difficulty_order.get(x['difficulty'], 4))

#     # Build the Core Path Steps
#     step_counter = 1
#     for skill in sorted_skills:
#         # Fetch resources
#         res_query = """
#         MATCH (r:Resource)-[:TEACHES]->(s:Skill {id: $skill_id})
#         RETURN r.title as title, r.type as type, r.url as url, r.duration as duration
#         """
#         resources_data = db.execute_query(res_query, {"skill_id": skill['skill_id']})
        
#         formatted_resources = []
#         for res in resources_data:
#             formatted_resources.append(Resource(
#                 title=res['title'], 
#                 type=res['type'], 
#                 url=res['url'], 
#                 duration=res['duration']
#             ))
#             try:
#                 hours = int(res['duration'].split(" ")[0])
#                 total_duration_hours += hours
#             except:
#                 pass

#         learning_path.append(LearningStep(
#             step_number=step_counter,
#             skill_name=skill['skill_name'],
#             reason=f"Required for {role_title}",
#             resources=formatted_resources
#         ))
#         step_counter += 1

#     # --- PHASE C: CONSTRUCT FEEDBACK NOTE ---
#     ai_note = "Path generated successfully."
#     if request.weak_topics and request.strong_topics:
#         ai_note = f"We optimized your path! Skipped {len(request.strong_topics)} mastered topics and added {len(request.weak_topics)} remedial modules."
#     elif request.strong_topics:
#         ai_note = f"Accelerated Track: We skipped {len(request.strong_topics)} topics you already mastered."
#     elif request.weak_topics:
#         ai_note = "Foundation Track: We added extra resources to strengthen your basics."

#     return LearningPathResponse(
#         role_title=role_title,
#         estimated_duration=f"{total_duration_hours} Hours",
#         path=learning_path,
#         note=ai_note
#     )

@app.post("/recommend", response_model=LearningPathResponse)
def generate_learning_path(request: UserRequest):
    """
    The Hyper-Personalized AI Logic:
    1. ANALYZE: Fetch all requirements for the role.
    2. SMART FILTER: Fuzzy match User's Strong Topics against Graph Skills.
       (e.g., "Python Basics" in Quiz will skip "Python" in Graph).
    3. REMEDIATE: Generate 'Refresher' steps for Weak topics.
    4. SEQUENCE: Merge Remedial steps + Remaining Core Curriculum.
    """
    
    # 1. Get Role Details
    role_query = "MATCH (r:Career {id: $role_id}) RETURN r.title as title"
    role_result = db.execute_query(role_query, {"role_id": request.target_role_id})
    
    if not role_result:
        raise HTTPException(status_code=404, detail="Target Role not found")
    
    role_title = role_result[0]['title']
    total_duration_hours = 0
    learning_path = []

    # --- PHASE A: SMART SKILL FILTERING ---
    
    # 1. Fetch ALL skills required for the role (No filtering in Cypher yet)
    # We get prerequisites too (up to 3 levels deep)
    raw_query = """
    MATCH (r:Career {id: $role_id})-[:REQUIRES_SKILL]->(target_skill:Skill)
    OPTIONAL MATCH (target_skill)-[:PREREQUISITE*0..3]->(req_skill:Skill)
    RETURN DISTINCT req_skill.id as skill_id, req_skill.name as skill_name, req_skill.difficulty as difficulty
    """
    
    all_required_skills = db.execute_query(raw_query, {"role_id": request.target_role_id})

    # 2. Python-Side Fuzzy Matching
    final_skills = []
    skipped_skills = []
    
    # Normalize strong topics to lowercase for comparison
    strong_topics_norm = [t.lower() for t in request.strong_topics]
    
    for skill in all_required_skills:
        skill_name = skill['skill_name'].lower()
        
        # LOGIC: Check if a strong topic is contained in the skill name OR vice versa
        # Example: "Python" is in "Python Basics" -> Match found -> Skip
        is_known = any(skill_name in t or t in skill_name for t in strong_topics_norm)
        
        # Only skip if they actually scored decently on the quiz (> 60%)
        if is_known and request.quiz_score > 60:
            skipped_skills.append(skill['skill_name'])
        else:
            final_skills.append(skill)

    # --- PHASE B: REMEDIAL STEPS (Weak Topics) ---
    
    if request.weak_topics:
        for topic in request.weak_topics:
            # Try to find a specific resource in Graph, else fallback to search
            resource_query = """
            MATCH (r:Resource)-[:TEACHES]->(s:Skill)
            WHERE toLower(s.name) CONTAINS toLower($topic)
            RETURN r.title as title, r.type as type, r.url as url, r.duration as duration
            LIMIT 1
            """
            res_result = db.execute_query(resource_query, {"topic": topic})
            
            remedial_resources = []
            if res_result:
                r = res_result[0]
                remedial_resources.append(Resource(
                    title=r['title'], type="Remedial " + r['type'], url=r['url'], duration=r['duration']
                ))
            else:
                # Smart Fallback Link
                remedial_resources.append(Resource(
                    title=f"Deep Dive: {topic}",
                    type="Remedial Search",
                    url=f"https://www.google.com/search?q={topic.replace(' ', '+')}+tutorial+free",
                    duration="2 Hours"
                ))
                total_duration_hours += 2

            learning_path.append(LearningStep(
                step_number=0, 
                skill_name=f"Refresher: {topic}", 
                reason="Gap identified in assessment. Prioritized for revision.",
                resources=remedial_resources
            ))

    # --- PHASE C: CORE CURRICULUM SEQUENCING ---
    
    # Sort remaining skills by difficulty
    difficulty_order = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}
    sorted_skills = sorted(final_skills, key=lambda x: difficulty_order.get(x['difficulty'], 4))

    step_counter = 1
    for skill in sorted_skills:
        # Fetch resources for this skill
        res_query = """
        MATCH (r:Resource)-[:TEACHES]->(s:Skill {id: $skill_id})
        RETURN r.title as title, r.type as type, r.url as url, r.duration as duration
        """
        resources_data = db.execute_query(res_query, {"skill_id": skill['skill_id']})
        
        formatted_resources = []
        for res in resources_data:
            formatted_resources.append(Resource(
                title=res['title'], 
                type=res['type'], 
                url=res['url'], 
                duration=res['duration']
            ))
            try:
                # Simple parsing: "20 Hours" -> 20
                hours = int(res['duration'].split(" ")[0])
                total_duration_hours += hours
            except:
                pass

        learning_path.append(LearningStep(
            step_number=step_counter,
            skill_name=skill['skill_name'],
            reason=f"Required for {role_title}",
            resources=formatted_resources
        ))
        step_counter += 1

    # --- PHASE D: CONSTRUCT FEEDBACK NOTE ---
    
    ai_note = "Path generated based on role requirements."
    
    if skipped_skills and request.weak_topics:
        ai_note = f"Personalized for you: We skipped {len(skipped_skills)} mastered skills (like {skipped_skills[0]}) and added {len(request.weak_topics)} remedial modules to fix gaps."
    elif skipped_skills:
        ai_note = f"Accelerated Track: We identified strong performance and skipped {len(skipped_skills)} skills (e.g., {skipped_skills[0]})."
    elif request.weak_topics:
        ai_note = "Foundation Track: We noticed some gaps in your assessment and added specific refresher modules."

    return LearningPathResponse(
        role_title=role_title,
        estimated_duration=f"{total_duration_hours} Hours",
        path=learning_path,
        note=ai_note
    )

# --- Run Server ---
if __name__ == "__main__":
    print("🚀 Starting AI Engine on port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)