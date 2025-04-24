import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function EmailRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get role and action from query params
  const query = new URLSearchParams(location.search);
  const role = query.get("role");
  const action = query.get("action");

  const goToLoginEmail = () => {
    navigate(`/login-email?role=${role}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Register the user
      const res = await axios.post(`http://localhost:3030/users`, {
        email,
        password,
        role,
      });
      console.log("User registered:", res.data);
      navigate("/home");
    } catch (err) {
      console.error(`${action} failed:`, err.response?.data || err.message);
      if (
        err.response?.data?.message.includes("email")
      ) {
        setError("Email already registered.");
      } else {
        setError("Failed to login or register. Please try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card} className="animate-fade-slide">
        <div style={styles.logo}>📧</div>
        <h1 style={styles.title}>Create Account as {role}</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            Create
          </button>
          <button style={styles.backButton} onClick={goToLoginEmail}>
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4vh 5vw",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px 16px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  logo: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#0077ff",
  },
  backButton: {
    marginTop: "10px",
    background: "none",
    color: "#007bff",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
    textDecoration: "underline",
    transition: "background 0.3s ease",
  },
  input: {
    width: "-webkit-fill-available",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "14px",
  },
  primaryButton: {
    width: "100%",
    padding: "14px",
    background: "#007bff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  error: {
    color: "red",
    marginBottom: "12px",
    fontSize: "14px",
  },
};
