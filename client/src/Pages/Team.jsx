import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import '../styles/TeamSection.css';

const TeamSection = () => {
  const team = [
    {
      name: "Sk Rijwan",
      role: "Student Coordinator",
      image: "https://ik.imagekit.io/ufopzzlbh/IMG-20260725-WA0047.jpg",
      github: "https://github.com/skrijwan100",
      linkedin: "https://www.linkedin.com/in/sekh-rijwan-026740311/"
    },
    {
      name: "Tarapada Garai",
      role: "Student Coordinator",
      image: "https://ik.imagekit.io/ufopzzlbh/IMG-20260725-WA0039.jpg",
      github: "https://github.com/codingWithRakesh",
      linkedin: "https://www.linkedin.com/in/tarapada-garai/"
    }
  ];

  return (
    <section className="ts-section">
      <div className="ts-container">
        
        {/* Header */}
        <div className="ts-header">
          <span className="ts-badge">
            Event Management
          </span>
          <h2 className="ts-title">
            Meet The <span>Coordinators</span>
          </h2>
          <p className="ts-subtitle">
            The driving force behind the Department Coding Contest 2026. Feel free to reach out to us if you have any questions or require assistance.
          </p>
        </div>

        {/* Team Grid */}
        <div className="ts-grid">
          {team.map((member, index) => (
            <div key={index} className="ts-card">
              {/* Profile Image with Glow Effect */}
              <div className="ts-image-wrapper">
                <div className="ts-image-glow"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="ts-image"
                />
              </div>
              
              {/* Info */}
              <h3 className="ts-name">{member.name}</h3>
              <p className="ts-role">{member.role}</p>
              
              {/* Social Links */}
              <div className="ts-socials">
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub`}
                  className="ts-social-link"
                >
                  <Github size={20} strokeWidth={1.5} />
                </a>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn`}
                  className="ts-social-link"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default TeamSection;