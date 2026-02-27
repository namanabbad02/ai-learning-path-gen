const router = require('express').Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, career_goal } = req.body;

    // 1. Check if user exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(401).json({ message: 'User already exists!' });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert into DB
    const newUser = await db.query(
      'INSERT INTO users (username, email, password_hash, career_goal) VALUES ($1, $2, $3, $4) RETURNING id, username, career_goal',
      [username, email, hashedPassword, career_goal]
    );

    // 4. Generate Token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: newUser.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid Credential' });
    }

    // 2. Check Password
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid Credential' });
    }

    // 3. Generate Token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 4. Fetch User Skills to send back
    const skills = await db.query('SELECT skill_name FROM user_skills WHERE user_id = $1', [user.rows[0].id]);
    const skillList = skills.rows.map(s => s.skill_name);

    res.json({ 
        token, 
        user: {
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email,
            career_goal: user.rows[0].career_goal,
            skills: skillList,
            last_active_role: user.rows[0].last_active_role // <--- Return this
        } 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// router.put('/update-role', async (req, res) => {
//     try {
//         const { userId, roleId } = req.body;
//         await db.query('UPDATE users SET last_active_role = $1 WHERE id = $2', [roleId, userId]);
//         res.json({ success: true });
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// });

// Add this inside server/routes/auth.js (before module.exports)

router.put('/update-role', async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        
        if (!userId || !roleId) {
            return res.status(400).json({ message: "Missing userId or roleId" });
        }

        await db.query('UPDATE users SET last_active_role = $1 WHERE id = $2', [roleId, userId]);
        res.json({ success: true });
    } catch (err) {
        console.error("Error updating role:", err.message); // <--- LOG THE ERROR
        // Don't crash, just return 500
        res.status(500).json({ message: "Server Error updating role" });
    }
});

module.exports = router;