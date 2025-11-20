import React, { useState } from "react";
import { Link } from "react-router-dom"; // <-- IMPORTANT
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.detail || "Login failed");
      return;
    }

    const data = await res.json();
    console.log("Login response:", data);

    // Save JWT token for later use
    localStorage.setItem("access_token", data.access_token);

    alert("Logged in!");
    // later: navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Network or server error during login");
  }
};

  return (
    <div className="login-container">
      {/* Left: Form */}
      <div className="login-left">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link> {/* <-- Real routing link */}
          </p>
        </div>
      </div>

      {/* Right: Glass City SVG */}
      <div className="login-right">
        <svg className="city-svg-login" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <g className="city-lines-login">
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
