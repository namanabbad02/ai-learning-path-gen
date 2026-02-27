// // import React from 'react';
// // import { Container, Typography, Box, Card, CardContent, Button, Grid } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// // const careerPaths = [
// //     {
// //         title: "I love Logic & Math",
// //         roles: ["Data Scientist", "Machine Learning Eng"],
// //         desc: "You enjoy finding patterns in data and predicting the future."
// //     },
// //     {
// //         title: "I love Visuals & Design",
// //         roles: ["Frontend Developer", "UI/UX Designer"],
// //         desc: "You care about how things look and how users interact with them."
// //     },
// //     {
// //         title: "I love Building & Fixing",
// //         roles: ["Full Stack Developer", "DevOps Engineer"],
// //         desc: "You want to build complete systems or keep servers running."
// //     },
// //     {
// //         title: "I love Security & Hacking",
// //         roles: ["Cyber Security Analyst", "Ethical Hacker"],
// //         desc: "You want to protect systems and find vulnerabilities."
// //     }
// // ];

// // const CareerGuide = () => {
// //     const navigate = useNavigate();

// //     const handleChoice = (roles) => {
// //         // Filter the Role Explorer to show only these suggestions (Advanced feature)
// //         // For now, we just redirect to Explorer but you could pass state
// //         navigate('/roles', { state: { suggested: roles } });
// //     };

// //     return (
// //         <Container maxWidth="lg" sx={{ mt: 8 }}>
// //             <Box sx={{ textAlign: 'center', mb: 8 }}>
// //                 <EmojiObjectsIcon sx={{ fontSize: 60, color: 'gold', mb: 2 }} />
// //                 <Typography variant="h3" fontWeight="bold" gutterBottom>
// //                     Not sure where to start?
// //                 </Typography>
// //                 <Typography variant="h6" color="text.secondary">
// //                     Select the statement that describes you best.
// //                 </Typography>
// //             </Box>

// //             <Grid container spacing={4}>
// //                 {careerPaths.map((path, index) => (
// //                     <Grid item xs={12} md={6} key={index}>
// //                         <Card 
// //                             sx={{ 
// //                                 height: '100%', 
// //                                 cursor: 'pointer',
// //                                 transition: '0.3s',
// //                                 '&:hover': { transform: 'scale(1.02)', boxShadow: 6, borderColor: 'primary.main' },
// //                                 border: '1px solid #e0e0e0'
// //                             }}
// //                             onClick={() => handleChoice(path.roles)}
// //                         >
// //                             <CardContent sx={{ p: 4, textAlign: 'center' }}>
// //                                 <Typography variant="h5" fontWeight="bold" gutterBottom>
// //                                     {path.title}
// //                                 </Typography>
// //                                 <Typography variant="body1" color="text.secondary" paragraph>
// //                                     {path.desc}
// //                                 </Typography>
// //                                 <Typography variant="subtitle2" color="primary">
// //                                     Suggested: {path.roles.join(", ")}
// //                                 </Typography>
// //                             </CardContent>
// //                         </Card>
// //                     </Grid>
// //                 ))}
// //             </Grid>
// //         </Container>
// //     );
// // };

// // export default CareerGuide;

// import React, { useState } from 'react';
// import { 
//     Container, Typography, Box, Grid, Card, CardContent, Button, 
//     Chip, IconButton, Modal, Fade, Backdrop, useTheme 
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// // Icons
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import CodeIcon from '@mui/icons-material/Code';
// import SecurityIcon from '@mui/icons-material/Security';
// import StorageIcon from '@mui/icons-material/Storage';
// import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
// import CloseIcon from '@mui/icons-material/Close';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import AutoGraphIcon from '@mui/icons-material/AutoGraph';

// // --- DATA: THE KNOWLEDGE BASE ---
// const GUIDE_DATA = [
//     {
//         id: 'logic',
//         title: "The Data Detective",
//         tagline: "I love Logic, Math & Patterns",
//         icon: <PsychologyIcon fontSize="large" />,
//         color: '#8b5cf6', // Violet
//         roles: [
//             { id: 'role_ds', name: 'Data Scientist' },
//             { id: 'role_ml_eng', name: 'ML Engineer' }
//         ],
//         videoUrl: "https://www.youtube.com/embed/xSUuxMEMs-M?si=example", // Replace with real links
//         description: "You are curious about why things happen. You enjoy digging into numbers to find hidden truths and predicting the future using AI.",
//         skills: ["Python", "Statistics", "Machine Learning", "SQL"],
//         salary: "$95k - $160k",
//         growth: "35% (Very High)"
//     },
//     {
//         id: 'creative',
//         title: "The Visual Architect",
//         tagline: "I love Design & User Experience",
//         icon: <CodeIcon fontSize="large" />,
//         color: '#ec4899', // Pink
//         roles: [
//             { id: 'role_frontend', name: 'Frontend Developer' },
//             { id: 'role_ui_ux', name: 'UI/UX Designer' }
//         ],
//         videoUrl: "https://www.youtube.com/embed/m_X0tK5Q3VI?si=example",
//         description: "You care about how things look and feel. You want to build interfaces that people love to touch and interact with.",
//         skills: ["React.js", "Figma", "CSS/Tailwind", "JavaScript"],
//         salary: "$75k - $130k",
//         growth: "22% (High)"
//     },
//     {
//         id: 'builder',
//         title: "The System Builder",
//         tagline: "I love Building & Fixing Things",
//         icon: <StorageIcon fontSize="large" />,
//         color: '#3b82f6', // Blue
//         roles: [
//             { id: 'role_fullstack', name: 'Full Stack Dev' },
//             { id: 'role_devops', name: 'DevOps Engineer' }
//         ],
//         videoUrl: "https://www.youtube.com/embed/xo3aCLSyWIA?si=example",
//         description: "You want to understand the whole picture. From the database to the server to the screen, you build the engines that run the web.",
//         skills: ["Node.js", "Docker", "Database Design", "API Logic"],
//         salary: "$90k - $150k",
//         growth: "28% (High)"
//     },
//     {
//         id: 'guardian',
//         title: "The Digital Guardian",
//         tagline: "I love Security & Hacking",
//         icon: <SecurityIcon fontSize="large" />,
//         color: '#10b981', // Emerald
//         roles: [
//             { id: 'role_cyber', name: 'Cyber Security' },
//             { id: 'role_network', name: 'Network Engineer' }
//         ],
//         videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA?si=example",
//         description: "You think like a hacker to stop hackers. You enjoy puzzles, encryption, and protecting critical systems from attacks.",
//         skills: ["Linux", "Ethical Hacking", "Networking", "Python"],
//         salary: "$100k - $170k",
//         growth: "32% (Very High)"
//     }
// ];

// // --- ANIMATED COMPONENTS ---
// const MotionCard = motion(Card);

// const CareerGuide = () => {
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const [activeCategory, setActiveCategory] = useState(null);

//     const handleOpen = (category) => setActiveCategory(category);
//     const handleClose = () => setActiveCategory(null);

//     const handleSelectPath = (roleId) => {
//         // 1. Set the Role
//         localStorage.setItem('selected_role', roleId);
//         // 2. Go to Assessment
//         navigate('/quiz');
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
            
//             {/* HEADER */}
//             <Box sx={{ textAlign: 'center', mb: 8 }}>
//                 <Typography variant="h2" fontWeight="900" gutterBottom sx={{ background: 'linear-gradient(90deg, #6366f1, #ec4899)', backgroundClip: 'text', color: 'transparent' }}>
//                     Discover Your Superpower
//                 </Typography>
//                 <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
//                     Unsure where to start? Select the persona that resonates with you, watch the guide, and let AI build your path.
//                 </Typography>
//             </Box>

//             {/* CARDS GRID */}
//             <Grid container spacing={4}>
//                 {GUIDE_DATA.map((cat, index) => (
//                     <Grid item xs={12} md={6} key={cat.id}>
//                         <MotionCard 
//                             whileHover={{ scale: 1.03, y: -5 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={() => handleOpen(cat)}
//                             sx={{ 
//                                 cursor: 'pointer', height: '100%', borderRadius: 4,
//                                 border: `1px solid ${cat.color}30`,
//                                 background: `linear-gradient(135deg, #ffffff 0%, ${cat.color}10 100%)`,
//                                 boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)'
//                             }}
//                         >
//                             <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
//                                 <Box sx={{ 
//                                     p: 2, borderRadius: '50%', bgcolor: cat.color, color: 'white', mb: 2,
//                                     boxShadow: `0 8px 20px -5px ${cat.color}80`
//                                 }}>
//                                     {cat.icon}
//                                 </Box>
//                                 <Typography variant="h5" fontWeight="bold" gutterBottom>{cat.title}</Typography>
//                                 <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{cat.tagline}</Typography>
                                
//                                 <Box sx={{ display: 'flex', gap: 1 }}>
//                                     {cat.roles.map(r => (
//                                         <Chip key={r.id} label={r.name} size="small" sx={{ bgcolor: 'white', border: `1px solid ${cat.color}` }} />
//                                     ))}
//                                 </Box>
                                
//                                 <Typography variant="button" sx={{ mt: 3, color: cat.color, display: 'flex', alignItems: 'center' }}>
//                                     <PlayCircleFilledWhiteIcon sx={{ mr: 1 }} /> Watch Guide
//                                 </Typography>
//                             </CardContent>
//                         </MotionCard>
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* --- DEEP DIVE MODAL --- */}
//             <Modal
//                 open={!!activeCategory}
//                 onClose={handleClose}
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(5px)' } }}
//             >
//                 <Fade in={!!activeCategory}>
//                     <Box sx={{ 
//                         position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//                         width: { xs: '95%', md: '900px' }, maxHeight: '90vh', overflowY: 'auto',
//                         bgcolor: 'background.paper', borderRadius: 4, boxShadow: 24, outline: 'none',
//                         p: 0 
//                     }}>
//                         {activeCategory && (
//                             <Box>
//                                 {/* VIDEO HEADER */}
//                                 <Box sx={{ position: 'relative', width: '100%', height: { xs: '200px', md: '400px' }, bgcolor: 'black' }}>
//                                     <iframe 
//                                         width="100%" height="100%" 
//                                         src={activeCategory.videoUrl} 
//                                         title="Career Video"
//                                         frameBorder="0" 
//                                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                                         allowFullScreen
//                                     ></iframe>
//                                     <IconButton 
//                                         onClick={handleClose}
//                                         sx={{ position: 'absolute', top: 10, right: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
//                                     >
//                                         <CloseIcon />
//                                     </IconButton>
//                                 </Box>

//                                 {/* CONTENT BODY */}
//                                 <Box sx={{ p: { xs: 3, md: 5 } }}>
//                                     <Grid container spacing={4}>
//                                         {/* Left: Info */}
//                                         <Grid item xs={12} md={7}>
//                                             <Typography variant="h4" fontWeight="900" sx={{ color: activeCategory.color, mb: 2 }}>
//                                                 {activeCategory.title}
//                                             </Typography>
//                                             <Typography variant="h6" paragraph>
//                                                 {activeCategory.description}
//                                             </Typography>
                                            
//                                             <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>Key Skills You'll Learn:</Typography>
//                                             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
//                                                 {activeCategory.skills.map(skill => (
//                                                     <Chip key={skill} label={skill} sx={{ bgcolor: `${activeCategory.color}20`, color: activeCategory.color, fontWeight: 'bold' }} />
//                                                 ))}
//                                             </Box>
//                                         </Grid>

//                                         {/* Right: Stats & Action */}
//                                         <Grid item xs={12} md={5}>
//                                             <Card sx={{ bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid #e2e8f0' }}>
//                                                 <CardContent>
//                                                     <Box sx={{ mb: 3 }}>
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                                             <MonetizationOnIcon color="success" sx={{ mr: 1 }} />
//                                                             <Typography variant="subtitle2" color="text.secondary">Avg. Salary</Typography>
//                                                         </Box>
//                                                         <Typography variant="h5" fontWeight="bold">{activeCategory.salary}</Typography>
//                                                     </Box>
                                                    
//                                                     <Box sx={{ mb: 4 }}>
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                                             <AutoGraphIcon color="primary" sx={{ mr: 1 }} />
//                                                             <Typography variant="subtitle2" color="text.secondary">Career Growth</Typography>
//                                                         </Box>
//                                                         <Typography variant="h5" fontWeight="bold">{activeCategory.growth}</Typography>
//                                                     </Box>

//                                                     <Typography variant="subtitle2" gutterBottom>Select a Role to Start:</Typography>
//                                                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                                                         {activeCategory.roles.map(role => (
//                                                             <Button 
//                                                                 key={role.id}
//                                                                 variant="contained" 
//                                                                 size="large"
//                                                                 fullWidth
//                                                                 onClick={() => handleSelectPath(role.id)}
//                                                                 sx={{ 
//                                                                     bgcolor: activeCategory.color, 
//                                                                     '&:hover': { filter: 'brightness(0.9)' },
//                                                                     display: 'flex', justifyContent: 'space-between'
//                                                                 }}
//                                                             >
//                                                                 <span>Start as {role.name}</span>
//                                                                 <PlayCircleFilledWhiteIcon />
//                                                             </Button>
//                                                         ))}
//                                                     </Box>
//                                                 </CardContent>
//                                             </Card>
//                                         </Grid>
//                                     </Grid>
//                                 </Box>
//                             </Box>
//                         )}
//                     </Box>
//                 </Fade>
//             </Modal>

//         </Container>
//     );
// };

// export default CareerGuide;

import React, { useState } from 'react';
import { 
    Container, Typography, Box, Grid, Card, CardContent, Button, 
    Chip, IconButton, Modal, Fade, Backdrop, useTheme, Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icons
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import CloseIcon from '@mui/icons-material/Close';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// --- REAL-WORLD INDIAN DATA (2025 Market Research) ---
const GUIDE_DATA = [
    {
        id: 'data',
        title: "The Data Detective",
        tagline: "Logic, Patterns & Prediction",
        icon: <PsychologyIcon fontSize="large" />,
        color: '#8b5cf6', // Violet
        roles: [
            { id: 'role_ds', name: 'Data Scientist' },
            { id: 'role_ml_eng', name: 'ML Engineer' }
        ],
        // Video: "A Day in the Life: Data Science Engineer in India (Indeed)"
        videoUrl: "https://www.youtube.com/embed/-EtSodKDsT4", 
        description: "You are curious about 'Why'. You love digging into raw numbers to find hidden truths, building AI models, and predicting future trends to help businesses succeed.",
        skills: ["Python & SQL", "Machine Learning", "Mathematics", "Data Visualization (PowerBI)"],
        salary: "₹8 LPA - ₹24 LPA",
        growth: "46% Annual Growth",
        companies: ["Google", "Flipkart", "Fractal", "MuSigma"]
    },
    {
        id: 'frontend',
        title: "The Visual Architect",
        tagline: "Design, UX & Interactivity",
        icon: <CodeIcon fontSize="large" />,
        color: '#ec4899', // Pink
        roles: [
            { id: 'role_frontend', name: 'Frontend Dev' },
            { id: 'role_ui_ux', name: 'UI/UX Designer' }
        ],
        // Video: "Frontend vs Backend vs Full Stack (Simplilearn)"
        videoUrl: "https://www.youtube.com/embed/Start?start=60&end=600&v=q5J5ho7Ysdg", 
        description: "You care about the 'Look & Feel'. You want to design beautiful user interfaces and write code that brings designs to life on mobile and web screens.",
        skills: ["React.js / Next.js", "JavaScript (ES6+)", "Figma / Adobe XD", "Tailwind CSS"],
        salary: "₹6 LPA - ₹18 LPA",
        growth: "22% High Demand",
        companies: ["Swiggy", "Cred", "Razorpay", "Adobe"]
    },
    {
        id: 'fullstack',
        title: "The System Builder",
        tagline: "End-to-End Problem Solving",
        icon: <StorageIcon fontSize="large" />,
        color: '#3b82f6', // Blue
        roles: [
            { id: 'role_fullstack', name: 'Full Stack Dev' },
            { id: 'role_devops', name: 'DevOps Engineer' }
        ],
        // Video: "What is DevOps? (Edureka)"
        videoUrl: "https://www.youtube.com/embed/XdBd14rVIzf0",
        description: "You want to own the whole stack. From database architecture to server logic to cloud deployment, you build the engines that run modern apps.",
        skills: ["Node.js & Express", "MongoDB / SQL", "AWS / Docker", "System Design"],
        salary: "₹10 LPA - ₹30 LPA",
        growth: "30% YoY Growth",
        companies: ["Amazon", "Zomato", "Uber", "Paytm"]
    },
    {
        id: 'security',
        title: "The Digital Guardian",
        tagline: "Security, Networks & Hacking",
        icon: <SecurityIcon fontSize="large" />,
        color: '#10b981', // Emerald
        roles: [
            { id: 'role_cyber', name: 'Cyber Security' },
            { id: 'role_network', name: 'Network Engineer' }
        ],
        // Video: "Cyber Security Career in 2024"
        videoUrl: "https://www.youtube.com/embed/lpa8uy4DyMo",
        description: "You think like a hacker to stop hackers. You enjoy solving complex puzzles, encrypting data, and protecting critical infrastructure from cyber attacks.",
        skills: ["Ethical Hacking", "Linux / Kali", "Networking (TCP/IP)", "Cryptography"],
        salary: "₹7 LPA - ₹25 LPA",
        growth: "35% Critical Need",
        companies: ["Palo Alto", "Cisco", "Deloitte", "Govt of India"]
    }
];

const MotionCard = motion(Card);

const CareerGuide = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [activeCategory, setActiveCategory] = useState(null);

    const handleOpen = (category) => setActiveCategory(category);
    const handleClose = () => setActiveCategory(null);

    const handleSelectPath = (roleId) => {
        localStorage.setItem('selected_role', roleId);
        navigate('/quiz');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
            
            {/* --- HERO HEADER --- */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" fontWeight="900" gutterBottom sx={{ background: 'linear-gradient(90deg, #6366f1, #ec4899)', backgroundClip: 'text', color: 'transparent' }}>
                    Discover Your Tech DNA
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
                    Not sure which path to take? Explore the 4 pillars of the tech world. 
                    Watch the videos, check the salaries, and find where you belong.
                </Typography>
            </Box>

            {/* --- CARDS GRID --- */}
            <Grid container spacing={4}>
                {GUIDE_DATA.map((cat) => (
                    <Grid item xs={12} md={6} key={cat.id}>
                        <MotionCard 
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOpen(cat)}
                            sx={{ 
                                cursor: 'pointer', height: '100%', borderRadius: 5,
                                border: `1px solid ${cat.color}30`,
                                background: `linear-gradient(135deg, #ffffff 0%, ${cat.color}08 100%)`,
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                                position: 'relative', overflow: 'visible'
                            }}
                        >
                            {/* Floating Icon Badge */}
                            <Box sx={{ 
                                position: 'absolute', top: -20, left: 30,
                                width: 60, height: 60, borderRadius: '20px',
                                bgcolor: cat.color, color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 8px 20px -5px ${cat.color}60`
                            }}>
                                {cat.icon}
                            </Box>

                            <CardContent sx={{ p: 4, pt: 6 }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 1 }}>
                                    {cat.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                                    {cat.tagline}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                                    {cat.roles.map(r => (
                                        <Chip key={r.id} label={r.name} size="small" sx={{ bgcolor: 'white', border: `1px solid ${cat.color}40`, fontWeight: 600 }} />
                                    ))}
                                </Box>
                                
                                <Button 
                                    variant="text" 
                                    sx={{ color: cat.color, p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                                    endIcon={<PlayCircleFilledWhiteIcon />}
                                >
                                    Watch Career Guide
                                </Button>
                            </CardContent>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            {/* --- IMMERSIVE MODAL --- */}
            <Modal
                open={!!activeCategory}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(8px)', bgcolor: 'rgba(0,0,0,0.7)' } }}
            >
                <Fade in={!!activeCategory}>
                    <Box sx={{ 
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: { xs: '95%', md: '900px' }, maxHeight: '95vh', overflowY: 'auto',
                        bgcolor: '#ffffff', borderRadius: 4, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', outline: 'none'
                    }}>
                        {activeCategory && (
                            <Box>
                                {/* VIDEO SECTION */}
                                <Box sx={{ position: 'relative', width: '100%', height: { xs: '250px', md: '450px' }, bgcolor: 'black' }}>
                                    <iframe 
                                        width="100%" height="100%" 
                                        src={activeCategory.videoUrl} 
                                        title="Career Video"
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                    <IconButton 
                                        onClick={handleClose}
                                        sx={{ position: 'absolute', top: 15, right: 15, color: 'white', bgcolor: 'rgba(0,0,0,0.6)', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>

                                {/* DETAILS SECTION */}
                                <Box sx={{ p: { xs: 3, md: 5 } }}>
                                    <Grid container spacing={5}>
                                        {/* Left: Description & Skills */}
                                        <Grid item xs={12} md={7}>
                                            <Typography variant="h4" fontWeight="900" sx={{ color: activeCategory.color, mb: 2 }}>
                                                {activeCategory.title}
                                            </Typography>
                                            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
                                                {activeCategory.description}
                                            </Typography>
                                            
                                            <Divider sx={{ my: 3 }} />
                                            
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>Core Skills You Will Master</Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                                {activeCategory.skills.map(skill => (
                                                    <Chip 
                                                        key={skill} 
                                                        icon={<CheckCircleIcon fontSize="small" />} 
                                                        label={skill} 
                                                        sx={{ bgcolor: `${activeCategory.color}15`, color: activeCategory.color, fontWeight: 'bold', fontSize: '0.9rem', py: 0.5 }} 
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>

                                        {/* Right: Market Stats & CTA */}
                                        <Grid item xs={12} md={5}>
                                            <Card elevation={0} sx={{ bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0', p: 1 }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
                                                        Indian Market Outlook (2025)
                                                    </Typography>
                                                    
                                                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                                        <MonetizationOnIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                                                        <Box>
                                                            <Typography variant="h5" fontWeight="bold" color="text.primary">{activeCategory.salary}</Typography>
                                                            <Typography variant="caption" color="text.secondary">Avg. Annual Package</Typography>
                                                        </Box>
                                                    </Box>
                                                    
                                                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                                                        <TrendingUpIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                                                        <Box>
                                                            <Typography variant="h5" fontWeight="bold" color="text.primary">{activeCategory.growth}</Typography>
                                                            <Typography variant="caption" color="text.secondary">Job Market Growth</Typography>
                                                        </Box>
                                                    </Box>

                                                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                                                        Ready to Start?
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                                                        {activeCategory.roles.map(role => (
                                                            <Button 
                                                                key={role.id}
                                                                variant="contained" 
                                                                size="large"
                                                                fullWidth
                                                                onClick={() => handleSelectPath(role.id)}
                                                                sx={{ 
                                                                    bgcolor: activeCategory.color, 
                                                                    color: 'white',
                                                                    py: 1.5, borderRadius: 3, textTransform: 'none', fontSize: '1rem',
                                                                    boxShadow: `0 8px 20px -5px ${activeCategory.color}60`,
                                                                    '&:hover': { bgcolor: activeCategory.color, filter: 'brightness(0.9)' }
                                                                }}
                                                            >
                                                                Start as {role.name}
                                                            </Button>
                                                        ))}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>

        </Container>
    );
};

export default CareerGuide;