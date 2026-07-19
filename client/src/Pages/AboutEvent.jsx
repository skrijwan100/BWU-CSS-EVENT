import React from 'react';
import { 
  Calendar, 
  Trophy, 
  Swords, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Code2, 
  AlertCircle,
  Layers,
  UserMinus
} from 'lucide-react';
import '../styles/EventDetails.css';

const EventDetails = () => {
  return (
    <div className="ed-container">
      {/* Hero Section */}
      <header className="ed-hero">
        <div className="ed-badge">Brainware University • CSS Department</div>
        <h1 className="ed-title">
          DEPARTMENT CODING <span>CONTEST 2026</span>
        </h1>
        <p className="ed-subtitle">
          A 4-month survival of the fittest. Sharpen your logic, conquer the algorithms, 
          and code your way to the top. Are you ready for the battleground?
        </p>
      </header>

      {/* Highlights Section */}
      <section className="ed-highlights">
        <div className="ed-highlight-card">
          <Calendar className="ed-icon yellow" />
          <h3>4-Month Journey</h3>
          <p>One stage every month from August to November. Consistent performance is key.</p>
        </div>
        <div className="ed-highlight-card">
          <Swords className="ed-icon yellow" />
          <h3>Daily Eliminations</h3>
          <p>Eliminations <strong>do not</strong> happen after every round. You must survive the entire day (2 to 3 rounds) before eliminations are calculated.</p>
        </div>
        <div className="ed-highlight-card">
          <Trophy className="ed-icon yellow" />
          <h3>Grand Finale</h3>
          <p>Final winners will be crowned based on cumulative performance across all 4 stages.</p>
        </div>
      </section>

      {/* Stage Roadmap Section */}
      <section className="ed-roadmap">
        <h2 className="ed-section-title">Contest <span>Roadmap</span></h2>
        
        <div className="ed-stages-grid">
          
          {/* Stage 1: August (Revealed) */}
          <div className="ed-stage-card revealed">
            <div className="ed-stage-header">
              <span className="ed-stage-month">STAGE 1 • AUGUST</span>
              <Unlock className="ed-icon-small" />
            </div>
            <h3 className="ed-stage-name">The Awakening</h3>
            <p className="ed-stage-desc">
              The first step of the journey. Establish your foundation and secure your spot for the next month.
            </p>

            {/* NEW: Round and Elimination Stats */}
            <div className="ed-stage-stats">
              <div className="ed-stat-item">
                <Layers size={18} className="ed-icon-yellow" />
                <span><strong>2 Rounds</strong> (Round 1 & Round 2)</span>
              </div>
              <div className="ed-stat-item">
                <UserMinus size={18} className="ed-icon-yellow" />
                <span><strong>4 Players</strong> Eliminated After Stage 1</span>
              </div>
            </div>
            
            <div className="ed-syllabus">
              <div className="ed-sem-box">
                <h4>3rd Semester</h4>
                <ul>
                  <li><Code2 size={16}/> Arrays</li>
                  <li><Code2 size={16}/> Mathematics</li>
                </ul>
              </div>
              <div className="ed-sem-box">
                <h4>5th Semester</h4>
                <ul>
                  <li><Code2 size={16}/> Arrays</li>
                  <li><Code2 size={16}/> Strings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stage 2: September (Locked) */}
          <div className="ed-stage-card locked">
            <div className="ed-stage-header">
              <span className="ed-stage-month">STAGE 2 • SEPTEMBER</span>
              <Lock className="ed-icon-small" />
            </div>
            <h3 className="ed-stage-name">Coming Soon</h3>
            <div className="ed-locked-content">
              <Lock size={40} className="ed-lock-icon" />
              <p>Topics will be revealed to the students who survive Stage 1.</p>
            </div>
          </div>

          {/* Stage 3: October (Locked) */}
          <div className="ed-stage-card locked">
            <div className="ed-stage-header">
              <span className="ed-stage-month">STAGE 3 • OCTOBER</span>
              <Lock className="ed-icon-small" />
            </div>
            <h3 className="ed-stage-name">Coming Soon</h3>
            <div className="ed-locked-content">
              <Lock size={40} className="ed-lock-icon" />
              <p>Topics will be revealed to the students who survive Stage 2.</p>
            </div>
          </div>

          {/* Stage 4: November (Locked) */}
          <div className="ed-stage-card locked">
            <div className="ed-stage-header">
              <span className="ed-stage-month">STAGE 4 • NOVEMBER</span>
              <Lock className="ed-icon-small" />
            </div>
            <h3 className="ed-stage-name">Coming Soon</h3>
            <div className="ed-locked-content">
              <Lock size={40} className="ed-lock-icon" />
              <p>The Grand Finale. Only the elite will unlock this stage.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Rules Section */}
      <section className="ed-rules">
        <div className="ed-rules-box">
          <div className="ed-rules-header">
            <ShieldAlert className="ed-icon yellow" />
            <h2>Important Directives</h2>
          </div>
          <ul className="ed-rules-list">
            <li><AlertCircle size={18}/> <strong>Eligibility:</strong> Strictly open to 3rd Semester and 5th Semester students only.</li>
            <li><AlertCircle size={18}/> <strong>Reporting:</strong> Participants must report to the venue before the contest timer begins.</li>
            <li><AlertCircle size={18}/> <strong>Platform:</strong> All coding rounds will be executed on the officially selected online coding platform.</li>
            <li><AlertCircle size={18}/> <strong>Integrity:</strong> Internet searching, plagiarism, or any unfair practices will result in immediate disqualification.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;