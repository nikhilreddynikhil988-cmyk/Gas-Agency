import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState('user');
  const { register, user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password, role);
      // If an admin created this user, stay on page and show success
      if (currentUser && currentUser.role === 'admin') {
        setSuccess('User created successfully');
        setName('');
        setEmail('');
        setPassword('');
        setRole('user');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
      console.log(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #8360c3, #2ebf91)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <h3 className="text-center mb-3 fw-bold">📝 Register</h3>
        <p className="text-center text-muted mb-4">
          Create your account to get started
        </p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill px-3"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill px-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill px-3"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Admins can create other admins */}
          {currentUser && currentUser.role === 'admin' && (
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAdmin"
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.checked ? 'admin' : 'user')}
              />
              <label className="form-check-label" htmlFor="isAdmin">
                Create as admin
              </label>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100 rounded-pill py-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
