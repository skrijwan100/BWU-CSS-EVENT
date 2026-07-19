import React from 'react';
import { Trophy, Timer, Sparkles, Code2 } from 'lucide-react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="leaderboard-container">
      {/* Background Decorative Glows */}
      <div className="glow-blob top-left"></div>
      <div className="glow-blob bottom-right"></div>

      {/* Main Glass Card */}
      <div className="coming-soon-card fade-in-up" style={{marginTop:"70px"}}>
        
        {/* Animated Trophy Icon */}
        <div className="icon-wrapper floating">
          <Trophy size={72} className="trophy-icon" strokeWidth={1.5} />
          <Sparkles size={28} className="sparkle-icon top-right floating-delayed" />
          <Sparkles size={20} className="sparkle-icon bottom-left floating" />
        </div>
        
        {/* Text Content */}
        <div className="text-content">
          <h1 className="leaderboard-title">LEADERBOARD</h1>
          
          <div className="status-badge pulse-glow">
            <Timer size={16} strokeWidth={2.5} />
            <span>COMING SOON</span>
          </div>
          
          <p className="leaderboard-description">
            The battle for the top spot is underway. Rankings, scores, and the ultimate coding champions will be revealed here shortly. 
          </p>
          <div className="divider">
            <Code2 size={24} className="code-icon" />
          </div>
          <p className="tagline">Code . Compile . Win</p>
        </div>
        
        {/* Action Button */}
        <button className="back-btn-outline" onClick={handleGoBack}>
          ← Go Back to Arena
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;