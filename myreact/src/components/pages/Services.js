import React from 'react';
import './Services.css';

const services = [
  {
    title: "Story Generation",
    description: "Generate a unique story based on the provided prompt and style of given articles/books/stories."
  },
  {
    title: "Author Style Analysis",
    description: "Analyze the style of provided content to ensure generated stories match the intended writing style."
  },
  {
    title: "Prompt Customization",
    description: "Customize the story generation prompt to suit specific requirements and preferences."
  },
  {
    title: "Story Enhancements",
    description: "Enhance existing stories with additional content and stylistic improvements."
  },
  {
    title: "Integration Support",
    description: "Provide support for integrating the story generation model into various applications and platforms."
  }
];

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-header">
        <h1>SERVICES</h1>
      </div>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
