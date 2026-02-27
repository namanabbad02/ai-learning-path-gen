// // // // import React, { useState, useContext } from 'react';
// // // // import { 
// // // //     Container, Typography, Box, Button, Card, CardContent, 
// // // //     Stepper, Step, StepLabel, StepContent, Chip, 
// // // //     LinearProgress, Grid, MenuItem, TextField 
// // // // } from '@mui/material';
// // // // import { AuthContext } from '../context/AuthContext';
// // // // import { generatePath } from '../services/api';
// // // // import SchoolIcon from '@mui/icons-material/School';
// // // // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // // // import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// // // // const Dashboard = () => {
// // // //     const { user } = useContext(AuthContext);
// // // //     const [targetRole, setTargetRole] = useState(localStorage.getItem('selected_role') || 'role_fullstack');
// // // //     const [roadmap, setRoadmap] = useState(null);
// // // //     const [loading, setLoading] = useState(false);

// // // //     // const handleGenerate = async () => {
// // // //     //     setLoading(true);
// // // //     //     try {
// // // //     //         const res = await generatePath({ target_role: targetRole });
// // // //     //         setRoadmap(res.data);
// // // //     //     } catch (err) {
// // // //     //         console.error("Error generating path", err);
// // // //     //         alert("AI Engine is offline or busy. Please try again.");
// // // //     //     }
// // // //     //     setLoading(false);
// // // //     // };
// // // //     const handleGenerate = async () => {
// // // //         setLoading(true);
// // // //         const score = localStorage.getItem('quiz_score') || 0; // Get the score
        
// // // //         try {
// // // //             const res = await generatePath({ 
// // // //                 target_role: targetRole, 
// // // //                 quiz_score: parseInt(score) // Send to AI
// // // //             });
// // // //             setRoadmap(res.data);
// // // //         } catch (err) {
// // // //             // Error handling
// // // //         }
// // // //         setLoading(false);
// // // //     };

// // // //     return (
// // // //         <Container maxWidth="md">
// // // //             {/* Header Section */}
// // // //             <Box sx={{ mt: 4, mb: 6, textAlign: 'center' }}>
// // // //                 <Typography variant="h3" fontWeight="800" color="primary" gutterBottom>
// // // //                     Hello, {user?.username} 👋
// // // //                 </Typography>
// // // //                 <Typography variant="h6" color="text.secondary">
// // // //                     Ready to shape your future? Let our AI design your perfect path.
// // // //                 </Typography>
// // // //             </Box>

// // // //             {/* Controls Section */}
// // // //             <Card sx={{ mb: 4, p: 2, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white' }}>
// // // //                 <CardContent>
// // // //                     <Grid container spacing={2} alignItems="center">
// // // //                         <Grid item xs={12} md={8}>
// // // //                             <Typography variant="h6" gutterBottom>Target Career Role</Typography>
// // // //                             <TextField
// // // //                                 select
// // // //                                 fullWidth
// // // //                                 value={targetRole}
// // // //                                 onChange={(e) => setTargetRole(e.target.value)}
// // // //                                 sx={{ 
// // // //                                     bgcolor: 'white', 
// // // //                                     borderRadius: 2,
// // // //                                     '& fieldset': { border: 'none' } 
// // // //                                 }}
// // // //                             >
// // // //                                 <MenuItem value="role_data_scientist">Data Scientist</MenuItem>
// // // //                                 <MenuItem value="role_fullstack_dev">Full Stack Developer</MenuItem>
// // // //                             </TextField>
// // // //                         </Grid>
// // // //                         <Grid item xs={12} md={4}>
// // // //                             <Button 
// // // //                                 variant="contained" 
// // // //                                 color="secondary" 
// // // //                                 fullWidth 
// // // //                                 size="large"
// // // //                                 onClick={handleGenerate}
// // // //                                 disabled={loading}
// // // //                                 startIcon={loading ? null : <SchoolIcon />}
// // // //                                 sx={{ height: '56px', mt: 3.5, bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f3f4f6' } }}
// // // //                             >
// // // //                                 {loading ? 'AI is Thinking...' : 'Generate Roadmap'}
// // // //                             </Button>
// // // //                         </Grid>
// // // //                     </Grid>
// // // //                 </CardContent>
// // // //             </Card>

// // // //             {/* Loading State */}
// // // //             {loading && <LinearProgress sx={{ mb: 4, borderRadius: 5, height: 10 }} />}

// // // //             {/* Roadmap Section */}
// // // //             {roadmap && (
// // // //                 <Box sx={{ animation: 'fadeIn 1s ease-in' }}>
// // // //                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// // // //                         <Typography variant="h5" fontWeight="bold">
// // // //                             Your Personalized Path to {roadmap.role_title}
// // // //                         </Typography>
// // // //                         <Chip icon={<AccessTimeIcon />} label={`Est. Time: ${roadmap.estimated_duration}`} color="primary" variant="outlined" />
// // // //                     </Box>

// // // //                     <Stepper orientation="vertical">
// // // //                         {roadmap.path.map((step, index) => (
// // // //                             <Step key={index} active={true}>
// // // //                                 <StepLabel 
// // // //                                     StepIconProps={{
// // // //                                         sx: { color: index === 0 ? 'secondary.main' : 'primary.main', fontSize: 30 }
// // // //                                     }}
// // // //                                 >
// // // //                                     <Typography variant="h6" fontWeight="bold">{step.skill_name}</Typography>
// // // //                                 </StepLabel>
// // // //                                 <StepContent>
// // // //                                     <Box sx={{ mb: 2, mt: 1 }}>
// // // //                                         <Typography variant="body2" color="text.secondary" gutterBottom>
// // // //                                             Why: {step.reason}
// // // //                                         </Typography>
                                        
// // // //                                         {/* Resources Cards */}
// // // //                                         <Grid container spacing={2} sx={{ mt: 1 }}>
// // // //                                             {step.resources.map((res, i) => (
// // // //                                                 <Grid item xs={12} sm={6} key={i}>
// // // //                                                     <Card variant="outlined" sx={{ '&:hover': { borderColor: 'primary.main', bgcolor: '#f9fafb' }, transition: '0.3s' }}>
// // // //                                                         <CardContent sx={{ display: 'flex', alignItems: 'center', pb: '16px !important' }}>
// // // //                                                             <PlayCircleOutlineIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
// // // //                                                             <Box>
// // // //                                                                 <Typography variant="subtitle2" fontWeight="bold">
// // // //                                                                     <a href={res.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
// // // //                                                                         {res.title}
// // // //                                                                     </a>
// // // //                                                                 </Typography>
// // // //                                                                 <Typography variant="caption" color="text.secondary">
// // // //                                                                     {res.type} • {res.duration}
// // // //                                                                 </Typography>
// // // //                                                             </Box>
// // // //                                                         </CardContent>
// // // //                                                     </Card>
// // // //                                                 </Grid>
// // // //                                             ))}
// // // //                                         </Grid>
// // // //                                     </Box>
// // // //                                 </StepContent>
// // // //                             </Step>
// // // //                         ))}
// // // //                     </Stepper>
                    
// // // //                     <Box sx={{ textAlign: 'center', mt: 5, p: 3, bgcolor: '#f0fdf4', borderRadius: 4, color: '#15803d' }}>
// // // //                         <Typography variant="h6">🎉 Path Completed?</Typography>
// // // //                         <Typography variant="body2">Come back to take a skill assessment and unlock the next level!</Typography>
// // // //                     </Box>
// // // //                 </Box>
// // // //             )}
// // // //         </Container>
// // // //     );
// // // // };

// // // // export default Dashboard;

// // // import React, { useState, useEffect, useContext } from 'react';
// // // import { 
// // //     Container, Typography, Box, Button, Card, CardContent, 
// // //     Stepper, Step, StepLabel, StepContent, Chip, 
// // //     LinearProgress, Grid, MenuItem, TextField, Alert 
// // // } from '@mui/material';
// // // import { AuthContext } from '../context/AuthContext';
// // // import api, { generatePath } from '../services/api'; // Import api instance
// // // import SchoolIcon from '@mui/icons-material/School';
// // // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // // import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

// // // const Dashboard = () => {
// // //     const { user } = useContext(AuthContext);
    
// // //     // State for Roles List (Dropdown)
// // //     const [availableRoles, setAvailableRoles] = useState([]);
    
// // //     // State for Selected Role (Default to what they picked in Explorer, or User's goal)
// // //     const [targetRole, setTargetRole] = useState(
// // //         localStorage.getItem('selected_role') || 'role_fullstack'
// // //     );

// // //     const [roadmap, setRoadmap] = useState(null);
// // //     const [loading, setLoading] = useState(false);
// // //     const [aiNote, setAiNote] = useState("");

// // //     // 1. Fetch all available roles for the dropdown
// // //     useEffect(() => {
// // //         const fetchRoles = async () => {
// // //             try {
// // //                 const res = await api.get('/api/career/roles');
// // //                 setAvailableRoles(res.data);
// // //             } catch (err) {
// // //                 console.error("Failed to load roles list", err);
// // //             }
// // //         };
// // //         fetchRoles();
// // //     }, []);

// // //     const handleGenerate = async () => {
// // //         setLoading(true);
// // //         setRoadmap(null); // Reset previous result
// // //         const score = localStorage.getItem('quiz_score') || 0; 

// // //         try {
// // //             const res = await generatePath({ 
// // //                 target_role: targetRole,
// // //                 quiz_score: parseInt(score)
// // //             });
// // //             setRoadmap(res.data);
// // //             setAiNote(res.data.note); // Capture the AI feedback note
// // //         } catch (err) {
// // //             console.error("Error generating path", err);
// // //             alert("AI Engine is offline or busy. Please try again.");
// // //         }
// // //         setLoading(false);
// // //     };

// // //     return (
// // //         <Container maxWidth="md">
// // //             {/* Header Section */}
// // //             <Box sx={{ mt: 4, mb: 6, textAlign: 'center' }}>
// // //                 <Typography variant="h3" fontWeight="800" color="primary" gutterBottom>
// // //                     Hello, {user?.username} 👋
// // //                 </Typography>
// // //                 <Typography variant="h6" color="text.secondary">
// // //                     Ready to shape your future? Let our AI design your perfect path.
// // //                 </Typography>
// // //             </Box>

// // //             {/* Controls Section */}
// // //             <Card sx={{ mb: 4, p: 2, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white' }}>
// // //                 <CardContent>
// // //                     <Grid container spacing={2} alignItems="center">
// // //                         <Grid item xs={12} md={8}>
// // //                             <Typography variant="h6" gutterBottom>Target Career Role</Typography>
// // //                             <TextField
// // //                                 select
// // //                                 fullWidth
// // //                                 value={targetRole}
// // //                                 onChange={(e) => setTargetRole(e.target.value)}
// // //                                 sx={{ 
// // //                                     bgcolor: 'white', 
// // //                                     borderRadius: 2,
// // //                                     '& fieldset': { border: 'none' } 
// // //                                 }}
// // //                             >
// // //                                 {/* Dynamic Dropdown Items */}
// // //                                 {availableRoles.length > 0 ? (
// // //                                     availableRoles.map((role) => (
// // //                                         <MenuItem key={role.id} value={role.id}>
// // //                                             {role.title}
// // //                                         </MenuItem>
// // //                                     ))
// // //                                 ) : (
// // //                                     <MenuItem value={targetRole}>Loading Roles...</MenuItem>
// // //                                 )}
// // //                             </TextField>
// // //                         </Grid>
// // //                         <Grid item xs={12} md={4}>
// // //                             <Button 
// // //                                 variant="contained" 
// // //                                 color="secondary" 
// // //                                 fullWidth 
// // //                                 size="large"
// // //                                 onClick={handleGenerate}
// // //                                 disabled={loading}
// // //                                 startIcon={loading ? null : <SchoolIcon />}
// // //                                 sx={{ height: '56px', mt: 3.5, bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f3f4f6' } }}
// // //                             >
// // //                                 {loading ? 'AI is Thinking...' : 'Generate Roadmap'}
// // //                             </Button>
// // //                         </Grid>
// // //                     </Grid>
// // //                 </CardContent>
// // //             </Card>

// // //             {/* Loading State */}
// // //             {loading && <LinearProgress sx={{ mb: 4, borderRadius: 5, height: 10 }} />}

// // //             {/* AI Note (Based on Quiz Score) */}
// // //             {aiNote && !loading && (
// // //                  <Alert severity="info" sx={{ mb: 3, borderRadius: 3 }}>
// // //                     <strong>AI Analysis:</strong> {aiNote}
// // //                  </Alert>
// // //             )}

// // //             {/* Roadmap Section */}
// // //             {roadmap && (
// // //                 <Box sx={{ animation: 'fadeIn 1s ease-in' }}>
// // //                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// // //                         <Typography variant="h5" fontWeight="bold">
// // //                             Your Personalized Path to {roadmap.role_title}
// // //                         </Typography>
// // //                         <Chip icon={<AccessTimeIcon />} label={`Est. Time: ${roadmap.estimated_duration}`} color="primary" variant="outlined" />
// // //                     </Box>

// // //                     <Stepper orientation="vertical">
// // //                         {roadmap.path.map((step, index) => (
// // //                             <Step key={index} active={true}>
// // //                                 <StepLabel 
// // //                                     StepIconProps={{
// // //                                         sx: { color: index === 0 ? 'secondary.main' : 'primary.main', fontSize: 30 }
// // //                                     }}
// // //                                 >
// // //                                     <Typography variant="h6" fontWeight="bold">{step.skill_name}</Typography>
// // //                                 </StepLabel>
// // //                                 <StepContent>
// // //                                     <Box sx={{ mb: 2, mt: 1 }}>
// // //                                         <Typography variant="body2" color="text.secondary" gutterBottom>
// // //                                             Why: {step.reason}
// // //                                         </Typography>
                                        
// // //                                         <Grid container spacing={2} sx={{ mt: 1 }}>
// // //                                             {step.resources.map((res, i) => (
// // //                                                 <Grid item xs={12} sm={6} key={i}>
// // //                                                     <Card variant="outlined" sx={{ '&:hover': { borderColor: 'primary.main', bgcolor: '#f9fafb' }, transition: '0.3s' }}>
// // //                                                         <CardContent sx={{ display: 'flex', alignItems: 'center', pb: '16px !important' }}>
// // //                                                             <PlayCircleOutlineIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
// // //                                                             <Box>
// // //                                                                 <Typography variant="subtitle2" fontWeight="bold">
// // //                                                                     <a href={res.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
// // //                                                                         {res.title}
// // //                                                                     </a>
// // //                                                                 </Typography>
// // //                                                                 <Typography variant="caption" color="text.secondary">
// // //                                                                     {res.type} • {res.duration}
// // //                                                                 </Typography>
// // //                                                             </Box>
// // //                                                         </CardContent>
// // //                                                     </Card>
// // //                                                 </Grid>
// // //                                             ))}
// // //                                         </Grid>
// // //                                     </Box>
// // //                                 </StepContent>
// // //                             </Step>
// // //                         ))}
// // //                     </Stepper>
// // //                 </Box>
// // //             )}
// // //         </Container>
// // //     );
// // // };

// // // export default Dashboard;

// // // import React, { useState, useEffect, useContext } from 'react';
// // // import { 
// // //     Container, Typography, Box, Button, Grid, Card, CardContent, Divider,
// // //     Stepper, Step, StepLabel, StepContent, Chip, LinearProgress, Alert
// // // } from '@mui/material';
// // // import { useNavigate } from 'react-router-dom';
// // // import { AuthContext } from '../context/AuthContext';
// // // import api, { generatePath } from '../services/api';
// // // import SchoolIcon from '@mui/icons-material/School';
// // // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // // import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// // // import LockIcon from '@mui/icons-material/Lock';
// // // import { Line } from 'react-chartjs-2';
// // // import { 
// // //     Chart as ChartJS, CategoryScale, LinearScale, PointElement, 
// // //     LineElement, Title, Tooltip, Legend 
// // // } from 'chart.js';
// // // import { useLocation } from 'react-router-dom'; // Add import
// // // // Register ChartJS
// // // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// // // const Dashboard = () => {
// // //     const { user } = useContext(AuthContext);
// // //     const navigate = useNavigate();
    
// // //     // Read Role directly from storage (User can't change this here)
// // //     const [targetRole] = useState(localStorage.getItem('selected_role') || 'role_fullstack');
// // //     const [roleTitle, setRoleTitle] = useState('Loading...'); // To show nice name instead of ID
// // //     const location = useLocation(); // Hook to read navigation state
// // //     const [stats, setStats] = useState([]);
// // //     const [roadmap, setRoadmap] = useState(null);
// // //     const [loading, setLoading] = useState(false);
// // //     const [aiNote, setAiNote] = useState("");

// // //     // 1. Fetch Role Title & Stats
// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             if (!user?.id) return;

// // //             try {
// // //                 // A. Get Role Name (Optional, for display)
// // //                 const rolesRes = await api.get('/api/career/roles');
// // //                 const currentRole = rolesRes.data.find(r => r.id === targetRole);
// // //                 if (currentRole) setRoleTitle(currentRole.title);

// // //                 // B. Get Stats for THIS Role
// // //                 const statsRes = await api.get(`/api/quiz/stats/${user.id}?role_id=${targetRole}&t=${Date.now()}`);
// // //                 setStats(statsRes.data);

// // //             } catch (err) {
// // //                 console.error("Dashboard Data Error", err);
// // //             }
// // //         };
// // //         fetchData();
// // //     }, [user, targetRole, location.state]); 

// // //     // 2. Generate Path
// // //     const handleGenerate = async () => {
// // //         setLoading(true);
// // //         const score = localStorage.getItem('quiz_score') || 0; 

// // //         try {
// // //             const res = await generatePath({ 
// // //                 target_role: targetRole,
// // //                 quiz_score: parseInt(score),
// // //                 // Pass topics to backend for personalization
// // //                 strong_topics: JSON.parse(localStorage.getItem('strong_topics') || "[]"),
// // //                 weak_topics: JSON.parse(localStorage.getItem('weak_topics') || "[]")
// // //             });
// // //             setRoadmap(res.data);
// // //             setAiNote(res.data.note);
// // //         } catch (err) {
// // //             alert("AI Engine Error. Please ensure Python server is running.");
// // //         }
// // //         setLoading(false);
// // //     };

// // //     const handleRetakeAssessment = () => {
// // //         navigate('/quiz'); 
// // //     };

// // //     const handleSwitchRole = () => {
// // //         navigate('/roles'); 
// // //     };

// // //     // Chart Configuration
// // //     const chartData = {
// // //         labels: stats.map((_, i) => `Attempt ${i + 1}`),
// // //         datasets: [
// // //             {
// // //                 label: 'Score History (%)',
// // //                 data: stats.map(s => s.score),
// // //                 borderColor: '#6366f1',
// // //                 backgroundColor: 'rgba(99, 102, 241, 0.2)',
// // //                 pointBackgroundColor: '#fff',
// // //                 pointBorderColor: '#6366f1',
// // //                 tension: 0.4,
// // //                 fill: true
// // //             },
// // //         ],
// // //     };

// // //     const chartOptions = {
// // //         responsive: true,
// // //         maintainAspectRatio: false,
// // //         scales: {
// // //             y: { beginAtZero: true, max: 100 }
// // //         }
// // //     };

// // //     return (
// // //         <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
// // //             <Box sx={{ mt: 4, mb: 6, textAlign: 'center' }}>
// // //                 <Typography variant="h3" fontWeight="800" color="primary" gutterBottom>
// // //                     Hello, {user?.username} 👋
// // //                 </Typography>
// // //                 <Typography variant="h6" color="text.secondary">
// // //                     Tracking your growth as a <strong>{roleTitle}</strong>
// // //                 </Typography>
// // //             </Box>

// // //             <Grid container spacing={4} sx={{ mb: 4 }}>
// // //                 {/* Left: Controls */}
// // //                 <Grid item xs={12} md={7}>
// // //                     <Card sx={{ p: 3, borderRadius: 4, background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)' }}>
// // //                         <Typography variant="h6" gutterBottom fontWeight="bold">Career Path Controls</Typography>
                        
// // //                         <Box sx={{ mt: 2, mb: 3, p: 2, bgcolor: 'white', borderRadius: 2, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// // //                             <Box>
// // //                                 <Typography variant="caption" color="text.secondary">Target Role</Typography>
// // //                                 <Typography variant="h6" fontWeight="bold" color="primary">{roleTitle}</Typography>
// // //                             </Box>
// // //                             <LockIcon color="action" fontSize="small" />
// // //                         </Box>

// // //                         <Button 
// // //                             variant="contained" 
// // //                             fullWidth 
// // //                             size="large"
// // //                             onClick={handleGenerate}
// // //                             disabled={loading}
// // //                             startIcon={loading ? null : <SchoolIcon />}
// // //                             sx={{ height: '56px', mb: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
// // //                         >
// // //                             {loading ? 'AI is Personalizing Path...' : 'Generate My Path'}
// // //                         </Button>

// // //                         <Divider sx={{ my: 2 }} />

// // //                         <Grid container spacing={2}>
// // //                             <Grid item xs={6}>
// // //                                 <Button variant="outlined" fullWidth onClick={handleRetakeAssessment}>
// // //                                     Retake Assessment
// // //                                 </Button>
// // //                             </Grid>
// // //                             <Grid item xs={6}>
// // //                                 <Button variant="text" fullWidth onClick={handleSwitchRole}>
// // //                                     Switch Career Track
// // //                                 </Button>
// // //                             </Grid>
// // //                         </Grid>
// // //                     </Card>
// // //                 </Grid>

// // //                 {/* Right: Analytics Panel */}
// // //                 <Grid item xs={12} md={5}>
// // //                     <Card sx={{ height: '100%', borderRadius: 4 }}>
// // //                         <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
// // //                             <Typography variant="h6" fontWeight="bold" gutterBottom color="secondary.main">
// // //                                 Performance Trend
// // //                             </Typography>
// // //                             <Box sx={{ flexGrow: 1, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // //                                 {stats.length > 0 ? (
// // //                                     <Box sx={{ width: '100%', height: '100%' }}>
// // //                                         <Line options={chartOptions} data={chartData} />
// // //                                     </Box>
// // //                                 ) : (
// // //                                     <Box sx={{ textAlign: 'center' }}>
// // //                                         <Typography variant="body2" color="text.secondary" gutterBottom>
// // //                                             No history for this role yet.
// // //                                         </Typography>
// // //                                         <Button size="small" onClick={handleRetakeAssessment}>Take First Test</Button>
// // //                                     </Box>
// // //                                 )}
// // //                             </Box>
// // //                         </CardContent>
// // //                     </Card>
// // //                 </Grid>
// // //             </Grid>
            
// // //             {/* AI Note */}
// // //             {aiNote && (
// // //                  <Alert severity="info" sx={{ mb: 3, borderRadius: 3 }}>
// // //                     <strong>AI Personalization:</strong> {aiNote}
// // //                  </Alert>
// // //             )}

// // //             {/* Roadmap Section */}
// // //             {roadmap && (
// // //                 <Box sx={{ animation: 'fadeIn 1s ease-in' }}>
// // //                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// // //                         <Typography variant="h5" fontWeight="bold">
// // //                             Personalized Roadmap
// // //                         </Typography>
// // //                         <Chip icon={<AccessTimeIcon />} label={`Est. Time: ${roadmap.estimated_duration}`} color="primary" variant="outlined" />
// // //                     </Box>

// // //                     <Stepper orientation="vertical">
// // //                         {roadmap.path.map((step, index) => (
// // //                             <Step key={index} active={true}>
// // //                                 <StepLabel 
// // //                                     StepIconProps={{
// // //                                         sx: { color: step.step_number === 0 ? 'error.main' : 'primary.main', fontSize: 30 }
// // //                                     }}
// // //                                 >
// // //                                     <Typography variant="h6" fontWeight="bold">
// // //                                         {step.skill_name} 
// // //                                         {step.step_number === 0 && <Chip label="Weak Area Detected" size="small" color="error" sx={{ ml: 2 }} />}
// // //                                     </Typography>
// // //                                 </StepLabel>
// // //                                 <StepContent>
// // //                                     <Box sx={{ mb: 2, mt: 1 }}>
// // //                                         <Typography variant="body2" color="text.secondary" gutterBottom>
// // //                                             {step.reason}
// // //                                         </Typography>
                                        
// // //                                         <Grid container spacing={2} sx={{ mt: 1 }}>
// // //                                             {step.resources.map((res, i) => (
// // //                                                 <Grid item xs={12} sm={6} key={i}>
// // //                                                     <Card variant="outlined" sx={{ '&:hover': { borderColor: 'primary.main', bgcolor: '#f9fafb' }, transition: '0.3s' }}>
// // //                                                         <CardContent sx={{ display: 'flex', alignItems: 'center', pb: '16px !important' }}>
// // //                                                             <PlayCircleOutlineIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
// // //                                                             <Box>
// // //                                                                 <Typography variant="subtitle2" fontWeight="bold">
// // //                                                                     <a href={res.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
// // //                                                                         {res.title}
// // //                                                                     </a>
// // //                                                                 </Typography>
// // //                                                                 <Typography variant="caption" color="text.secondary">
// // //                                                                     {res.type} • {res.duration}
// // //                                                                 </Typography>
// // //                                                             </Box>
// // //                                                         </CardContent>
// // //                                                     </Card>
// // //                                                 </Grid>
// // //                                             ))}
// // //                                         </Grid>
// // //                                     </Box>
// // //                                 </StepContent>
// // //                             </Step>
// // //                         ))}
// // //                     </Stepper>
// // //                 </Box>
// // //             )}
// // //         </Container>
// // //     );
// // // };

// // // export default Dashboard;

// // import React, { useState, useEffect, useContext } from 'react';
// // import { 
// //     Container, Typography, Box, Button, Grid, Card, CardContent, 
// //     Stepper, Step, StepLabel, StepContent, Chip, Avatar, IconButton, useTheme 
// // } from '@mui/material';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { AuthContext } from '../context/AuthContext';
// // import api, { generatePath } from '../services/api';
// // import { Line } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
// // import { motion } from 'framer-motion'; // Animation Library

// // // Icons
// // import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
// // import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
// // import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
// // import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
// // import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';

// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// // // --- STYLED COMPONENTS (Glassmorphism) ---
// // const GlassCard = ({ children, delay = 0 }) => (
// //     <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5, delay: delay }}
// //     >
// //         <Card sx={{ 
// //             background: 'rgba(255, 255, 255, 0.8)', 
// //             backdropFilter: 'blur(12px)', 
// //             borderRadius: '24px', 
// //             boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
// //             border: '1px solid rgba(255, 255, 255, 0.18)',
// //             overflow: 'visible',
// //             height: '100%'
// //         }}>
// //             {children}
// //         </Card>
// //     </motion.div>
// // );

// // const Dashboard = () => {
// //     const { user } = useContext(AuthContext);
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //     const theme = useTheme();
    
// //     const [targetRole] = useState(localStorage.getItem('selected_role') || 'role_fullstack');
// //     const [roleTitle, setRoleTitle] = useState('Loading...'); 
// //     const [stats, setStats] = useState([]);
// //     const [roadmap, setRoadmap] = useState(null);
// //     const [loading, setLoading] = useState(false);

// //     // Fetch Data & Update Last Active Role
// //     useEffect(() => {
// //         const initDashboard = async () => {
// //             if (!user?.id) return;

// //             // 1. Update Database with current role (Persistence Fix)
// //             await api.put('/auth/update-role', { userId: user.id, roleId: targetRole });

// //             // 2. Fetch Role Info
// //             const rolesRes = await api.get('/api/career/roles');
// //             const currentRole = rolesRes.data.find(r => r.id === targetRole);
// //             if (currentRole) setRoleTitle(currentRole.title);

// //             // 3. Fetch Stats (Trend Chart Fix)
// //             const statsRes = await api.get(`/api/quiz/stats/${user.id}?role_id=${targetRole}&t=${Date.now()}`);
// //             setStats(statsRes.data);
// //         };

// //         initDashboard();
// //     }, [user, targetRole, location.state]);

// //     const handleGenerate = async () => {
// //         setLoading(true);
// //         const score = localStorage.getItem('quiz_score') || 0; 
// //         try {
// //             const res = await generatePath({ 
// //                 target_role: targetRole,
// //                 quiz_score: parseInt(score),
// //                 strong_topics: JSON.parse(localStorage.getItem('strong_topics') || "[]"),
// //                 weak_topics: JSON.parse(localStorage.getItem('weak_topics') || "[]")
// //             });
// //             setRoadmap(res.data);
// //         } catch (err) {
// //             console.error(err);
// //         }
// //         setLoading(false);
// //     };

// //     // Chart Design
// //     const chartData = {
// //         labels: stats.map((_, i) => `Attempt ${i + 1}`),
// //         datasets: [{
// //             label: 'Proficiency',
// //             data: stats.map(s => s.score),
// //             borderColor: theme.palette.primary.main,
// //             backgroundColor: 'rgba(99, 102, 241, 0.1)',
// //             tension: 0.4, // Curved lines
// //             fill: true,
// //             pointRadius: 6,
// //             pointHoverRadius: 8
// //         }]
// //     };

// //     return (
// //         <Container maxWidth="xl" sx={{ mt: 4, mb: 10 }}>
            
// //             {/* 1. HERO SECTION */}
// //             <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                 <Box>
// //                     <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
// //                         <Typography variant="h3" fontWeight="900" sx={{ background: 'linear-gradient(45deg, #2563eb, #9333ea)', backgroundClip: 'text', color: 'transparent' }}>
// //                             Hello, {user?.username}
// //                         </Typography>
// //                         <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
// //                             Track: <strong>{roleTitle}</strong>
// //                         </Typography>
// //                     </motion.div>
// //                 </Box>
// //                 <Box>
// //                      <Button 
// //                         variant="outlined" 
// //                         onClick={() => navigate('/roles')}
// //                         startIcon={<RefreshRoundedIcon />}
// //                         sx={{ borderRadius: '12px', textTransform: 'none' }}
// //                      >
// //                         Switch Track
// //                      </Button>
// //                 </Box>
// //             </Box>

// //             <Grid container spacing={4}>
                
// //                 {/* 2. ANALYTICS COLUMN (Left) */}
// //                 <Grid item xs={12} md={4}>
// //                     <Grid container spacing={3}>
// //                         {/* Status Card */}
// //                         <Grid item xs={12}>
// //                             <GlassCard delay={0.1}>
// //                                 <CardContent sx={{ p: 4 }}>
// //                                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
// //                                         <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
// //                                             <TimelineRoundedIcon sx={{ color: 'white' }} />
// //                                         </Avatar>
// //                                         <Box sx={{ ml: 2 }}>
// //                                             <Typography variant="h6" fontWeight="bold">Performance Trend</Typography>
// //                                             <Typography variant="caption" color="text.secondary">Last 5 Assessments</Typography>
// //                                         </Box>
// //                                     </Box>
// //                                     <Box sx={{ height: 200 }}>
// //                                         {stats.length > 0 ? (
// //                                             <Line data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }} />
// //                                         ) : (
// //                                             <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //                                                 <Button variant="contained" onClick={() => navigate('/quiz')}>Take Assessment</Button>
// //                                             </Box>
// //                                         )}
// //                                     </Box>
// //                                 </CardContent>
// //                             </GlassCard>
// //                         </Grid>

// //                         {/* Action Card */}
// //                         <Grid item xs={12}>
// //                             <GlassCard delay={0.2}>
// //                                 <CardContent sx={{ p: 3, textAlign: 'center' }}>
// //                                     <Typography variant="h6" fontWeight="bold" gutterBottom>Ready to level up?</Typography>
// //                                     <Button 
// //                                         variant="contained" 
// //                                         fullWidth 
// //                                         size="large"
// //                                         onClick={handleGenerate}
// //                                         disabled={loading}
// //                                         startIcon={!loading && <BoltRoundedIcon />}
// //                                         sx={{ 
// //                                             borderRadius: '16px', 
// //                                             py: 2, 
// //                                             mt: 2,
// //                                             background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
// //                                             boxShadow: '0 10px 20px -10px rgba(99, 102, 241, 0.5)'
// //                                         }}
// //                                     >
// //                                         {loading ? 'AI is Computing...' : 'Generate Personalized Path'}
// //                                     </Button>
// //                                     <Button sx={{ mt: 1 }} size="small" onClick={() => navigate('/quiz')}>
// //                                         Retake Assessment
// //                                     </Button>
// //                                 </CardContent>
// //                             </GlassCard>
// //                         </Grid>
// //                     </Grid>
// //                 </Grid>

// //                 {/* 3. ROADMAP COLUMN (Right) */}
// //                 <Grid item xs={12} md={8}>
// //                     {roadmap ? (
// //                         <GlassCard delay={0.3}>
// //                             <CardContent sx={{ p: 5 }}>
// //                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
// //                                     <Typography variant="h5" fontWeight="bold">Your Learning Journey</Typography>
// //                                     <Chip label={roadmap.estimated_duration} color="primary" variant="filled" />
// //                                 </Box>

// //                                 <Stepper orientation="vertical" connector={<Box sx={{ height: 20, borderLeft: '2px solid #e0e0e0', ml: 1.5, my: 1 }} />}>
// //                                     {roadmap.path.map((step, index) => (
// //                                         <Step key={index} active={true} expanded={true}>
// //                                             <StepLabel StepIconComponent={() => (
// //                                                 <Avatar sx={{ 
// //                                                     width: 32, height: 32, 
// //                                                     bgcolor: step.step_number === 0 ? 'warning.light' : 'success.light',
// //                                                     color: 'white', fontWeight: 'bold', fontSize: 14
// //                                                 }}>
// //                                                     {step.step_number === 0 ? '!' : index + 1}
// //                                                 </Avatar>
// //                                             )}>
// //                                                 <Typography variant="h6" fontWeight="bold">{step.skill_name}</Typography>
// //                                             </StepLabel>
// //                                             <StepContent sx={{ borderLeft: 'none', ml: 4 }}>
// //                                                 <Typography color="text.secondary" sx={{ mb: 2 }}>{step.reason}</Typography>
// //                                                 <Grid container spacing={2}>
// //                                                     {step.resources.map((res, i) => (
// //                                                         <Grid item xs={12} sm={6} key={i}>
// //                                                             <Card variant="outlined" sx={{ 
// //                                                                 borderRadius: 3, 
// //                                                                 transition: '0.2s', 
// //                                                                 '&:hover': { transform: 'translateY(-3px)', boxShadow: 3, borderColor: 'primary.main' }
// //                                                             }}>
// //                                                                 <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', '&:last-child': { pb: 2 } }}>
// //                                                                     <PlayCircleFilledWhiteRoundedIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
// //                                                                     <Box>
// //                                                                         <Typography variant="subtitle2" fontWeight="bold" noWrap>
// //                                                                             <a href={res.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
// //                                                                                 {res.title}
// //                                                                             </a>
// //                                                                         </Typography>
// //                                                                         <Typography variant="caption" color="text.secondary">
// //                                                                             {res.type} • {res.duration}
// //                                                                         </Typography>
// //                                                                     </Box>
// //                                                                 </CardContent>
// //                                                             </Card>
// //                                                         </Grid>
// //                                                     ))}
// //                                                 </Grid>
// //                                             </StepContent>
// //                                         </Step>
// //                                     ))}
// //                                 </Stepper>
// //                             </CardContent>
// //                         </GlassCard>
// //                     ) : (
// //                         <GlassCard delay={0.3}>
// //                             <Box sx={{ p: 10, textAlign: 'center', opacity: 0.6 }}>
// //                                 <SchoolRoundedIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
// //                                 <Typography variant="h5" color="text.secondary">
// //                                     Your path is waiting.
// //                                 </Typography>
// //                                 <Typography>Click the generate button to start.</Typography>
// //                             </Box>
// //                         </GlassCard>
// //                     )}
// //                 </Grid>

// //             </Grid>
// //         </Container>
// //     );
// // };

// // export default Dashboard;
// import React, { useState, useEffect, useContext, useMemo } from 'react';
// import {
//   Container, Typography, Box, Button, Grid, Card, CardContent,
//   Stepper, Step, StepLabel, StepContent, Chip, Avatar, CircularProgress,
//   useTheme, Alert, IconButton, Tooltip
// } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import api, { generatePath } from '../services/api';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
//   Title, Tooltip as ChartTooltip, Legend, Filler
// } from 'chart.js';
// import { motion } from 'framer-motion';

// // Icons
// import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
// import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import SchoolIcon from '@mui/icons-material/School';
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend, Filler);

// /**
//  * Dashboard (Enhanced UI) - Single-file drop-in replacement
//  *
//  * Notes:
//  * - All original data fetching & generatePath behavior preserved.
//  * - UI polished: consistent spacing, card lift, responsive layout, subtle animations.
//  * - Subcomponents defined inside for single-file convenience.
//  */

// /* ----------------------- Shared UI primitives ----------------------- */

// const MotionCard = ({ children, delay = 0, sx = {}, ...props }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.45, delay }}
//     style={{ height: '100%' }}
//   >
//     <Card
//       elevation={0}
//       sx={{
//         height: '100%',
//         minHeight: 120,
//         borderRadius: 3,
//         background: 'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(250,250,250,0.9))',
//         boxShadow: '0 8px 30px rgba(15,23,42,0.06)',
//         overflow: 'hidden',
//         border: '1px solid rgba(15,23,42,0.04)',
//         transition: 'transform .22s ease, box-shadow .22s ease',
//         '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 40px rgba(15,23,42,0.08)' },
//         ...sx
//       }}
//       {...props}
//     >
//       {children}
//     </Card>
//   </motion.div>
// );

// /* Gradient premium card for hero */
// const GradientCard = ({ children, delay = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 10 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.45, delay }}
//     style={{ height: '100%' }}
//   >
//     <Card
//       elevation={0}
//       sx={{
//         height: '100%',
//         minHeight: 320,
//         borderRadius: 3,
//         background: 'linear-gradient(135deg,#4f46e5 0%, #7c3aed 100%)',
//         color: 'white',
//         boxShadow: '0 24px 60px rgba(76,29,149,0.12)',
//         border: 'none',
//         overflow: 'hidden'
//       }}
//     >
//       {children}
//     </Card>
//   </motion.div>
// );

// /* ----------------------- Subcomponents ----------------------- */

// const Header = ({ user, roleTitle, onSwitch }) => {
//   return (
//     <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//       <Box>
//         <Typography variant="h4" component="h1" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
//           Hello, <Box component="span" sx={{ color: '#6d28d9' }}>{user?.username || 'Learner'}</Box>
//         </Typography>
//         <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="subtitle2" color="text.secondary">Current Track</Typography>
//           <Chip
//             label={roleTitle}
//             sx={{ ml: 1, fontWeight: 700, bgcolor: 'rgba(99,102,241,0.12)', color: '#4338ca' }}
//             size="small"
//           />
//         </Box>
//       </Box>

//       <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//         <Tooltip title="Refresh / Switch role">
//           <IconButton aria-label="switch role" onClick={onSwitch} size="large" color="inherit" sx={{ borderRadius: 2, bgcolor: 'transparent', border: '1px solid rgba(15,23,42,0.06)' }}>
//             <RefreshRoundedIcon />
//           </IconButton>
//         </Tooltip>

//         <Button
//           variant="contained"
//           onClick={onSwitch}
//           startIcon={<RefreshRoundedIcon />}
//           sx={{
//             borderRadius: 2,
//             textTransform: 'none',
//             px: 2.5,
//             py: 1.1,
//             boxShadow: 'none',
//             background: 'linear-gradient(90deg,#0f172a,#111827)',
//             '&:hover': { background: 'linear-gradient(90deg,#0b1220,#0f172a)' }
//           }}
//         >
//           Switch Track
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// const PerformanceCard = ({ stats, roleTitle }) => {
//   const lastScore = stats.length ? stats[stats.length - 1].score : null;

//   const chartData = useMemo(() => ({
//     labels: stats.map((_, i) => `Attempt ${i + 1}`),
//     datasets: [{
//       label: 'Score',
//       data: stats.map(s => s.score),
//       borderColor: 'rgba(255,255,255,0.95)',
//       backgroundColor: 'rgba(255,255,255,0.12)',
//       tension: 0.34,
//       fill: true,
//       pointBackgroundColor: 'rgba(255,255,255,0.95)',
//       pointRadius: 5,
//       pointHoverRadius: 7
//     }]
//   }), [stats]);

//   const chartOptions = useMemo(() => ({
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { display: false } },
//     scales: {
//       x: { display: false },
//       y: { display: false, suggestedMin: 0, suggestedMax: 100 }
//     },
//     layout: { padding: 6 }
//   }), []);

//   return (
//     <GradientCard delay={0.08}>
//       <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.16)' }}>
//             <TrendingUpIcon sx={{ color: 'white' }} />
//           </Avatar>
//           <Box>
//             <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.95)', fontWeight: 700 }}>Performance</Typography>
//             <Typography variant="caption" sx={{ opacity: 0.85 }}>History for {roleTitle}</Typography>
//           </Box>
//         </Box>

//         <Box sx={{ mt: 3, flexGrow: 1, minHeight: 180 }}>
//           {stats.length ? (
//             <Line data={chartData} options={chartOptions} />
//           ) : (
//             <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.9)' }}>
//               <Typography variant="body1" sx={{ opacity: 0.9 }}>No history for this role yet.</Typography>
//             </Box>
//           )}
//         </Box>

//         {lastScore !== null && (
//           <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h3" sx={{ fontWeight: 800, color: 'white' }}>{lastScore}%</Typography>
//             <Chip label={`${stats.length} attempts`} sx={{ bgcolor: 'rgba(255,255,255,0.16)', color: 'white', fontWeight: 700 }} />
//           </Box>
//         )}
//       </CardContent>
//     </GradientCard>
//   );
// };

// const ActionsCard = ({ onGenerate, onRetake, loading }) => {
//   return (
//     <MotionCard delay={0.14} sx={{ minHeight: 320 }}>
//       <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <AutoAwesomeIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
//           <Typography variant="h6" sx={{ fontWeight: 700 }}>AI Actions</Typography>
//         </Box>

//         <Typography variant="body2" color="text.secondary">
//           Use AI to generate a suggested learning path based on your assessment and topic strengths/weaknesses.
//         </Typography>

//         <Button
//           variant="contained"
//           onClick={onGenerate}
//           disabled={loading}
//           startIcon={!loading ? <PlayCircleFilledWhiteRoundedIcon /> : null}
//           sx={{
//             py: 1.8,
//             borderRadius: 2,
//             fontSize: '1rem',
//             textTransform: 'none',
//             background: 'linear-gradient(90deg,#111827,#0f172a)',
//             '&:hover': { background: 'linear-gradient(90deg,#0b1220,#0f172a)' }
//           }}
//         >
//           {loading ? <CircularProgress size={22} color="inherit" /> : 'Generate New Roadmap'}
//         </Button>

//         <Button
//           variant="outlined"
//           onClick={onRetake}
//           sx={{
//             py: 1.2, borderRadius: 2, textTransform: 'none',
//             borderColor: 'rgba(15,23,42,0.08)', color: 'text.primary'
//           }}
//         >
//           Retake Skill Assessment
//         </Button>
//       </CardContent>
//     </MotionCard>
//   );
// };

// const EmptyRoadmapCard = () => (
//   <MotionCard delay={0.26} sx={{ minHeight: 220 }}>
//     <Box sx={{ height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
//       <SchoolIcon sx={{ fontSize: 72, color: 'rgba(15,23,42,0.08)' }} />
//       <Typography variant="h6" color="text.secondary">No Roadmap Generated</Typography>
//       <Typography variant="body2" color="text.secondary">Click "Generate New Roadmap" to begin your personalized learning journey.</Typography>
//     </Box>
//   </MotionCard>
// );

// const RoadmapCard = ({ roadmap }) => {
//   return (
//     <MotionCard delay={0.26} sx={{ p: 0 }}>
//       <CardContent sx={{ p: { xs: 3, md: 5 } }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
//           <Typography variant="h6" sx={{ fontWeight: 800 }}>Your Learning Journey</Typography>
//           <Chip label={roadmap.estimated_duration || '—'} color="primary" sx={{ fontWeight: 700 }} />
//         </Box>

//         {roadmap.note && (
//           <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
//             <strong>AI Personalization:</strong> {roadmap.note}
//           </Alert>
//         )}

//         <Stepper orientation="vertical" sx={{ pl: 0 }} connector={<Box />}>
//           {roadmap.path.map((step, index) => (
//             <Step key={index} active expanded>
//               <StepLabel
//                 StepIconComponent={() => (
//                   <Avatar
//                     sx={{
//                       width: 44, height: 44,
//                       bgcolor: step.step_number === 0 ? '#fee2e2' : '#dcfce7',
//                       color: step.step_number === 0 ? '#b91c1c' : '#166534',
//                       fontWeight: 800,
//                       boxShadow: '0 6px 18px rgba(2,6,23,0.04)'
//                     }}
//                   >
//                     {step.step_number === 0 ? '!' : index + 1}
//                   </Avatar>
//                 )}
//               >
//                 <Typography variant="subtitle1" sx={{ fontWeight: 700, ml: 1 }}>{step.skill_name}</Typography>
//               </StepLabel>

//               <StepContent sx={{ ml: 6, borderLeft: 'none', mt: 1 }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{step.reason}</Typography>

//                 <Grid container spacing={2}>
//                   {step.resources.map((res, i) => (
//                     <Grid item xs={12} md={6} key={i}>
//                       <Card variant="outlined" sx={{
//                         borderRadius: 2, display: 'flex', p: 1.5, alignItems: 'center',
//                         border: '1px solid rgba(15,23,42,0.04)', cursor: 'pointer',
//                         transition: '.18s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 30px rgba(2,6,23,0.04)' }
//                       }}>
//                         <PlayCircleFilledWhiteRoundedIcon sx={{ color: '#6d28d9', fontSize: 30, mr: 1.5 }} />
//                         <Box sx={{ flexGrow: 1 }}>
//                           <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
//                             <a href={res.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
//                               <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.title}</span>
//                               <OpenInNewIcon sx={{ fontSize: 14, opacity: 0.5 }} />
//                             </a>
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">{res.type} • {res.duration}</Typography>
//                         </Box>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </StepContent>
//             </Step>
//           ))}
//         </Stepper>
//       </CardContent>
//     </MotionCard>
//   );
// };

// /* ----------------------- Main Dashboard ----------------------- */

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();

//   const [targetRole] = useState(localStorage.getItem('selected_role') || 'role_fullstack');
//   const [roleTitle, setRoleTitle] = useState('Loading...');
//   const [stats, setStats] = useState([]);
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   // Fetch roles & stats
//   useEffect(() => {
//     let isMounted = true;
//     if (!user?.id) return;

//     const fetchData = async () => {
//       try {
//         setErrorMsg('');
//         // Roles
//         const rolesRes = await api.get('/api/career/roles');
//         if (!isMounted) return;
//         const currentRole = (rolesRes.data || []).find(r => r.id === targetRole);
//         if (currentRole) setRoleTitle(currentRole.title);

//         // Stats
//         const statsRes = await api.get(`/api/quiz/stats/${user.id}?role_id=${targetRole}&t=${Date.now()}`);
//         if (!isMounted) return;
//         setStats(Array.isArray(statsRes.data) ? statsRes.data : []);
//       } catch (err) {
//         console.error('Dashboard Fetch Error:', err);
//         if (isMounted) setErrorMsg('Failed to load data. Check connection.');
//       }
//     };

//     fetchData();

//     // re-attempt once shortly if no stats (helps right after signup)
//     const timer = setTimeout(() => {
//       if (!stats.length && user?.id) fetchData();
//     }, 500);

//     return () => { isMounted = false; clearTimeout(timer); };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, targetRole, location.state]);

//   // Generate roadmap
//   const handleGenerate = async () => {
//     setLoading(true);
//     const score = localStorage.getItem('quiz_score') || 0;
//     try {
//       const res = await generatePath({
//         target_role: targetRole,
//         quiz_score: parseInt(score, 10),
//         strong_topics: JSON.parse(localStorage.getItem('strong_topics') || '[]'),
//         weak_topics: JSON.parse(localStorage.getItem('weak_topics') || '[]')
//       });
//       setRoadmap(res.data);
//     } catch (err) {
//       console.error('Generate Roadmap error', err);
//       alert('AI Service Unavailable. Please ensure Python engine is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRetake = () => navigate('/quiz');

//   const handleSwitch = () => navigate('/roles');

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4, mb: 10 }}>
//       <Header user={user} roleTitle={roleTitle} onSwitch={handleSwitch} />

//       {errorMsg && <Alert severity="error" sx={{ mb: 3 }}>{errorMsg}</Alert>}

//       <Grid container spacing={4}>
//         {/* Left: Performance */}
//         <Grid item xs={12} md={6}>
//           <PerformanceCard stats={stats} roleTitle={roleTitle} />
//         </Grid>

//         {/* Right: Actions */}
//         <Grid item xs={12} md={6}>
//           <ActionsCard onGenerate={handleGenerate} onRetake={handleRetake} loading={loading} />
//         </Grid>

//         {/* Roadmap: full width */}
//         <Grid item xs={12}>
//           {roadmap ? (
//             <RoadmapCard roadmap={roadmap} />
//           ) : (
//             <EmptyRoadmapCard />
//           )}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useContext } from 'react';
import { 
    Container, Typography, Box, Button, Grid, Card, CardContent, 
    Stepper, Step, StepLabel, StepContent, Chip, Avatar, CircularProgress, 
    useTheme, Alert, Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api, { generatePath } from '../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { motion } from 'framer-motion';

// Icons
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledWhiteRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- STYLED COMPONENTS ---
const PremiumCard = ({ children, delay = 0, gradient = false, fullHeight = true }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        style={{ height: fullHeight ? '100%' : 'auto' }}
    >
        <Card sx={{ 
            height: fullHeight ? '100%' : 'auto', 
            borderRadius: '24px', 
            background: gradient ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : '#ffffff',
            color: gradient ? 'white' : 'text.primary',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.08)',
            border: gradient ? 'none' : '1px solid #f3f4f6',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.2)' }
        }}>
            {children}
        </Card>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    // State
    const [targetRole] = useState(localStorage.getItem('selected_role') || 'role_fullstack');
    const [roleTitle, setRoleTitle] = useState('Loading...'); 
    const [stats, setStats] = useState([]);
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // 1. DATA FETCH
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (!user || !user.id) return;
            try {
                setErrorMsg("");
                // Get Role Title
                const rolesRes = await api.get('/api/career/roles');
                if(isMounted) {
                    const currentRole = rolesRes.data.find(r => r.id === targetRole);
                    if (currentRole) setRoleTitle(currentRole.title);
                }
                // Get Stats
                const statsRes = await api.get(`/api/quiz/stats/${user.id}?role_id=${targetRole}&t=${Date.now()}`);
                if(isMounted) setStats(statsRes.data);
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
                if(isMounted) setErrorMsg("Failed to load data. Check connection.");
            }
        };
        fetchData();
        const timer = setTimeout(() => { if (!stats.length && user?.id) fetchData(); }, 500);
        return () => { isMounted = false; clearTimeout(timer); };
    }, [user, targetRole, location.state]); 

    // 2. GENERATE PATH
    const handleGenerate = async () => {
        setLoading(true);
        const score = localStorage.getItem('quiz_score') || 0; 
        try {
            const res = await generatePath({ 
                target_role: targetRole,
                quiz_score: parseInt(score),
                strong_topics: JSON.parse(localStorage.getItem('strong_topics') || "[]"),
                weak_topics: JSON.parse(localStorage.getItem('weak_topics') || "[]")
            });
            setRoadmap(res.data);
        } catch (err) {
            alert("AI Service Unavailable. Please ensure Python engine is running.");
        }
        setLoading(false);
    };

    // Chart Options
    const chartData = {
        labels: stats.map((_, i) => `Try ${i + 1}`),
        datasets: [{
            label: 'Score',
            data: stats.map(s => s.score),
            borderColor: '#fff', 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#fff',
            pointRadius: 6,
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false, min: 0, max: 100 } },
        layout: { padding: 10 }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 10 }}>
            
            {/* --- HEADER SECTION --- */}
            <Box sx={{ mb: 6, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box>
                    <Typography variant="h3" fontWeight="900" sx={{ letterSpacing: '-1px', color: '#1e293b' }}>
                        Hello, <span style={{ color: '#6366f1' }}>{user?.username}</span>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Typography variant="h6" color="text.secondary">Current Track:</Typography>
                        <Chip 
                            label={roleTitle} 
                            sx={{ ml: 1.5, fontWeight: 'bold', bgcolor: '#e0e7ff', color: '#4338ca', borderRadius: '8px' }} 
                        />
                    </Box>
                </Box>
                <Button 
                    variant="outlined" 
                    onClick={() => navigate('/roles')}
                    startIcon={<RefreshRoundedIcon />}
                    sx={{ borderRadius: '12px', px: 3, py: 1, borderColor: '#cbd5e1', color: '#64748b', '&:hover': { borderColor: '#6366f1', color: '#6366f1' } }}
                >
                    Switch Track
                </Button>
            </Box>

            {errorMsg && <Alert severity="error" sx={{ mb: 3 }}>{errorMsg}</Alert>}

            {/* --- MAIN GRID LAYOUT --- */}
            <Grid container spacing={4}>
                
                {/* --- ROW 1: TOP CARDS (Equal Height) --- */}
                
                {/* Left: Performance Chart */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%' }}>
                        <PremiumCard delay={0.1} gradient={true}>
                            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}><TrendingUpIcon /></Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">Performance</Typography>
                                            <Typography variant="caption" sx={{ opacity: 0.8 }}>History for {roleTitle}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ height: 200, mt: 2 }}>
                                        {stats.length > 0 ? (
                                            <Line data={chartData} options={chartOptions} />
                                        ) : (
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }}>
                                                <Typography>No history for this role yet.</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                {stats.length > 0 && (
                                    <Box sx={{ textAlign: 'right', mt: 2 }}>
                                        <Typography variant="h3" fontWeight="bold">{stats[stats.length - 1].score}%</Typography>
                                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Latest Score</Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </PremiumCard>
                    </Box>
                </Grid>

                {/* Right: AI Actions */}
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Box sx={{ width: '100%' }}>
                        <PremiumCard delay={0.2}>
                            <CardContent sx={{ p: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4, color: '#1e293b' }}>
                                    <AutoAwesomeIcon sx={{ color: '#f59e0b', mr: 2, fontSize: 32 }} /> 
                                    AI Career Actions
                                </Typography>
                                
                                <Button 
                                    variant="contained" fullWidth size="large" onClick={handleGenerate} disabled={loading}
                                    sx={{ py: 2.5, mb: 3, borderRadius: '16px', fontSize: '1.1rem', background: '#1e293b', boxShadow: '0 8px 20px -5px rgba(30, 41, 59, 0.4)', '&:hover': { background: '#0f172a' } }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate New Roadmap'}
                                </Button>
                                
                                <Button 
                                    variant="outlined" fullWidth onClick={() => navigate('/quiz')}
                                    sx={{ py: 2, borderRadius: '16px', fontSize: '1rem', border: '2px solid #e2e8f0', color: '#475569', '&:hover': { borderColor: '#94a3b8', color: '#1e293b' } }}
                                >
                                    Retake Skill Assessment
                                </Button>
                            </CardContent>
                        </PremiumCard>
                    </Box>
                </Grid>
            </Grid>

                {/* --- ROW 2: ROADMAP (Full Width) --- */}
                <div style={{ padding: 20 }}>
                    <PremiumCard delay={0.3}>
                        <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                            {roadmap ? (
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: '#eff6ff', color: '#3b82f6', mr: 2, width: 50, height: 50 }}><SchoolIcon /></Avatar>
                                            <Box>
                                                <Typography variant="h4" fontWeight="bold" color="#1e293b">Learning Journey</Typography>
                                                <Typography variant="body2" color="text.secondary">Personalized for your skill level</Typography>
                                            </Box>
                                        </Box>
                                        <Chip label={roadmap.estimated_duration} color="primary" sx={{ borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', py: 2.5, px: 1 }} />
                                    </Box>

                                    {roadmap.note && (
                                        <Alert icon={<LightbulbIcon fontSize="inherit" />} severity="info" sx={{ mb: 6, borderRadius: '12px', bgcolor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd' }}>
                                            <strong>AI Insight:</strong> {roadmap.note}
                                        </Alert>
                                    )}

                                    <Stepper orientation="vertical" connector={<Box sx={{ height: 30, borderLeft: '3px solid #e2e8f0', ml: 2.5, my: 1 }} />}>
                                        {roadmap.path.map((step, index) => (
                                            <Step key={index} active={true} expanded={true}>
                                                <StepLabel StepIconComponent={() => (
                                                    <Avatar sx={{ 
                                                        width: 44, height: 44, 
                                                        bgcolor: step.step_number === 0 ? '#fee2e2' : '#22c55e',
                                                        color: 'white', fontWeight: 'bold', fontSize: 16,
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                    }}>
                                                        {step.step_number === 0 ? '!' : index + 1}
                                                    </Avatar>
                                                )}>
                                                    <Typography variant="h6" fontWeight="bold" sx={{ ml: 1, color: '#334155' }}>{step.skill_name}</Typography>
                                                </StepLabel>
                                                <StepContent sx={{ borderLeft: 'none', ml: 8 }}>
                                                    <Typography color="text.secondary" sx={{ mb: 3, mt: 1 }}>{step.reason}</Typography>
                                                    
                                                    <Grid container spacing={2}>
                                                        {step.resources.map((res, i) => (
                                                            <Grid item xs={12} md={6} lg={4} key={i}>
                                                                <Card variant="outlined" sx={{ 
                                                                    borderRadius: 4, display: 'flex', p: 2, alignItems: 'center',
                                                                    bgcolor: '#f8fafc', border: '1px solid #f1f5f9',
                                                                    transition: '0.2s',
                                                                    '&:hover': { borderColor: '#6366f1', bgcolor: 'white', boxShadow: '0 5px 15px rgba(99, 102, 241, 0.1)' }
                                                                }}>
                                                                    <PlayCircleFilledWhiteRoundedIcon sx={{ color: '#6366f1', fontSize: 40, mr: 2 }} />
                                                                    <Box sx={{ overflow: 'hidden' }}>
                                                                        <Typography variant="subtitle2" fontWeight="bold" noWrap sx={{ fontSize: '0.95rem' }}>
                                                                            <a href={res.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1e293b' }}>
                                                                                {res.title}
                                                                            </a>
                                                                        </Typography>
                                                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                                                            {res.type} • {res.duration}
                                                                        </Typography>
                                                                    </Box>
                                                                </Card>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </>
                            ) : (
                                <Box sx={{ height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                                    <SchoolIcon sx={{ fontSize: 100, color: '#e2e8f0', mb: 3 }} />
                                    <Typography variant="h4" color="text.secondary" fontWeight="bold">No Roadmap Generated</Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>Click "Generate New Roadmap" above to begin your journey.</Typography>
                                </Box>
                            )}
                        </CardContent>
                    </PremiumCard>
                </div>
        </Container>
    );
};

export default Dashboard;