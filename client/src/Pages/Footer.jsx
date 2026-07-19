import React from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin, Code2 } from 'lucide-react';
import '../styles/footer.css'; // Importing the standard CSS file
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Brand & Info Section */}
        <div className="footer-brand">
          <div className="brand-logo">
             {/* Using Code2 as a placeholder for the Brainware/CSSEVENT logo */}
             <Code2 className="logo-icon" size={28} /> 
             <h2>CSSEVENT</h2>
          </div>
          <p>
            Coding League of Brainware University CSS Department. 
            Code. Compile. Win. Compete with your classmates and prove your problem-solving skills.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/event">Event Details</Link></li>
            <li><Link to="/leaderbord">Leaderboard</Link></li>
            <li><Link to="/event">Apply for Event</Link></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="footer-contact">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <Mail size={18} /> 
              <span>undefinedbca@gmail.com</span>
            </li>
            <li>
              <MapPin size={18} /> 
              <span>Brainware University Campus</span>
            </li>
          </ul>
          
          <div className="social-icons">
            <a href="#" aria-label="GitHub"><Github size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CSSEVENT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;