const router = require('express').Router();
const axios = require('axios');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware to verify Token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Generate Learning Path
router.post('/generate-path', verifyToken, async (req, res) => {
    try {
        const { target_role } = req.body; // e.g., "role_data_scientist"
        const userId = req.user.id;

        // 1. Get User's Current Skills from Postgres
        const skillQuery = await db.query('SELECT skill_name FROM user_skills WHERE user_id = $1', [userId]);
        
        // Convert db rows to a list of skill IDs (Mapping names to IDs roughly for now)
        // In a real app, we would store IDs in Postgres. Here we assume mapping is consistent.
        const currentSkills = skillQuery.rows.map(row => {
            // Simple mapping for our prototype data
            const map = { 'Python': 'skill_python', 'JavaScript': 'skill_js', 'SQL': 'skill_sql' };
            return map[row.skill_name] || row.skill_name; 
        });

        // 2. Call Python AI Engine
        const aiResponse = await axios.post(`${process.env.AI_ENGINE_URL}/recommend`, {
            target_role_id: target_role,
            current_skills: currentSkills
        });

        // 3. Return AI Data to Frontend
        res.json(aiResponse.data);

    } catch (err) {
        console.error("AI Service Error:", err.message);
        res.status(500).json({ message: "Failed to generate path. Ensure AI Engine is running." });
    }
});

// Get All Career Roles (Fetches from AI Engine)
router.get('/roles', async (req, res) => {
    try {
        // Call the Python Microservice
        const response = await axios.get(`${process.env.AI_ENGINE_URL}/roles`);
        res.json(response.data);
    } catch (err) {
        console.error("Error fetching roles from AI:", err.message);
        res.status(500).json({ message: "Failed to fetch career roles" });
    }
});

// Add a Skill (User claims they know something)
router.post('/add-skill', verifyToken, async (req, res) => {
    try {
        const { skill_name } = req.body;
        await db.query(
            'INSERT INTO user_skills (user_id, skill_name, proficiency_level) VALUES ($1, $2, $3)',
            [req.user.id, skill_name, 1]
        );
        res.json({ message: "Skill added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;