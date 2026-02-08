import React from "react";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1d2671, #c33764)",
      }}
    >
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 fw-bold mb-3">
          🔥 Welcome to Gas Agency
        </h1>

        <p className="lead text-muted">
          Book your gas cylinders easily and securely from the comfort of your home.
        </p>

        <hr className="my-4" />

        <p className="mb-4">
          New here? Register now. Already a customer? Login to manage your bookings.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/register" className="btn btn-primary btn-lg px-4">
            Register
          </Link>
          <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
