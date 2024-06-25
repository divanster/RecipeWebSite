// src/screens/LoginScreen.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Your login logic here
        navigate('/some-path'); // Navigate to the desired path after login
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginScreen;
