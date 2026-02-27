// import React, { useState, useContext } from 'react';
// import { Container, TextField, Button, Typography, Paper, Box, Alert, MenuItem } from '@mui/material';
// import { AuthContext } from '../context/AuthContext';
// import { registerUser } from '../services/api';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// const Register = () => {
//     const [formData, setFormData] = useState({ username: '', email: '', password: '', career_goal: '' });
//     const [error, setError] = useState('');
//     const { login } = useContext(AuthContext);

//     const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await registerUser(formData);
//             login(res.data.token, res.data.user);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Registration Failed');
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                         <PersonAddIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
//                         <Typography component="h1" variant="h5" fontWeight="bold">
//                             Create Account
//                         </Typography>
//                     </Box>
                    
//                     {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//                     <form onSubmit={handleSubmit}>
//                         <TextField margin="normal" required fullWidth label="Full Name" name="username" onChange={handleChange} />
//                         <TextField margin="normal" required fullWidth label="Email Address" name="email" onChange={handleChange} />
//                         <TextField margin="normal" required fullWidth label="Password" name="password" type="password" onChange={handleChange} />
                        
//                         {/* Dropdown for Career Goal */}
//                         <TextField
//                             select
//                             margin="normal"
//                             required
//                             fullWidth
//                             label="Career Goal"
//                             name="career_goal"
//                             value={formData.career_goal}
//                             onChange={handleChange}
//                         >
//                             <MenuItem value="Data Scientist">Data Scientist</MenuItem>
//                             <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
//                         </TextField>

//                         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
//                             Register & Start Learning
//                         </Button>
//                     </form>
//                 </Paper>
//             </Box>
//         </Container>
//     );
// };

// export default Register;

import React, { useState, useContext, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Alert, MenuItem } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import api, { registerUser } from '../services/api'; // Import api instance
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', career_goal: '' });
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]); // State to store fetched roles
    const { login } = useContext(AuthContext);

    // Fetch Roles from Backend when component loads
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await api.get('/api/career/roles');
                setRoles(res.data);
            } catch (err) {
                console.error("Failed to load roles list", err);
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(formData);
            // Login the user immediately after registration
            login(res.data.token, res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration Failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonAddIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
                        <Typography component="h1" variant="h5" fontWeight="bold">
                            Create Account
                        </Typography>
                    </Box>
                    
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Full Name" 
                            name="username" 
                            onChange={handleChange} 
                        />
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Email Address" 
                            name="email" 
                            type="email"
                            onChange={handleChange} 
                        />
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            label="Password" 
                            name="password" 
                            type="password" 
                            onChange={handleChange} 
                        />
                        
                        {/* Dynamic Dropdown for Career Goal */}
                        <TextField
                            select
                            margin="normal"
                            required
                            fullWidth
                            label="Career Goal"
                            name="career_goal"
                            value={formData.career_goal}
                            onChange={handleChange}
                            helperText="Select your primary interest (you can explore others later)"
                        >
                            {roles.length > 0 ? (
                                roles.map((role) => (
                                    <MenuItem key={role.id} value={role.title}>
                                        {role.title}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>Loading Career Paths...</MenuItem>
                            )}
                        </TextField>

                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            size="large"
                            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                        >
                            Register & Start Learning
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;