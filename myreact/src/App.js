import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import About from './components/pages/About';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer';
import StoryGenerator from './components/pages/StoryGenerator';
import ForgotPassword from './components/pages/ForgotPassword'; // Import ForgotPassword component
import ResetPassword from './components/pages/ResetPassword';// Import ResetPassword component

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/story-generator' element={<StoryGenerator />} />
          <Route path='/forgot-password' element={<ForgotPassword />} /> {/* Add ForgotPassword route */}
          <Route path='/reset-password/:token' element={<ResetPassword />} /> {/* Add ResetPassword route */}
        </Routes>
      </Router>
    </>
  );
}

export default App;