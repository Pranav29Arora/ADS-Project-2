import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
        <h2>Why Choose drivalyze?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>AI-Driven Insights</h3>
            <p>Our models learn from real market data to provide accurate and reliable car price predictions.</p>
          </div>
          <div className="feature-card">
            <h3>Instant Results</h3>
            <p>No waiting, no forms — get your estimated price in real time.</p>
          </div>
          <div className="feature-card">
            <h3>Market Transparency</h3>
            <p>Know the fair price before you negotiate with dealers or buyers.</p>
          </div>
          <div className="feature-card">
            <h3>User-Friendly Interface</h3>
            <p>Simple, intuitive, and works perfectly on any device.</p>
          </div>
        </div>
        <p className="about-conclusion">
          Whether you're buying your first car or selling your old one, drivalyze gives you <strong>confidence and clarity</strong> in every decision.
        </p>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Select Car Details</h3>
            <p>Choose the car's brand, model, fuel type, and transmission.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Predict Price</h3>
            <p>Click "Predict", and our system instantly analyzes market data.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Instant Estimate</h3>
            <p>View your car's predicted market price, along with insights and trends.</p>
          </div>
        </div>
        <p className="tagline">It's that easy — no logins, no confusion, just <strong>clear, data-driven predictions</strong>.</p>
      </section>
    </div>
  );
};

export default About;
