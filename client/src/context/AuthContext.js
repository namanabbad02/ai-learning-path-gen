import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // const login = (token, userData) => {
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('user', JSON.stringify(userData));
    //     setUser(userData);
        
    //     // FIX: Redirect to Role Explorer instead of Dashboard
    //     navigate('/roles'); 
    // };
    // const login = (token, userData) => {
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('user', JSON.stringify(userData));
    //     setUser(userData);
        
    //     // CHECK: Has user already taken the initial test?
    //     if (userData.onboarded) {
    //         navigate('/dashboard'); // Returning user -> Dashboard
    //     } else {
    //         navigate('/roles'); // New user -> Assessment Flow
    //     }
    // };
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        if (userData.last_active_role) {
            // Restore their last session
            localStorage.setItem('selected_role', userData.last_active_role);
            navigate('/dashboard');
        } else if (userData.onboarded) {
            // They took a test but have no saved role (edge case), go to dashboard default
            navigate('/dashboard');
        } else {
            // Brand new user
            navigate('/roles');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};