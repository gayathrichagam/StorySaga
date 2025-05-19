import React from 'react';
import './About.css'; // Ensure this path is correct based on your project structure

const About = () => {
  return (
    <div className="about-page">
      <h1 className='title'>ABOUT US</h1>
      <div className="about-section">
        <div className="about-card">
          <h2>Our Vision</h2>
          <p>We envision a world where technology and creativity unite to craft personalized stories that capture the essence of individual imagination. By leveraging advanced AI, we bring your prompts to life, weaving intricate plots and vivid characters that echo the styles of your favorite authors.</p>
        </div>
        <div className="about-card">
          <h2>How It Works</h2>
          <p>1. Submit Your Inspiration: Share a few articles, books, or stories that you love.<br />2. Provide a Prompt: Give us a prompt that outlines the essence of the story you want.<br />3. Generate Magic: Our AI model will analyze your input and generate a new, original story that mirrors the style of your provided inspirations.</p>
        </div>
        <div className="about-card">
          <h2>Why Choose Us?</h2>
          <p>Personalized Narratives: Each story is uniquely crafted based on your preferences and prompts.<br />Diverse Styles: Our AI can mimic a wide range of authorial styles, ensuring the story feels authentic.<br />Creative Freedom: Unleash your imagination and see it come to life in ways you never thought possible.</p>
        </div>
      </div>
      {/* <div className="about-team">
        <h2>Our Team</h2>
        <div className="team-member">
          <img src="team-member.jpg" alt="Team Member" />
          <p>We are a group of passionate storytellers, technologists, and dreamers dedicated to redefining how stories are created and consumed. With a blend of creativity and innovation, we strive to push the boundaries of narrative possibilities.</p>
        </div>
      </div> */}
    </div>
  );
};

export default About;
