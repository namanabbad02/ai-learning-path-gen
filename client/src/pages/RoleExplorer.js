// import React, { useState, useEffect } from 'react';
// import { 
//     Container, Grid, Card, CardContent, Typography, Button, 
//     Box, CircularProgress, Alert, Chip 
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api'; // Use the configured API instance
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import CareerGuide from './CareerGuide';

// const RoleExplorer = () => {
//     const navigate = useNavigate();
//     const [roles, setRoles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch roles from Backend on component mount
//     useEffect(() => {
//         const fetchRoles = async () => {
//             try {
//                 // This calls GET http://localhost:5000/api/career/roles
//                 // Which calls GET http://localhost:8000/roles (Python)
//                 // Which queries Neo4j
//                 const res = await api.get('/api/career/roles'); 
//                 setRoles(res.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Failed to load roles", err);
//                 setError("Unable to load career paths. Please check your connection.");
//                 setLoading(false);
//             }
//         };

//         fetchRoles();
//     }, []);

//     const handleSelectRole = (roleId) => {
//         // Save selection to use later in Dashboard/AI generation
//         localStorage.setItem('selected_role', roleId);
//         navigate('/quiz'); // Proceed to assessment
//     };

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//                 <CircularProgress size={60} thickness={4} />
//                 <Typography variant="h6" sx={{ ml: 2 }}>Loading Career Paths...</Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Container sx={{ mt: 5 }}>
//                 <Alert severity="error" variant="filled">{error}</Alert>
//             </Container>
//         );
//     }

//     return (
//         <Container sx={{ mt: 5, mb: 10 }}>
//             <Box sx={{ textAlign: 'center', mb: 6 }}>
//                 <Typography variant="h3" fontWeight="800" gutterBottom sx={{ background: 'linear-gradient(45deg, #6366f1, #ec4899)', backgroundClip: 'text', color: 'transparent' }}>
//                     Explore Your Future
//                 </Typography>
//                 <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//                     Discover over {roles.length} AI-curated technology paths. Select a role to begin your skill assessment.
//                 </Typography>
//             </Box>

//             <Grid container spacing={4}>
//                 {roles.map((role) => (
//                     <Grid item xs={12} sm={6} md={4} key={role.id}>
//                         <Card 
//                             sx={{ 
//                                 height: '100%', 
//                                 display: 'flex', 
//                                 flexDirection: 'column',
//                                 borderRadius: 4,
//                                 transition: 'all 0.3s ease',
//                                 border: '1px solid rgba(0,0,0,0.05)',
//                                 '&:hover': { 
//                                     transform: 'translateY(-8px)', 
//                                     boxShadow: '0 12px 30px rgba(99, 102, 241, 0.15)',
//                                     borderColor: 'primary.main'
//                                 }
//                             }}
//                         >
//                             <CardContent sx={{ flexGrow: 1, p: 3 }}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                                     <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.light', color: 'white', mr: 2 }}>
//                                         <WorkOutlineIcon />
//                                     </Box>
//                                     <Chip label="Tech Track" size="small" variant="outlined" color="primary" />
//                                 </Box>
                                
//                                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                                     {role.title}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
//                                     {role.description || "Analyze, build, and deploy modern solutions in this domain."}
//                                 </Typography>
//                             </CardContent>
                            
//                             <Box sx={{ p: 2, pt: 0 }}>
//                                 <Button 
//                                     variant="contained" 
//                                     fullWidth 
//                                     endIcon={<ArrowForwardIcon />}
//                                     onClick={() => handleSelectRole(role.id)}
//                                     sx={{ 
//                                         borderRadius: 3, 
//                                         py: 1.5,
//                                         background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
//                                         '&:hover': { background: 'linear-gradient(90deg, #4f46e5 0%, #4338ca 100%)' }
//                                     }}
//                                 >
//                                     Select Path
//                                 </Button>
//                             </Box>
//                         </Card>
                        
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };

// export default RoleExplorer;

import React, { useState, useEffect } from 'react';
import { 
    Container, Grid, Card, CardContent, Typography, Button, 
    Box, CircularProgress, Alert, Chip, useTheme 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'; // Icon for the Guide

const RoleExplorer = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch roles from Backend on component mount
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get('/api/career/roles'); 
                setRoles(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load roles", err);
                setError("Unable to load career paths. Please check your connection.");
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleSelectRole = (roleId) => {
        localStorage.setItem('selected_role', roleId);
        navigate('/quiz'); 
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="h6" sx={{ ml: 2 }}>Loading Career Paths...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 5 }}>
                <Alert severity="error" variant="filled">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 5, mb: 10 }}>
            
            {/* --- HEADER SECTION --- */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" fontWeight="800" gutterBottom sx={{ background: 'linear-gradient(45deg, #6366f1, #ec4899)', backgroundClip: 'text', color: 'transparent' }}>
                    Explore Your Future
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Discover over {roles.length} AI-curated technology paths. Select a role to begin your skill assessment.
                </Typography>
            </Box>

            {/* --- NEW: CAREER GUIDE CTA BOX --- */}
            <Card 
                sx={{ 
                    mb: 6, 
                    p: 1,
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)', // Warm yellow/orange tint
                    border: '1px solid #fcd34d',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(251, 191, 36, 0.15)'
                }}
            >
                <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
                        <Box sx={{ 
                            p: 2, borderRadius: '50%', bgcolor: '#f59e0b', color: 'white', mr: 3,
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                        }}>
                            <EmojiObjectsIcon sx={{ fontSize: 32 }} />
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" sx={{ color: '#78350f' }}>
                                Confused about where to start?
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#92400e' }}>
                                Let our AI analyze your interests and suggest the perfect role for you.
                            </Typography>
                        </Box>
                    </Box>
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={() => navigate('/guide')}
                        sx={{ 
                            bgcolor: '#d97706', 
                            color: 'white',
                            px: 4, py: 1.5, borderRadius: 3, fontWeight: 'bold',
                            '&:hover': { bgcolor: '#b45309' }
                        }}
                    >
                        Find My Career
                    </Button>
                </CardContent>
            </Card>

            {/* --- ROLES GRID --- */}
            <Grid container spacing={4}>
                {roles.map((role) => (
                    <Grid item xs={12} sm={6} md={4} key={role.id}>
                        <Card 
                            sx={{ 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                borderRadius: 4,
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(0,0,0,0.05)',
                                '&:hover': { 
                                    transform: 'translateY(-8px)', 
                                    boxShadow: '0 12px 30px rgba(99, 102, 241, 0.15)',
                                    borderColor: 'primary.main'
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.light', color: 'white', mr: 2 }}>
                                        <WorkOutlineIcon />
                                    </Box>
                                    <Chip label="Tech Track" size="small" variant="outlined" color="primary" />
                                </Box>
                                
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    {role.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {role.description || "Analyze, build, and deploy modern solutions in this domain."}
                                </Typography>
                            </CardContent>
                            
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => handleSelectRole(role.id)}
                                    sx={{ 
                                        borderRadius: 3, 
                                        py: 1.5,
                                        background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
                                        '&:hover': { background: 'linear-gradient(90deg, #4f46e5 0%, #4338ca 100%)' }
                                    }}
                                >
                                    Select Path
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RoleExplorer;