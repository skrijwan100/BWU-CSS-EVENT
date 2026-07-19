import React from 'react';
import { UserPlus, CalendarDays, FileCheck2, MailCheck } from 'lucide-react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Create Account",
      description: "Sign up on the portal and complete your profile with all your required student details.",
      icon: <UserPlus strokeWidth={1.5} />
    },
    {
      id: "02",
      title: "Browse Events",
      description: "Navigate to the events section to find the Coding Contest details and requirements.",
      icon: <CalendarDays strokeWidth={1.5} />
    },
    {
      id: "03",
      title: "Submit Application",
      description: "Select and apply for the contest explicitly tailored to your current semester (3rd or 5th).",
      icon: <FileCheck2 strokeWidth={1.5} />
    },
    {
      id: "04",
      title: "Check Status",
      description: "Monitor your application page for approval and watch your inbox for the official acceptance email.",
      icon: <MailCheck strokeWidth={1.5} />
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="section-header">
        <span className="badge">● SIMPLE 4-STEP PROCESS</span>
        <h2 className="title">
          HOW IT <span>WORKS</span>
        </h2>
        <p className="subtitle">
          From registration to the competition floor — follow these steps to secure your spot in the Coding Contest.
        </p>
      </div>

      <div className="cards-container">
        {steps.map((step) => (
          <div className="card" key={step.id}>
            <div className="icon-container">
              {step.icon}
            </div>
            
            <div className="step-indicator">
              <div className="step-number">{step.id}</div>
              <div className="step-line"></div>
            </div>
            
            <h3 className="card-title">{step.title}</h3>
            <p className="card-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;