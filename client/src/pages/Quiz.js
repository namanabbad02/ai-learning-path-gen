// // import React, { useState, useEffect } from 'react';
// // import { Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, Button, Box, LinearProgress } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios'; // Import direct axios or your api instance

// // const Quiz = () => {
// //     const [questions, setQuestions] = useState([]);
// //     const [currentQ, setCurrentQ] = useState(0);
// //     const [answers, setAnswers] = useState({});
// //     const [loading, setLoading] = useState(true);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         // Fetch questions from your new Node API
// //         axios.get('http://localhost:5000/api/quiz')
// //             .then(res => {
// //                 setQuestions(res.data);
// //                 setLoading(false);
// //             })
// //             .catch(err => console.error(err));
// //     }, []);

// //     const handleOptionChange = (e) => {
// //         setAnswers({ ...answers, [questions[currentQ].id]: e.target.value });
// //     };

// //     const handleNext = () => {
// //         if (currentQ < questions.length - 1) {
// //             setCurrentQ(currentQ + 1);
// //         } else {
// //             handleSubmit();
// //         }
// //     };

// //     const handleSubmit = async () => {
// //         try {
// //             const res = await axios.post('http://localhost:5000/api/quiz/submit', { answers });
// //             const score = res.data.score;
            
// //             // Save score and role to context/localstorage
// //             localStorage.setItem('quiz_score', score);
            
// //             // Redirect to Dashboard to generate path
// //             navigate('/dashboard');
// //         } catch (err) {
// //             console.error("Submission failed", err);
// //         }
// //     };

// //     if (loading) return <LinearProgress />;

// //     const q = questions[currentQ];

// //     return (
// //         <Container maxWidth="sm" sx={{ mt: 8 }}>
// //             <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// //                     <Typography variant="overline" color="text.secondary">Question {currentQ + 1}/{questions.length}</Typography>
// //                     <Typography variant="overline" color="primary" fontWeight="bold">{q.category}</Typography>
// //                 </Box>
                
// //                 <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
// //                     {q.question_text}
// //                 </Typography>

// //                 <RadioGroup value={answers[q.id] || ''} onChange={handleOptionChange}>
// //                     <FormControlLabel value="A" control={<Radio />} label={q.option_a} />
// //                     <FormControlLabel value="B" control={<Radio />} label={q.option_b} />
// //                     <FormControlLabel value="C" control={<Radio />} label={q.option_c} />
// //                     <FormControlLabel value="D" control={<Radio />} label={q.option_d} />
// //                 </RadioGroup>

// //                 <Button 
// //                     variant="contained" 
// //                     fullWidth 
// //                     size="large" 
// //                     sx={{ mt: 4 }} 
// //                     onClick={handleNext}
// //                     disabled={!answers[q.id]}
// //                 >
// //                     {currentQ === questions.length - 1 ? "Submit Assessment" : "Next Question"}
// //                 </Button>
// //             </Paper>
// //         </Container>
// //     );
// // };

// // export default Quiz;

// import React, { useState, useEffect, useContext } from 'react';
// import { 
//     Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, 
//     Button, Box, LinearProgress, Card, CardContent, Alert 
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import { AuthContext } from '../context/AuthContext';

// const Quiz = () => {
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);
    
//     // State Management
//     const [step, setStep] = useState('experience'); // 'experience' or 'test'
//     const [experience, setExperience] = useState('Beginner');
//     const [questions, setQuestions] = useState([]);
//     const [currentQ, setCurrentQ] = useState(0);
//     const [answers, setAnswers] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [resultData, setResultData] = useState(null); // Store score & analysis

//     // Get Role from selection
//     const roleId = localStorage.getItem('selected_role');

//     // 1. Handle Experience Selection & Fetch Questions
//     const startAssessment = async () => {
//         if (!roleId) {
//             setError("No role selected. Redirecting...");
//             setTimeout(() => navigate('/roles'), 2000);
//             return;
//         }

//         setLoading(true);
//         try {
//             // Call the new dynamic endpoint
//             const res = await api.get(`/api/quiz/${roleId}/${experience}`);
            
//             if (res.data.length === 0) {
//                 setError("No questions found for this role/level in the database.");
//             } else {
//                 setQuestions(res.data);
//                 setStep('test'); // Move to quiz view
//             }
//         } catch (err) {
//             console.error("Quiz Fetch Error:", err);
//             setError("Failed to load assessment. Please try again.");
//         }
//         setLoading(false);
//     };

//     // 2. Handle Option Click
//     const handleOptionChange = (e) => {
//         const selectedIndex = e.target.value; // '0', '1', '2', '3'
//         setAnswers({ ...answers, [questions[currentQ].id]: parseInt(selectedIndex) });
//     };

//     // 3. Next Question Logic
//     const handleNext = () => {
//         if (currentQ < questions.length - 1) {
//             setCurrentQ(currentQ + 1);
//         } else {
//             handleSubmit();
//         }
//     };

//     // 4. Submit Assessment
//     // const handleSubmit = async () => {
//     //     setLoading(true);
//     //     try {
//     //         const res = await api.post('/api/quiz/submit-granular', {
//     //             user_id: user?.id,
//     //             role_id: roleId,
//     //             answers: answers
//     //         });

//     //         // Save granular results for the AI Engine
//     //         localStorage.setItem('quiz_score', res.data.score);
//     //         localStorage.setItem('weak_topics', JSON.stringify(res.data.weak_topics));
//     //         localStorage.setItem('strong_topics', JSON.stringify(res.data.strong_topics));
            
//     //         // Go to Dashboard
//     //         navigate('/dashboard');
//     //     } catch (err) {
//     //         console.error("Submission failed", err);
//     //         setError("Failed to submit results.");
//     //     }
//     //     setLoading(false);
//     // };
//     // UPDATED Submit
//     const handleSubmit = async () => {
//         setLoading(true);
//         try {
//             const res = await api.post('/api/quiz/submit-granular', {
//                 user_id: user?.id,
//                 role_id: roleId,
//                 answers: answers,
//                 assessment_type: localStorage.getItem('onboarded') ? 'Retake' : 'Initial'
//             });

//             // Save for AI
//             localStorage.setItem('quiz_score', res.data.score);
//             localStorage.setItem('weak_topics', JSON.stringify(res.data.weak_topics));
//             localStorage.setItem('strong_topics', JSON.stringify(res.data.strong_topics));

//             // Update local user context if this was initial
//             if (!user.onboarded) {
//                 user.onboarded = true;
//                 localStorage.setItem('user', JSON.stringify(user));
//             }

//             setResultData(res.data);
//             setStep('result'); // SHOW RESULT SCREEN
//         } catch (err) {
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     const handleGeneratePath = () => {
//         navigate('/dashboard');
//     };

//     // --- RENDER: Loading / Error ---
//     if (loading) return (
//         <Container sx={{ mt: 10, textAlign: 'center' }}>
//             <LinearProgress />
//             <Typography sx={{ mt: 2 }}>Loading Assessment...</Typography>
//         </Container>
//     );

//     if (error) return (
//         <Container sx={{ mt: 10 }}>
//             <Alert severity="error">{error}</Alert>
//             <Button onClick={() => navigate('/roles')} sx={{ mt: 2 }}>Back to Roles</Button>
//         </Container>
//     );

//     // --- RENDER: Step 1 - Experience Selection ---
//     if (step === 'experience') {
//         return (
//             <Container maxWidth="sm" sx={{ mt: 10 }}>
//                 <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
//                     <Typography variant="h4" fontWeight="bold" gutterBottom>
//                         Before we start...
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary" paragraph>
//                         How familiar are you with this role? This helps our AI tailor the questions to your level.
//                     </Typography>

//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
//                         {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
//                             <Card 
//                                 key={level}
//                                 onClick={() => setExperience(level)}
//                                 sx={{ 
//                                     cursor: 'pointer', 
//                                     border: experience === level ? '2px solid #6366f1' : '1px solid #e0e0e0',
//                                     bgcolor: experience === level ? '#eff6ff' : 'white',
//                                     transition: '0.2s'
//                                 }}
//                             >
//                                 <CardContent>
//                                     <Typography variant="h6" fontWeight="bold">{level}</Typography>
//                                 </CardContent>
//                             </Card>
//                         ))}
//                     </Box>

//                     <Button 
//                         variant="contained" 
//                         size="large" 
//                         fullWidth 
//                         sx={{ mt: 4, py: 1.5, fontSize: '1.1rem' }}
//                         onClick={startAssessment}
//                     >
//                         Start Assessment
//                     </Button>
//                 </Paper>
//             </Container>
//         );
//     }

//     // --- RENDER: Step 2 - The Quiz ---
//     const q = questions[currentQ];

//     return (
//         <Container maxWidth="sm" sx={{ mt: 8 }}>
//             <Box sx={{ mb: 2 }}>
//                 <LinearProgress variant="determinate" value={((currentQ + 1) / questions.length) * 100} sx={{ height: 10, borderRadius: 5 }} />
//                 <Typography align="right" variant="caption" color="text.secondary">
//                     Question {currentQ + 1} of {questions.length}
//                 </Typography>
//             </Box>

//             <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
//                 <Box sx={{ mb: 2 }}>
//                     <Typography variant="overline" color="primary" fontWeight="bold">
//                         {q.difficulty} • {q.topic_tag}
//                     </Typography>
//                 </Box>
                
//                 <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
//                     {q.question_text}
//                 </Typography>

//                 <RadioGroup value={answers[q.id] !== undefined ? answers[q.id] : ''} onChange={handleOptionChange}>
//                     {q.options.map((opt, index) => (
//                         <FormControlLabel 
//                             key={index} 
//                             value={index} 
//                             control={<Radio />} 
//                             label={opt} 
//                             sx={{ 
//                                 mb: 1, 
//                                 p: 1, 
//                                 borderRadius: 2, 
//                                 border: answers[q.id] === index ? '1px solid #6366f1' : '1px solid transparent',
//                                 bgcolor: answers[q.id] === index ? '#eff6ff' : 'transparent'
//                             }} 
//                         />
//                     ))}
//                 </RadioGroup>

//                 <Button 
//                     variant="contained" 
//                     fullWidth 
//                     size="large" 
//                     sx={{ mt: 4 }} 
//                     onClick={handleNext}
//                     disabled={answers[q.id] === undefined}
//                 >
//                     {currentQ === questions.length - 1 ? "Submit Assessment" : "Next Question"}
//                 </Button>
//             </Paper>
//         </Container>
//     );
    
//     if (step === 'result') {
//         return (
//             <Container maxWidth="md" sx={{ mt: 8 }}>
//                 <Paper elevation={3} sx={{ p: 5, borderRadius: 4, textAlign: 'center' }}>
//                     <Typography variant="h4" fontWeight="bold" gutterBottom>
//                         Assessment Complete! 🎉
//                     </Typography>
                    
//                     <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3, mt: 2 }}>
//                         <CircularProgress variant="determinate" value={resultData.score} size={120} thickness={5} color={resultData.score > 70 ? "success" : "warning"} />
//                         <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                             <Typography variant="h4" component="div" color="text.secondary">
//                                 {resultData.score}%
//                             </Typography>
//                         </Box>
//                     </Box>

//                     <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
//                         {resultData.analysis_text}
//                     </Alert>

//                     <Grid container spacing={3} sx={{ textAlign: 'left', mb: 4 }}>
//                         <Grid item xs={12} md={6}>
//                             <Card sx={{ bgcolor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
//                                 <CardContent>
//                                     <Typography variant="h6" color="success.main" fontWeight="bold">✅ Strong Topics</Typography>
//                                     {resultData.strong_topics.length > 0 ? (
//                                         resultData.strong_topics.map(t => <Chip key={t} label={t} size="small" color="success" sx={{ m: 0.5 }} />)
//                                     ) : <Typography variant="body2">None yet.</Typography>}
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                             <Card sx={{ bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
//                                 <CardContent>
//                                     <Typography variant="h6" color="error.main" fontWeight="bold">⚠️ Focus Areas</Typography>
//                                     {resultData.weak_topics.length > 0 ? (
//                                         resultData.weak_topics.map(t => <Chip key={t} label={t} size="small" color="error" sx={{ m: 0.5 }} />)
//                                     ) : <Typography variant="body2">None! Great job.</Typography>}
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     </Grid>

//                     <Button 
//                         variant="contained" 
//                         size="large" 
//                         fullWidth 
//                         onClick={handleGeneratePath}
//                         sx={{ py: 1.5, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
//                     >
//                         Generate Personalized Roadmap
//                     </Button>
//                 </Paper>
//             </Container>
//         );
//     }

// };

// export default Quiz;
import React, { useState, useContext } from 'react';
import { 
    Container, Paper, Typography, Radio, RadioGroup, FormControlLabel, 
    Button, Box, LinearProgress, Card, CardContent, Alert, 
    CircularProgress, Grid, Chip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Quiz = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    // State Management
    const [step, setStep] = useState('experience'); // 'experience', 'test', 'result'
    const [experience, setExperience] = useState('Beginner');
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultData, setResultData] = useState(null); // Store score & analysis

    // Get Role from selection
    const roleId = localStorage.getItem('selected_role');

    // 1. Handle Experience Selection & Fetch Questions
    const startAssessment = async () => {
        if (!roleId) {
            setError("No role selected. Redirecting...");
            setTimeout(() => navigate('/roles'), 2000);
            return;
        }

        setLoading(true);
        try {
            const res = await api.get(`/api/quiz/${roleId}/${experience}`);
            
            if (res.data.length === 0) {
                setError("No questions found for this role/level in the database.");
            } else {
                setQuestions(res.data);
                setStep('test'); // Move to quiz view
            }
        } catch (err) {
            console.error("Quiz Fetch Error:", err);
            setError("Failed to load assessment. Please try again.");
        }
        setLoading(false);
    };

    // 2. Handle Option Click
    const handleOptionChange = (e) => {
        const selectedIndex = e.target.value;
        setAnswers({ ...answers, [questions[currentQ].id]: parseInt(selectedIndex) });
    };

    // 3. Next Question Logic
    const handleNext = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            handleSubmit();
        }
    };

    // 4. Submit Assessment
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await api.post('/api/quiz/submit-granular', {
                user_id: user?.id,
                role_id: roleId,
                answers: answers,
                assessment_type: user?.onboarded ? 'Retake' : 'Initial'
            });

            // Save results for the AI Engine
            localStorage.setItem('quiz_score', res.data.score);
            localStorage.setItem('weak_topics', JSON.stringify(res.data.weak_topics));
            localStorage.setItem('strong_topics', JSON.stringify(res.data.strong_topics));
            
            // Update local user context if this was initial
            if (user && !user.onboarded) {
                user.onboarded = true;
                localStorage.setItem('user', JSON.stringify(user));
            }

            setResultData(res.data);
            setStep('result'); // SHOW RESULT SCREEN
        } catch (err) {
            console.error("Submission failed", err);
            setError("Failed to submit results.");
        }
        setLoading(false);
    };

    const handleGeneratePath = () => {
        // Pass a state object indicating a refresh is needed to fix Trend Chart
        navigate('/dashboard', { state: { refresh: true, timestamp: Date.now() } });
    };

    // --- RENDER: Loading / Error ---
    if (loading) return (
        <Container sx={{ mt: 10, textAlign: 'center' }}>
            <LinearProgress />
            <Typography sx={{ mt: 2 }}>Processing...</Typography>
        </Container>
    );

    if (error) return (
        <Container sx={{ mt: 10 }}>
            <Alert severity="error">{error}</Alert>
            <Button onClick={() => navigate('/roles')} sx={{ mt: 2 }}>Back to Roles</Button>
        </Container>
    );

    // --- RENDER: Step 1 - Experience Selection ---
    if (step === 'experience') {
        return (
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Before we start...
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        How familiar are you with this role? This helps our AI tailor the questions to your level.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                            <Card 
                                key={level}
                                onClick={() => setExperience(level)}
                                sx={{ 
                                    cursor: 'pointer', 
                                    border: experience === level ? '2px solid #6366f1' : '1px solid #e0e0e0',
                                    bgcolor: experience === level ? '#eff6ff' : 'white',
                                    transition: '0.2s'
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">{level}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Button 
                        variant="contained" 
                        size="large" 
                        fullWidth 
                        sx={{ mt: 4, py: 1.5, fontSize: '1.1rem' }}
                        onClick={startAssessment}
                    >
                        Start Assessment
                    </Button>
                </Paper>
            </Container>
        );
    }

    // --- RENDER: Step 3 - Result Summary ---
    if (step === 'result' && resultData) {
        return (
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 5, borderRadius: 4, textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Assessment Complete! 🎉
                    </Typography>
                    
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3, mt: 2 }}>
                        <CircularProgress variant="determinate" value={resultData.score} size={120} thickness={5} color={resultData.score > 70 ? "success" : "warning"} />
                        <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h4" component="div" color="text.secondary">
                                {resultData.score}%
                            </Typography>
                        </Box>
                    </Box>

                    <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                        {resultData.analysis_text}
                    </Alert>

                    <Grid container spacing={3} sx={{ textAlign: 'left', mb: 4 }}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ bgcolor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                                <CardContent>
                                    <Typography variant="h6" color="success.main" fontWeight="bold">✅ Strong Topics</Typography>
                                    {resultData.strong_topics.length > 0 ? (
                                        // FIX: Added index 'i' to key to prevent React Duplicate Key Error
                                        resultData.strong_topics.map((t, i) => (
                                            <Chip key={i} label={t} size="small" color="success" sx={{ m: 0.5 }} />
                                        ))
                                    ) : <Typography variant="body2">None yet.</Typography>}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ bgcolor: '#fef2f2', border: '1px solid #fecaca' }}>
                                <CardContent>
                                    <Typography variant="h6" color="error.main" fontWeight="bold">⚠️ Focus Areas</Typography>
                                    {resultData.weak_topics.length > 0 ? (
                                        // FIX: Added index 'i' to key to prevent React Duplicate Key Error
                                        resultData.weak_topics.map((t, i) => (
                                            <Chip key={i} label={t} size="small" color="error" sx={{ m: 0.5 }} />
                                        ))
                                    ) : <Typography variant="body2">None! Great job.</Typography>}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Button 
                        variant="contained" 
                        size="large" 
                        fullWidth 
                        onClick={handleGeneratePath}
                        sx={{ py: 1.5, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                    >
                        Generate Personalized Roadmap
                    </Button>
                </Paper>
            </Container>
        );
    }

    // --- RENDER: Step 2 - The Quiz ---
    const q = questions[currentQ];

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box sx={{ mb: 2 }}>
                <LinearProgress variant="determinate" value={((currentQ + 1) / questions.length) * 100} sx={{ height: 10, borderRadius: 5 }} />
                <Typography align="right" variant="caption" color="text.secondary">
                    Question {currentQ + 1} of {questions.length}
                </Typography>
            </Box>

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="overline" color="primary" fontWeight="bold">
                        {q.difficulty} • {q.topic_tag}
                    </Typography>
                </Box>
                
                <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
                    {q.question_text}
                </Typography>

                <RadioGroup value={answers[q.id] !== undefined ? answers[q.id] : ''} onChange={handleOptionChange}>
                    {q.options.map((opt, index) => (
                        <FormControlLabel 
                            key={index} 
                            value={index} 
                            control={<Radio />} 
                            label={opt} 
                            sx={{ 
                                mb: 1, 
                                p: 1, 
                                borderRadius: 2, 
                                border: answers[q.id] === index ? '1px solid #6366f1' : '1px solid transparent',
                                bgcolor: answers[q.id] === index ? '#eff6ff' : 'transparent'
                            }} 
                        />
                    ))}
                </RadioGroup>

                <Button 
                    variant="contained" 
                    fullWidth 
                    size="large" 
                    sx={{ mt: 4 }} 
                    onClick={handleNext}
                    disabled={answers[q.id] === undefined}
                >
                    {currentQ === questions.length - 1 ? "Submit Assessment" : "Next Question"}
                </Button>
            </Paper>
        </Container>
    );
};

export default Quiz;