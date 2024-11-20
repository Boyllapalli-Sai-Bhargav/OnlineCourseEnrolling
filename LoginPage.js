import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { FaUser } from "react-icons/fa6";
import { IoLockClosed } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import 'C:/React/Work/udemy/src/componentsCss/LoginPage.css'; // Adjusted path for import
import login from 'C:/React/Work/udemy/src/ui/login.png'; // Ensure the path is correct
import Header from './Header';
import { MdEmail } from "react-icons/md";
import { Divider, Typography } from "@mui/material";
import google from 'C:/React/Work/udemy/src/ui/google.png';
import facebook from 'C:/React/Work/udemy/src/ui/facebook.png';
import apple from 'C:/React/Work/udemy/src/ui/apple.png'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSignupClick = () => {
        navigate('/Signup');
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        fetch('http://localhost:3456/rdata')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                const user = users.find(user => user.email === email);
                if (user) {
                    const encryptedInputPassword = CryptoJS.SHA256(password).toString();
                    if (encryptedInputPassword === user.password) {
                        navigate('/welcomeDashboard', { state: { username: user.username, id: user.id, email: user.email, MobileNumber: user.MobileNumber } });
                    } else {
                        setError('Invalid email or password. Please try again.');
                    }
                } else {
                    setError('Invalid email or password. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setError('Error fetching user data.');
            });
    };

    return (
        
      <>
      <Header />
        <div className="login-page">
            <div className="img-container">
                <img src={login} alt="Login Illustration" />
            </div>
            <div className="login-container">
                <p className="login-header">Log in to continue your learning journey</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} required className="login-input"/>
                    </div>
                    <div className="input-group">
                        <IoLockClosed className="input-icon" />
                        <input
                            type="password"
                            placeholder='Enter your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    {error && <span className="error-message">{error}</span>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <button className='b1'><MdEmail className='email-icon'/>Continue with email</button>
                <Divider className="d1">
                <Typography variant="body1" color="textSecondary" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Other login options
                </Typography>
                 </Divider>

                <div className="icon-container">
                <p className='pp'><img src={google} alt="google" className='icon' /></p>
                <p className='pp'><img src={facebook} alt="google" className='icon' /></p>
                <p className='pp'><img src={apple} alt="google" className='icon' /></p>
                </div>
                <button className='b2'>Don't Have an account? <span onClick={handleSignupClick} className='su'>Sign Up</span></button>
            </div>
        </div>
        </>
    );
};

export default LoginPage;