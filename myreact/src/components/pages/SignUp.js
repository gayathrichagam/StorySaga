import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

import user_icon from './user_icon.jpg';
import email_icon from './email_id.jpg';
import password_icon from './password_icon.jpg';

const SignUp = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', { name, email, password });
      alert('User registered successfully');
      setAction('Login');
    } catch (error) {
      alert('Error registering user');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      alert('Login successful');
      // Navigate to the StoryGenerator page
      navigate('/story-generator');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const handleSubmit = () => {
    if (action === "Sign Up") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className='main-container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? null : (
          <div className='input'>
            <img src={user_icon} alt="" width='50px' />
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className='input'>
          <img src={email_icon} alt="" width='50px' />
          <input type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='input'>
          <img src={password_icon} alt="" width='50px' />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      {action === 'Sign Up' ? null : (
        <div className='forgot-password'>
          Lost Password? <span onClick={() => navigate('/forgot-password')}>Click Here</span>
        </div>
      )}
      <div className='submit-container'>
        <div className='submit' onClick={handleSubmit}>{action}</div>
        <div className='submit gray' onClick={() => setAction(action === 'Login' ? 'Sign Up' : 'Login')}>
          {action === 'Login' ? 'Sign Up' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
