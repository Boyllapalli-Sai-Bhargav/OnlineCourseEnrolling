import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import 'C:/React/Work/udemy/src/componentsCss/SignUp.css';
import Signup from 'C:/React/Work/udemy/src/ui/Signup.jpeg';
import Header from './Header';
import { TextField, InputAdornment } from '@mui/material';
import { Email, Phone, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const validateEmail = (email) => {
        return email.endsWith('@gmail.com');
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(email)) newErrors.email = 'Enter valid email';
        if (!validatePhone(phone)) newErrors.phone = 'Enter valid number';
        if (!validatePassword(password)) newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        setSuccessMessage('');

        if (Object.keys(newErrors).length === 0) {
            const hashedPassword = CryptoJS.SHA256(password).toString();

            // Get the last used user ID from local storage (if any) and increment it
            let lastUserId = localStorage.getItem('lastUserId');
            if (!lastUserId) lastUserId = 0;  // If no user ID is found, start from 0
            const userId = parseInt(lastUserId) + 1;  // Increment the user ID

            // Save the new user ID for future users
            localStorage.setItem('lastUserId', userId);

            const userData = { userId, email, phone, password: hashedPassword };

            try {
                // Send the data to the backend
                await fetch('http://localhost:3456/rdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                setSuccessMessage("User Registration Success");
                setEmail('');
                setPhone('');
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="signup-container">
                <div className="image-container">
                    <h1 className='h1'>Sign up and start learning</h1>
                    <img src={Signup} alt="Signup" className="signup-image" />
                </div>
                
                <div className="form-container">
                    {successMessage && <div className="successText">{successMessage}</div>}
                    <form onSubmit={handleSubmit} className="form">
                        <div className="inputGroup">
                            <TextField
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                            />
                        </div>
                        <div className="inputGroup">
                            <TextField
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter valid Mobile"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.phone}
                                helperText={errors.phone}
                                required
                            />
                        </div>
                        <div className="inputGroup">
                            <TextField
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Type password"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                            />
                        </div>
                        <div className="inputGroup">
                            <TextField
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Retype password"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                required
                            />
                        </div>
                        <button type="submit" className="signupbtn">Sign Up</button>
                    </form>
                </div>
            </div>
            <div>
                <p className='terms'>By signing up, you agree to our <span className='s1'>Terms of Use</span> and <span className='s1'>Privacy Policy.</span></p><br />
                <button className='b3'>Already Have an account? <span onClick={handleLoginClick} className='lo'>Login</span></button>
            </div>
        </>
    );
};

export default SignUp;
