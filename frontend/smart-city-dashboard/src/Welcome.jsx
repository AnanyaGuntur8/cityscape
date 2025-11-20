import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- import navigation
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    const handleMouseMove = (e) => {
      const { left, top, width, height } = overlay.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      overlay.style.setProperty("--shine-x", `${x}%`);
      overlay.style.setProperty("--shine-y", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const buildings = [
    "M0 400 L0 260 L80 260 L80 400 Z",
    "M95 400 L95 200 L160 200 L160 400 Z",
    "M175 400 L175 240 L250 240 L250 400 Z",
    "M265 400 L265 170 L340 170 L340 400 Z",
    "M355 400 L355 300 L420 300 L420 400 Z",
    "M435 400 L435 220 L520 220 L520 400 Z",
    "M540 400 L540 250 L610 250 L610 400 Z",
    "M625 400 L625 180 L710 180 L710 400 Z",
    "M725 400 L725 290 L800 290 L800 400 Z",
    "M815 400 L815 230 L900 230 L900 400 Z"
  ];

  return (
    <div className="welcome-container">
      <div className="blueprint-grid"></div>

      {/* Top Right Buttons */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          display: "flex",
          gap: "12px"
        }}
      >
        <button
          className="login-button"
          style={{
            padding: "10px 18px",
            border: "2px solid white",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
            backdropFilter: "blur(4px)"
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="signup-button"
          style={{
            padding: "10px 18px",
            border: "2px solid white",
            background: "white",
            color: "black",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600"
          }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>

      <div className="overlay">
        <h1 className="title">
          <span className="city">City</span>
          <span className="scape">Scape</span>
        </h1>
        <p className="subtitle">Welcome to your Smart City Dashboard</p>
      </div>

      <svg className="city-svg" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#glow)">
          {buildings.map((path, i) => (
            <path
              key={i}
              d={path}
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              className="draw-animation"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </g>

        <line x1="0" y1="400" x2="1000" y2="400" stroke="white" strokeWidth="3" />
      </svg>
    </div>
  );
}
