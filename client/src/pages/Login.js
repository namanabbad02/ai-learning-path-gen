import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Alert } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            login(res.data.token, res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ 
                marginTop: 8, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
            }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
                    <Box sx={{ 
                        bgcolor: 'primary.light', 
                        width: 50, 
                        height: 50, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto',
                        mb: 2,
                        color: 'white'
                    }}>
                        <LoginIcon />
                    </Box>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Sign in to continue your learning journey
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
                        >
                            Sign In
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;