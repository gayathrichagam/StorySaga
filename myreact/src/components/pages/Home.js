import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import "./Home.css";
import Footer from '../Footer';

function Home() {
  return (
    <div className='home-page'>
      <div className='content-overlay'>
        <HeroSection />
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;