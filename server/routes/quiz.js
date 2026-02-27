// // // const router = require('express').Router();
// // // const db = require('../config/db');

// // // // Get all 15 questions
// // // router.get('/', async (req, res) => {
// // //     try {
// // //         const result = await db.query('SELECT id, question_text, option_a, option_b, option_c, option_d, category FROM quiz_questions');
// // //         res.json(result.rows);
// // //     } catch (err) {
// // //         res.status(500).send('Server Error');
// // //     }
// // // });

// // // // Calculate Score (Backend Validation)
// // // router.post('/submit', async (req, res) => {
// // //     try {
// // //         const { answers } = req.body; // { 1: 'A', 2: 'B' ... }
// // //         let score = 0;
        
// // //         // Fetch correct answers
// // //         const result = await db.query('SELECT id, correct_option FROM quiz_questions');
// // //         const correctKeys = {};
// // //         result.rows.forEach(row => correctKeys[row.id] = row.correct_option);

// // //         Object.keys(answers).forEach(qId => {
// // //             if (answers[qId] === correctKeys[qId]) score++;
// // //         });

// // //         // Percentage
// // //         const percentage = Math.round((score / result.rows.length) * 100);
// // //         res.json({ score: percentage });
        
// // //     } catch (err) {
// // //         console.error(err);
// // //         res.status(500).send('Server Error');
// // //     }
// // // });

// // // module.exports = router;

// // const router = require('express').Router();
// // const db = require('../config/db');

// // // 1. Get Dynamic Questions (Weighted Algorithm)
// // // Route: GET /api/quiz/:role_id/:experience
// // router.get('/:role_id/:experience', async (req, res) => {
// //     const { role_id, experience } = req.params;
    
// //     console.log(`Fetching questions for Role: ${role_id}, Level: ${experience}`); // Debug log

// //     // Logic: Weighted distribution based on experience
// //     let difficultyDistribution;
// //     if (experience === 'Beginner') difficultyDistribution = { Beginner: 7, Intermediate: 3, Advanced: 0 };
// //     else if (experience === 'Intermediate') difficultyDistribution = { Beginner: 3, Intermediate: 5, Advanced: 2 };
// //     else difficultyDistribution = { Beginner: 0, Intermediate: 2, Advanced: 8 }; // Advanced

// //     try {
// //         let finalQuestions = [];

// //         for (const [level, count] of Object.entries(difficultyDistribution)) {
// //             if (count > 0) {
// //                 // Fetch random questions matching role and difficulty
// //                 const q = await db.query(
// //                     `SELECT id, question_text, options, topic_tag, difficulty 
// //                      FROM question_bank 
// //                      WHERE role_id = $1 AND difficulty = $2 
// //                      ORDER BY RANDOM() LIMIT $3`,
// //                     [role_id, level, count]
// //                 );
// //                 finalQuestions = [...finalQuestions, ...q.rows];
// //             }
// //         }
        
// //         // Fallback: If no questions found (e.g., database empty), return empty array
// //         if (finalQuestions.length === 0) {
// //             console.log("No questions found in DB. Did you run the Python generator?");
// //         }

// //         res.json(finalQuestions);
// //     } catch (err) {
// //         console.error("Database Error:", err);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // // 2. Submit Answers
// // router.post('/submit-granular', async (req, res) => {
// //     try {
// //         const { user_id, role_id, answers } = req.body; 
        
// //         // Fetch correct answers
// //         const ids = Object.keys(answers);
// //         if (ids.length === 0) return res.json({ weak_topics: [], strong_topics: [] });

// //         const dbRes = await db.query(
// //             `SELECT id, correct_index, topic_tag FROM question_bank WHERE id = ANY($1::int[])`,
// //             [ids]
// //         );

// //         let weak_topics = [];
// //         let strong_topics = [];
// //         let score = 0;

// //         dbRes.rows.forEach(q => {
// //             // Check if user answer matches correct index
// //             if (parseInt(answers[q.id]) === q.correct_index) {
// //                 strong_topics.push(q.topic_tag);
// //                 score++;
// //             } else {
// //                 weak_topics.push(q.topic_tag);
// //             }
// //         });

// //         // Calculate Percentage
// //         const percentage = Math.round((score / dbRes.rows.length) * 100);

// //         // Save to History
// //         // Note: Ensure user_assessment_history table exists!
// //         if(user_id) {
// //             await db.query(
// //                 `INSERT INTO user_assessment_history (user_id, role_id, weak_topics, strong_topics) 
// //                  VALUES ($1, $2, $3, $4)`,
// //                 [user_id, role_id, JSON.stringify(weak_topics), JSON.stringify(strong_topics)]
// //             );
// //         }

// //         res.json({ weak_topics, strong_topics, score: percentage });

// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // module.exports = router;

// const router = require('express').Router();
// const db = require('../config/db');

// /**
//  * @route   GET /api/quiz/:role_id/:experience
//  * @desc    Fetches 10 questions based on Role and User Experience Level using a weighted algorithm.
//  * @access  Private (usually called after role selection)
//  */
// router.get('/:role_id/:experience', async (req, res) => {
//     const { role_id, experience } = req.params;

//     // 1. Define Difficulty Distribution based on Experience
//     // This ensures the test is "Adaptive" - not too hard, not too easy.
//     let difficultyDistribution;

//     if (experience === 'Beginner') {
//         // Mostly Beginner, some Intermediate to test potential
//         difficultyDistribution = { Beginner: 7, Intermediate: 3, Advanced: 0 };
//     } else if (experience === 'Intermediate') {
//         // Balanced mix to gauge actual depth
//         difficultyDistribution = { Beginner: 3, Intermediate: 5, Advanced: 2 };
//     } else {
//         // Advanced users skip basics, mostly Advanced questions
//         difficultyDistribution = { Beginner: 0, Intermediate: 2, Advanced: 8 };
//     }

//     try {
//         let finalQuestions = [];

//         // 2. Fetch questions for each difficulty bucket
//         for (const [level, count] of Object.entries(difficultyDistribution)) {
//             if (count > 0) {
//                 // Query: Get random questions matching Role + Difficulty
//                 const q = await db.query(
//                     `SELECT id, question_text, options, topic_tag, difficulty 
//                      FROM question_bank 
//                      WHERE role_id = $1 AND difficulty = $2 
//                      ORDER BY RANDOM() LIMIT $3`,
//                     [role_id, level, count]
//                 );
//                 finalQuestions = [...finalQuestions, ...q.rows];
//             }
//         }

//         // 3. Validation
//         if (finalQuestions.length === 0) {
//             console.warn(`[Warning] No questions found for ${role_id}. Did you run the Python Seeder?`);
//         }

//         res.json(finalQuestions);

//     } catch (err) {
//         console.error("Error fetching quiz:", err.message);
//         res.status(500).send('Server Error');
//     }
// });
// /**
//  * @route   POST /api/quiz/submit-granular
//  * @desc    Grades the quiz, calculates topic strengths, compares with history, and updates user status.
//  * @access  Private
//  */
// router.post('/submit-granular', async (req, res) => {
//     try {
//         const { user_id, role_id, answers, assessment_type } = req.body; 
        
//         // 1. Validate Input
//         const ids = Object.keys(answers);
//         if (ids.length === 0) {
//             return res.json({ weak_topics: [], strong_topics: [], score: 0 });
//         }

//         // 2. Fetch Correct Answers from DB
//         const dbRes = await db.query(
//             `SELECT id, correct_index, topic_tag FROM question_bank WHERE id = ANY($1::int[])`,
//             [ids]
//         );

//         // Use temporary arrays to collect tags (which might contain duplicates)
//         let weak_topics_raw = [];
//         let strong_topics_raw = [];
//         let correctCount = 0;

//         // 3. Grade the Assessment
//         dbRes.rows.forEach(q => {
//             const userAns = parseInt(answers[q.id]);
//             if (userAns === q.correct_index) {
//                 strong_topics_raw.push(q.topic_tag);
//                 correctCount++;
//             } else {
//                 weak_topics_raw.push(q.topic_tag);
//             }
//         });

//         // 3.5. DEDUPLICATION (The Fix)
//         // Convert arrays to Sets to remove duplicate topic tags, then back to arrays
//         const strong_topics = [...new Set(strong_topics_raw)];
//         const weak_topics = [...new Set(weak_topics_raw)];

//         // Calculate Score Percentage
//         const score = Math.round((correctCount / dbRes.rows.length) * 100);

//         // 4. Analytics: Compare with Previous History
//         const historyRes = await db.query(
//             `SELECT score FROM user_assessment_history WHERE user_id = $1 AND role_id = $2`,
//             [user_id, role_id]
//         );

//         let analysis_text = "Great start! This score sets your baseline for this career path.";
//         let improvement = 0;

//         if (historyRes.rows.length > 0) {
//             const totalPrev = historyRes.rows.reduce((acc, curr) => acc + curr.score, 0);
//             const avgPrev = totalPrev / historyRes.rows.length;
            
//             improvement = score - avgPrev;

//             if (improvement > 5) {
//                 analysis_text = `Excellent progress! You improved by ${improvement.toFixed(1)}% compared to your average.`;
//             } else if (improvement < -5) {
//                 analysis_text = `Your score dropped by ${Math.abs(improvement).toFixed(1)}%. We recommend focusing on the weak topics listed below.`;
//             } else {
//                 analysis_text = "You are maintaining a consistent performance level.";
//             }
//         }

//         // 5. Save Results to History
//         await db.query(
//             `INSERT INTO user_assessment_history (user_id, role_id, weak_topics, strong_topics, score, assessment_type) 
//              VALUES ($1, $2, $3, $4, $5, $6)`,
//             [
//                 user_id, 
//                 role_id, 
//                 JSON.stringify(weak_topics), 
//                 JSON.stringify(strong_topics), 
//                 score, 
//                 assessment_type || 'General'
//             ]
//         );

//         // 6. Mark User as Onboarded
//         if (user_id) {
//             await db.query(`UPDATE users SET onboarded = TRUE WHERE id = $1`, [user_id]);
//         }

//         // 7. Return Data to Frontend
//         res.json({ 
//             weak_topics, 
//             strong_topics, 
//             score, 
//             analysis_text, 
//             improvement 
//         });

//     } catch (err) {
//         console.error("Error submitting quiz:", err.message);
//         res.status(500).send('Server Error');
//     }
// });

// /**
//  * @route   GET /api/quiz/stats/:user_id
//  * @desc    Fetches assessment history for the Dashboard Charts
//  * @access  Private
//  */
// // 3. Get User Stats (Filtered by Role)

// router.get('/stats/:user_id', async (req, res) => {
//     try {
//         const { user_id } = req.params;
//         const { role_id } = req.query;

//         console.log(`Fetching stats for User: ${user_id}, Role: ${role_id}`); // Debug Log

//         let query = `SELECT score, created_at, role_id, assessment_type FROM user_assessment_history WHERE user_id = $1`;
//         let params = [user_id];

//         // Only filter by role if it's a valid string (not "undefined" or "null")
//         if (role_id && role_id !== 'undefined' && role_id !== 'null') {
//             query += ` AND role_id = $2`;
//             params.push(role_id);
//         }

//         query += ` ORDER BY created_at ASC`;

//         const result = await db.query(query, params);
        
//         console.log(`Found ${result.rows.length} records.`); // Debug Log
//         res.json(result.rows);

//     } catch (err) {
//         console.error("Stats Error:", err.message); // <--- LOG THE ERROR
//         res.status(500).send('Server Error');
//     }
// });

// // 4. Get Latest Active Role from History
// router.get('/history-check/:user_id', async (req, res) => {
//     try {
//         const { user_id } = req.params;
//         // Find the role_id of the most recent assessment
//         const result = await db.query(
//             `SELECT role_id FROM user_assessment_history 
//              WHERE user_id = $1 
//              ORDER BY created_at DESC LIMIT 1`,
//             [user_id]
//         );

//         if (result.rows.length > 0) {
//             res.json({ hasHistory: true, lastRole: result.rows[0].role_id });
//         } else {
//             res.json({ hasHistory: false });
//         }
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;

// const router = require('express').Router();
// const db = require('../config/db');

// // 1. Get Questions
// router.get('/:role_id/:experience', async (req, res) => {
//     const { role_id, experience } = req.params;
    
//     // Default distribution
//     let difficultyDistribution = { Beginner: 5, Intermediate: 3, Advanced: 2 };
//     if (experience === 'Beginner') difficultyDistribution = { Beginner: 7, Intermediate: 3, Advanced: 0 };
//     if (experience === 'Advanced') difficultyDistribution = { Beginner: 0, Intermediate: 3, Advanced: 7 };

//     try {
//         let finalQuestions = [];
//         for (const [level, count] of Object.entries(difficultyDistribution)) {
//             if (count > 0) {
//                 const q = await db.query(
//                     `SELECT id, question_text, options, topic_tag, difficulty 
//                      FROM question_bank WHERE role_id = $1 AND difficulty = $2 
//                      ORDER BY RANDOM() LIMIT $3`,
//                     [role_id, level, count]
//                 );
//                 finalQuestions = [...finalQuestions, ...q.rows];
//             }
//         }
//         res.json(finalQuestions);
//     } catch (err) {
//         console.error("Error fetching questions:", err);
//         res.status(500).send('Server Error');
//     }
// });

// // 2. Submit Assessment (Detailed Logging Added)
// router.post('/submit-granular', async (req, res) => {
//     try {
//         console.log("📥 Submitting Quiz:", req.body); // DEBUG LOG

//         const { user_id, role_id, answers, assessment_type } = req.body; 
        
//         if (!user_id || !role_id) {
//             console.error("❌ Missing User ID or Role ID");
//             return res.status(400).json({ msg: "Missing Data" });
//         }

//         const ids = Object.keys(answers);
//         if (ids.length === 0) return res.json({ weak_topics: [], strong_topics: [], score: 0 });

//         // Fetch Correct Answers
//         const dbRes = await db.query(
//             `SELECT id, correct_index, topic_tag FROM question_bank WHERE id = ANY($1::int[])`,
//             [ids]
//         );

//         let weak_topics_raw = [];
//         let strong_topics_raw = [];
//         let correctCount = 0;

//         dbRes.rows.forEach(q => {
//             if (parseInt(answers[q.id]) === q.correct_index) {
//                 strong_topics_raw.push(q.topic_tag);
//                 correctCount++;
//             } else {
//                 weak_topics_raw.push(q.topic_tag);
//             }
//         });

//         const strong_topics = [...new Set(strong_topics_raw)];
//         const weak_topics = [...new Set(weak_topics_raw)];
//         const score = Math.round((correctCount / dbRes.rows.length) * 100);

//         // Save to DB
//         console.log(`💾 Saving Score: ${score}% for User: ${user_id}, Role: ${role_id}`); // DEBUG LOG
        
//         await db.query(
//             `INSERT INTO user_assessment_history (user_id, role_id, weak_topics, strong_topics, score, assessment_type) 
//              VALUES ($1, $2, $3, $4, $5, $6)`,
//             [user_id, role_id, JSON.stringify(weak_topics), JSON.stringify(strong_topics), score, assessment_type || 'General']
//         );

//         // Update User Onboarding
//         await db.query(`UPDATE users SET onboarded = TRUE WHERE id = $1`, [user_id]);

//         res.json({ weak_topics, strong_topics, score });

//     } catch (err) {
//         console.error("❌ Error submitting quiz:", err.message);
//         res.status(500).send('Server Error');
//     }
// });
// // // 3. Get Stats
// // router.get('/stats/:user_id', async (req, res) => {
// //     try {
// //         const { user_id } = req.params;
// //         const { role_id } = req.query;

// //         console.log(`📊 REQUEST RECEIVED: Get Stats for User ${user_id}, Role: ${role_id}`);

// //         let query = `SELECT score, created_at, role_id FROM user_assessment_history WHERE user_id = $1`;
// //         let params = [user_id];

// //         if (role_id && role_id !== 'undefined') {
// //             query += ` AND role_id = $2`;
// //             params.push(role_id);
// //         }

// //         query += ` ORDER BY created_at ASC`;

// //         const result = await db.query(query, params);
// //         console.log(`✅ RETURNING: ${result.rows.length} records.`);
        
// //         res.json(result.rows);
// //     } catch (err) {
// //         console.error("Stats Error:", err);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // 3. Get Stats (Debug Mode: JS Filtering)
// router.get('/stats/:user_id', async (req, res) => {
//     try {
//         const { user_id } = req.params;
//         const { role_id } = req.query;

//         console.log(`------------------------------------------------`);
//         console.log(`📊 DEBUG STATS FETCH`);
//         console.log(`Looking for User: ${user_id}`);
//         console.log(`Looking for Role: '${role_id}' (Length: ${role_id?.length})`);

//         // 1. Fetch ALL history for this user (No SQL Filtering on Role yet)
//         const result = await db.query(
//             `SELECT score, created_at, role_id, assessment_type 
//              FROM user_assessment_history 
//              WHERE user_id = $1 
//              ORDER BY created_at ASC`,
//             [user_id]
//         );

//         console.log(`Found ${result.rows.length} total records for this user.`);

//         // 2. Perform Filtering in JavaScript (to see why it fails)
//         const filteredRows = result.rows.filter(row => {
//             // Normalize both sides (Trim & Lowercase)
//             const dbRole = row.role_id ? row.role_id.trim() : '';
//             const queryRole = role_id ? role_id.trim() : '';
            
//             const isMatch = dbRole === queryRole;
            
//             // Log mismatches to help debug
//             if (!isMatch) {
//                 console.log(`   [Mismatch] DB has '${row.role_id}' (${row.role_id.length}) vs Query '${queryRole}' (${queryRole.length})`);
//             } else {
//                 console.log(`   [MATCH!] Found record with score: ${row.score}`);
//             }

//             return isMatch;
//         });

//         console.log(`Returning ${filteredRows.length} matching records.`);
//         console.log(`------------------------------------------------`);
        
//         res.json(filteredRows);

//     } catch (err) {
//         console.error("Stats Error:", err);
//         res.status(500).send('Server Error');
//     }
// });

// // 4. History Check (Fixed Query)
// router.get('/history-check/:user_id', async (req, res) => {
//     try {
//         const { user_id } = req.params;
        
//         console.log(`🔎 History Check for User: ${user_id}`); // DEBUG LOG

//         const result = await db.query(
//             `SELECT role_id FROM user_assessment_history 
//              WHERE user_id = $1 
//              ORDER BY created_at DESC LIMIT 1`,
//             [user_id]
//         );

//         if (result.rows.length > 0) {
//             console.log(`✅ Last active role: ${result.rows[0].role_id}`);
//             res.json({ hasHistory: true, lastRole: result.rows[0].role_id });
//         } else {
//             console.log("⚠️ No history found.");
//             res.json({ hasHistory: false });
//         }
//     } catch (err) {
//         console.error("History check error:", err);
//         res.status(500).send('Server Error');
//     }
// });

// // DEBUG ROUTE: Dump all history
// router.get('/debug/all-history', async (req, res) => {
//     try {
//         const result = await db.query("SELECT * FROM user_assessment_history");
//         res.json({
//             count: result.rows.length,
//             rows: result.rows
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;

const router = require('express').Router();
const db = require('../config/db');

// =================================================================
// 1. SPECIFIC ROUTES (MUST COME FIRST)
// =================================================================

// DEBUG ROUTE: Dump all history
router.get('/debug/all-history', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM user_assessment_history");
        res.json({
            count: result.rows.length,
            rows: result.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Stats (Debug Mode: JS Filtering)
router.get('/stats/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const { role_id } = req.query;

        console.log(`------------------------------------------------`);
        console.log(`📊 DEBUG STATS FETCH`);
        console.log(`Looking for User: ${user_id}`);
        console.log(`Looking for Role: '${role_id}' (Length: ${role_id?.length})`);

        // 1. Fetch ALL history for this user
        const result = await db.query(
            `SELECT score, created_at, role_id, assessment_type 
             FROM user_assessment_history 
             WHERE user_id = $1 
             ORDER BY created_at ASC`,
            [user_id]
        );

        console.log(`Found ${result.rows.length} total records for this user.`);

        // 2. Perform Filtering in JavaScript
        const filteredRows = result.rows.filter(row => {
            const dbRole = row.role_id ? row.role_id.trim() : '';
            const queryRole = role_id ? role_id.trim() : '';
            
            const isMatch = dbRole === queryRole;
            
            if (!isMatch) {
                console.log(`   [Mismatch] DB has '${row.role_id}' (${row.role_id.length}) vs Query '${queryRole}' (${queryRole.length})`);
            } else {
                console.log(`   [MATCH!] Found record with score: ${row.score}`);
            }

            return isMatch;
        });

        console.log(`Returning ${filteredRows.length} matching records.`);
        console.log(`------------------------------------------------`);
        
        res.json(filteredRows);

    } catch (err) {
        console.error("Stats Error:", err);
        res.status(500).send('Server Error');
    }
});

// History Check
router.get('/history-check/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        
        console.log(`🔎 History Check for User: ${user_id}`);

        const result = await db.query(
            `SELECT role_id FROM user_assessment_history 
             WHERE user_id = $1 
             ORDER BY created_at DESC LIMIT 1`,
            [user_id]
        );

        if (result.rows.length > 0) {
            console.log(`✅ Last active role: ${result.rows[0].role_id}`);
            res.json({ hasHistory: true, lastRole: result.rows[0].role_id });
        } else {
            console.log("⚠️ No history found.");
            res.json({ hasHistory: false });
        }
    } catch (err) {
        console.error("History check error:", err);
        res.status(500).send('Server Error');
    }
});

// Submit Assessment
router.post('/submit-granular', async (req, res) => {
    try {
        console.log("📥 Submitting Quiz:", req.body); 

        const { user_id, role_id, answers, assessment_type } = req.body; 
        
        if (!user_id || !role_id) {
            console.error("❌ Missing User ID or Role ID");
            return res.status(400).json({ msg: "Missing Data" });
        }

        const ids = Object.keys(answers);
        if (ids.length === 0) return res.json({ weak_topics: [], strong_topics: [], score: 0 });

        // Fetch Correct Answers
        const dbRes = await db.query(
            `SELECT id, correct_index, topic_tag FROM question_bank WHERE id = ANY($1::int[])`,
            [ids]
        );

        let weak_topics_raw = [];
        let strong_topics_raw = [];
        let correctCount = 0;

        dbRes.rows.forEach(q => {
            if (parseInt(answers[q.id]) === q.correct_index) {
                strong_topics_raw.push(q.topic_tag);
                correctCount++;
            } else {
                weak_topics_raw.push(q.topic_tag);
            }
        });

        const strong_topics = [...new Set(strong_topics_raw)];
        const weak_topics = [...new Set(weak_topics_raw)];
        const score = Math.round((correctCount / dbRes.rows.length) * 100);

        // Save to DB
        console.log(`💾 Saving Score: ${score}% for User: ${user_id}, Role: ${role_id}`); 
        
        await db.query(
            `INSERT INTO user_assessment_history (user_id, role_id, weak_topics, strong_topics, score, assessment_type) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [user_id, role_id, JSON.stringify(weak_topics), JSON.stringify(strong_topics), score, assessment_type || 'General']
        );

        await db.query(`UPDATE users SET onboarded = TRUE WHERE id = $1`, [user_id]);

        res.json({ weak_topics, strong_topics, score });

    } catch (err) {
        console.error("❌ Error submitting quiz:", err.message);
        res.status(500).send('Server Error');
    }
});

// =================================================================
// 2. GENERIC ROUTES (MUST COME LAST)
// =================================================================

// Get Questions (Generic: captures /anything/anything)
router.get('/:role_id/:experience', async (req, res) => {
    const { role_id, experience } = req.params;
    
    let difficultyDistribution = { Beginner: 5, Intermediate: 3, Advanced: 2 };
    if (experience === 'Beginner') difficultyDistribution = { Beginner: 7, Intermediate: 3, Advanced: 0 };
    if (experience === 'Advanced') difficultyDistribution = { Beginner: 0, Intermediate: 3, Advanced: 7 };

    try {
        let finalQuestions = [];
        for (const [level, count] of Object.entries(difficultyDistribution)) {
            if (count > 0) {
                const q = await db.query(
                    `SELECT id, question_text, options, topic_tag, difficulty 
                     FROM question_bank WHERE role_id = $1 AND difficulty = $2 
                     ORDER BY RANDOM() LIMIT $3`,
                    [role_id, level, count]
                );
                finalQuestions = [...finalQuestions, ...q.rows];
            }
        }
        res.json(finalQuestions);
    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;