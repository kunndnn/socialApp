import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            Social Media
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"></li>
              <li className="nav-item">
                <Link to="/signup" className="btn btn-primary ms-lg-3">
                  Sign up
                </Link>
                <Link to="/login" className="btn btn-primary ms-lg-3">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">Build Something Amazing 🚀</h1>
          <p className="lead mb-4">
            A modern React + Bootstrap landing page for your next project.
          </p>
          <Link to="/signup" className="btn btn-light btn-lg px-4">
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose Us?</h2>
            <p className="text-muted">Some cool reasons below 👇</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">⚡ Fast</h5>
                  <p className="card-text">
                    Lightning fast performance with Vite + React.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">🎨 Beautiful</h5>
                  <p className="card-text">Clean UI.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">🔒 Secure</h5>
                  <p className="card-text">
                    Built-in auth ready for production.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-3 mt-5 border rounded">
        <p className="mb-0">
          © {new Date().getFullYear()} Social Media. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
