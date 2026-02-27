import json

roles = [
    {"id": "role_fullstack", "title": "Full Stack Developer", "desc": "Master both frontend and backend.", "skills": ["JavaScript", "React", "Node.js", "SQL", "HTML/CSS"]},
    {"id": "role_ds", "title": "Data Scientist", "desc": "Extract insights from data using AI.", "skills": ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"]},
    {"id": "role_cyber", "title": "Cyber Security Analyst", "desc": "Protect systems from cyber threats.", "skills": ["Networking", "Linux", "Python", "Cryptography", "Ethical Hacking"]},
    {"id": "role_devops", "title": "DevOps Engineer", "desc": "Bridge development and operations.", "skills": ["Linux", "Docker", "Kubernetes", "CI/CD", "Python"]},
    {"id": "role_mobile_ios", "title": "iOS Developer", "desc": "Build apps for Apple devices.", "skills": ["Swift", "iOS SDK", "Xcode", "Git", "UI/UX Basics"]},
    {"id": "role_mobile_android", "title": "Android Developer", "desc": "Build apps for Android devices.", "skills": ["Kotlin", "Java", "Android SDK", "Git", "XML"]},
    {"id": "role_game_dev", "title": "Game Developer", "desc": "Create interactive video games.", "skills": ["C++", "C#", "Unity", "Unreal Engine", "Linear Algebra"]},
    {"id": "role_cloud_aws", "title": "Cloud Architect (AWS)", "desc": "Design scalable cloud infrastructure.", "skills": ["AWS Services", "Networking", "Linux", "Python", "Security Groups"]},
    {"id": "role_ui_ux", "title": "UI/UX Designer", "desc": "Design user-friendly interfaces.", "skills": ["Figma", "Adobe XD", "Prototyping", "HTML/CSS", "User Research"]},
    {"id": "role_blockchain", "title": "Blockchain Developer", "desc": "Build decentralized applications.", "skills": ["Solidity", "Cryptography", "JavaScript", "Smart Contracts", "Node.js"]},
    {"id": "role_qa", "title": "QA Automation Engineer", "desc": "Automate software testing.", "skills": ["Selenium", "Java", "Python", "SQL", "Jira"]},
    {"id": "role_data_eng", "title": "Data Engineer", "desc": "Build data pipelines and architecture.", "skills": ["SQL", "Python", "Spark", "Hadoop", "ETL Tools"]},
    {"id": "role_frontend", "title": "Frontend Developer", "desc": "Specialize in visual interfaces.", "skills": ["JavaScript", "React", "Vue.js", "HTML/CSS", "TypeScript"]},
    {"id": "role_backend", "title": "Backend Developer", "desc": "Handle server-side logic.", "skills": ["Node.js", "Python", "Go", "SQL", "Redis"]},
    {"id": "role_ml_eng", "title": "ML Engineer", "desc": "Deploy machine learning models.", "skills": ["Python", "TensorFlow", "Docker", "Kubernetes", "API Design"]},
    {"id": "role_product", "title": "Product Manager", "desc": "Guide product success.", "skills": ["Agile", "Jira", "User Research", "Data Analysis", "Communication"]},
    {"id": "role_network", "title": "Network Engineer", "desc": "Manage computer networks.", "skills": ["Networking", "Cisco IOS", "TCP/IP", "Firewalls", "Linux"]},
    {"id": "role_embedded", "title": "Embedded Systems Eng", "desc": "Code for hardware devices.", "skills": ["C", "C++", "Microcontrollers", "RTOS", "Electronics"]},
    {"id": "role_dba", "title": "Database Administrator", "desc": "Manage and secure databases.", "skills": ["SQL", "PostgreSQL", "Oracle", "Linux", "Backup Strategies"]},
    {"id": "role_sre", "title": "Site Reliability Eng", "desc": "Ensure system uptime.", "skills": ["Linux", "Python", "Go", "Monitoring Tools", "Terraform"]}
]

# Simplified skill tree and resources for the example
data = {
    "roles": [],
    "skills": [],
    "resources": []
}

skill_set = set()
for r in roles:
    data["roles"].append({
        "id": r["id"],
        "title": r["title"],
        "description": r["desc"],
        "salary_range": "$80k - $150k",
        "required_skills": r["skills"]
    })
    for s in r["skills"]:
        skill_set.add(s)

# Auto-generate skill nodes
for i, s_name in enumerate(skill_set):
    s_id = f"skill_{s_name.lower().replace(' ', '_').replace('/', '_')}"
    data["skills"].append({
        "id": s_id, 
        "name": s_name, 
        "category": "Tech", 
        "difficulty": "Intermediate", 
        "prerequisites": [] 
    })
    # Auto-generate a dummy resource for each skill
    data["resources"].append({
        "id": f"res_{s_id}",
        "title": f"Complete Guide to {s_name}",
        "type": "Course",
        "url": f"https://www.coursera.org/search?query={s_name}",
        "duration": "10 Hours",
        "teaches": [s_id]
    })

# Save to file
with open('../data/career_data.json', 'w') as f:
    json.dump(data, f, indent=2)

print("✅ Generated 20+ Roles and saved to data/career_data.json")