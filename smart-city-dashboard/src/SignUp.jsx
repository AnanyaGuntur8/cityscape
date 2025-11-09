import React, { useState } from "react";
import "./SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up:", { email, password });
  };

  return (
    <div className="signup-container">

      <div className="signup-left">
        <div className="signup-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>

      <div className="signup-right">
        <svg className="city-svg-signup" viewBox="0 0 600 400">
          <g className="city-lines-signup">
            <path d="M0,400 L0,300 L40,300 L40,400 Z" />
            <path d="M60,400 L60,250 L100,250 L100,400 Z" />
            <path d="M120,400 L120,200 L160,200 L160,400 Z" />
            <path d="M180,400 L180,320 L220,320 L220,400 Z" />
            <path d="M240,400 L240,180 L280,180 L280,400 Z" />
            <path d="M300,400 L300,240 L340,240 L340,400 Z" />
          </g>
        </svg>
      </div>

    </div>
  );
}
