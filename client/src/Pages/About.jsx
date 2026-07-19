import React from "react";
import { Brackets, Calculator, Link2, Layers, RefreshCcw, Cpu, Network } from "lucide-react";

const topics = [
  {
    name: "Arrays & Strings",
    tag: "Data Structure",
    bg: "rgba(97,218,251,0.12)",
    border: "rgba(97,218,251,0.25)",
    iconColor: "#61DAFB",
    icon: <Brackets color="#61DAFB" size={34} strokeWidth={1.5} />,
  },
  {
    name: "Mathematics",
    tag: "Algorithm",
    bg: "rgba(255,120,180,0.1)",
    border: "rgba(255,120,180,0.25)",
    iconColor: "#FF78B4",
    icon: <Calculator color="#FF78B4" size={34} strokeWidth={1.5} />,
  },
  {
    name: "Linked List",
    tag: "Data Structure",
    bg: "rgba(104,216,93,0.1)",
    border: "rgba(104,216,93,0.25)",
    iconColor: "#68D85D",
    icon: <Link2 color="#68D85D" size={34} strokeWidth={1.5} />,
  },
  {
    name: "Stack & Queue",
    tag: "Data Structure",
    bg: "rgba(255,195,0,0.1)",
    border: "rgba(255,195,0,0.25)",
    iconColor: "#FFC300",
    icon: <Layers color="#FFC300" size={34} strokeWidth={1.5} />,
  },
  {
    name: "Recursion",
    tag: "Algorithm",
    bg: "rgba(155,100,255,0.1)",
    border: "rgba(155,100,255,0.25)",
    iconColor: "#9B64FF",
    icon: <RefreshCcw color="#9B64FF" size={34} strokeWidth={1.5} />,
  },
  {
    name: "Bit Manipulation",
    tag: "Algorithm",
    bg: "rgba(0,200,255,0.1)",
    border: "rgba(0,200,255,0.25)",
    iconColor: "#00C8FF",
    icon: <Cpu color="#00C8FF" size={34} strokeWidth={1.5} />,
  },
  {
    name: "Trees",
    tag: "Data Structure",
    bg: "rgba(255,165,0,0.1)",
    border: "rgba(255,165,0,0.25)",
    iconColor: "#FFA500",
    icon: <Network color="#FFA500" size={34} strokeWidth={1.5} />,
  },
];

const particles = [
  { x: 15, y: 20, size: 3, delay: 0 },
  { x: 75, y: 70, size: 2, delay: 1.5 },
  { x: 45, y: 10, size: 4, delay: 3 },
  { x: 90, y: 40, size: 2, delay: 0.8 },
  { x: 30, y: 80, size: 3, delay: 2.2 },
  { x: 60, y: 55, size: 2, delay: 4 },
  { x: 8,  y: 60, size: 3, delay: 1 },
  { x: 85, y: 85, size: 2, delay: 3.5 },
];

const doubled = [...topics, ...topics];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');

  .df-root {
    padding: 80px 0;
    overflow: hidden;
    position: relative;
    min-height: 420px;
    background-color: #030303;
  }

  .df-particle {
    position: absolute;
    border-radius: 50%;
    background: #FFC300;
    opacity: 0;
    animation: dfParticleFade 6s infinite ease-in-out;
  }

  @keyframes dfParticleFade {
    0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
    50% { opacity: 0.18; transform: translateY(-30px) scale(1.3); }
  }

  .df-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,195,0,0.08);
    border: 1px solid rgba(255,195,0,0.25);
    color: #FFC300;
    font-family: 'Rajdhani', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 20px;
  }

  .df-label-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #FFC300;
    animation: dfPulse 1.8s infinite;
  }

  @keyframes dfPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,195,0,0.5); }
    50% { opacity: 0.7; box-shadow: 0 0 0 5px rgba(255,195,0,0); }
  }

  .df-fade-left {
    position: absolute;
    top: 0; bottom: 0; left: 0;
    width: 120px;
    background: linear-gradient(to right, #030303, transparent);
    z-index: 10;
    pointer-events: none;
  }

  .df-fade-right {
    position: absolute;
    top: 0; bottom: 0; right: 0;
    width: 120px;
    background: linear-gradient(to left, #030303, transparent);
    z-index: 10;
    pointer-events: none;
  }

  .df-track {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: dfScroll 28s linear infinite;
  }

  .df-track-outer:hover .df-track {
    animation-play-state: paused;
  }

  @keyframes dfScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .df-card {
    flex-shrink: 0;
    width: 180px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px;
    padding: 28px 20px 24px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(.23,1,.32,1),
                border-color 0.35s ease,
                box-shadow 0.35s ease,
                background 0.35s ease;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
  }

  .df-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255,195,0,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .df-card:hover::before { opacity: 1; }

  .df-card:hover {
    transform: translateY(-10px) scale(1.03);
    border-color: rgba(255,195,0,0.55);
    box-shadow: 0 0 28px rgba(255,195,0,0.18),
                0 0 6px rgba(255,195,0,0.1),
                0 20px 40px rgba(0,0,0,0.5);
    background: rgba(255,195,0,0.06);
  }

  .df-icon-wrap {
    width: 70px;
    height: 70px;
    border-radius: 18px;
    margin: 0 auto 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.35s ease;
  }

  .df-card:hover .df-icon-wrap {
    box-shadow: 0 0 20px rgba(255,195,0,0.25);
  }

  .df-topic-name {
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
    letter-spacing: 0.01em;
  }

  .df-topic-tag {
    font-size: 11px;
    color: rgba(255,195,0,0.6);
    font-weight: 400;
    letter-spacing: 0.05em;
  }

  .df-glow-ring {
    position: absolute;
    inset: -1px;
    border-radius: 21px;
    border: 1px solid transparent;
    background: linear-gradient(135deg, rgba(255,195,0,0.5), transparent 60%) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  .df-card:hover .df-glow-ring { opacity: 1; }
`;

export default function PopularTopics() {
  return (
    <>
      <style>{css}</style>

      <section className="df-root">

        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {particles.map((p, i) => (
            <div
              key={i}
              className="df-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52, position: "relative", zIndex: 2, padding: "0 24px" }}>
          <div className="df-label">
            <span className="df-label-dot" />
            Coding Contest 2026
          </div>
          <h2
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 14px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Popular <span style={{ color: "#FFC300" }}>Topics</span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 15,
              fontWeight: 300,
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Explore the core data structures and algorithms covered across the 4 stages of our department contest.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="df-fade-left" />
          <div className="df-fade-right" />
          <div className="df-track-outer" style={{ overflow: "hidden", padding: "24px 0 32px" }}>
            <div className="df-track">
              {doubled.map((topic, i) => (
                <div className="df-card" key={i}>
                  <div className="df-glow-ring" />
                  <div
                    className="df-icon-wrap"
                    style={{ background: topic.bg }}
                  >
                    {topic.icon}
                  </div>
                  <div className="df-topic-name">{topic.name}</div>
                  <div className="df-topic-tag">{topic.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}