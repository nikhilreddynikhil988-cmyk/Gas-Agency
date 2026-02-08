import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center text-white"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(120deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-5 text-center"
        style={{
          maxWidth: "650px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <h1 className="fw-bold mb-3 text-dark">
          🔥 Gas Agency
        </h1>

        <p className="fs-5 text-secondary">
          A simple and secure platform to book gas cylinders, track orders,
          and manage your account with ease.
        </p>

        <div className="row text-start my-4">
          <div className="col-12 col-md-4 mb-3">
            ✅ Easy Booking
          </div>
          <div className="col-12 col-md-4 mb-3">
            🚚 Fast Delivery
          </div>
          <div className="col-12 col-md-4 mb-3">
            🔐 Secure Access
          </div>
        </div>

        <p className="mb-4 text-muted">
          Get started by creating an account or login to continue.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/register" className="btn btn-primary btn-lg px-4">
            Create Account
          </Link>
          <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
