import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import CarPricePredictor from './components/CarPricePredictor';
import './components/Home.css';
import './components/Dashboard.css';

// Dashboard Component
const Dashboard = ({ onLogout, onShowPredictor }) => {
  const userEmail = localStorage.getItem('userEmail') || 'User';

  return (
    <div className="dashboard">
      <div className="welcome-container">
        <div className="welcome-content">
          <h1>Welcome back! 👋</h1>
          <p className="welcome-subtitle">
            Get accurate car price predictions powered by AI
          </p>
          <button onClick={onShowPredictor} className="predict-button">
            Predict Car Price
          </button>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="page-container">
    <h2>About drivalyze</h2>
    <p>We provide accurate car price predictions using advanced AI algorithms trained on real market data.</p>
  </div>
);

const Contact = () => (
  <div className="page-container">
    <h2>Contact Us</h2>
    <p>Have questions? Reach out to our team at contact@drivalyze.com</p>
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPredictor, setShowPredictor] = useState(false);

  // Check for existing session on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem('isLoggedIn');
    if (storedAuth) {
      setIsLoggedIn(JSON.parse(storedAuth));
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      setShowPredictor(false);
    }
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      // Handle logout
      setIsLoggedIn(false);
      setShowPredictor(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      // Redirect to home after logout
      window.location.href = '/';
    } else {
      // Navigate to login page instead of directly logging in
      window.location.href = '/login';
    }
  };

  const handleGetStarted = () => {
    handleAuth(); // This will log the user in
  };

  const handleShowPredictor = () => {
    setShowPredictor(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`App ${isLoggedIn ? 'dashboard-view' : ''}`}>
        <Navbar isLoggedIn={isLoggedIn} onAuthClick={handleAuth} />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                !isLoggedIn ? (
                  <Home isLoggedIn={isLoggedIn} onGetStarted={handleGetStarted} />
                ) : showPredictor ? (
                  <div className="predictor-container">
                    <h2>Car Price Prediction</h2>
                    <CarPricePredictor />
                  </div>
                ) : (
                  <Dashboard 
                    onLogout={handleAuth} 
                    onShowPredictor={handleShowPredictor} 
                  />
                )
              } 
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="glass-footer">
          <div className="footer-content">
            <div className="footer-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
            <div className="social-links">
              <a href="#twitter" aria-label="Twitter">🐦</a>
              <a href="#facebook" aria-label="Facebook">👍</a>
              <a href="#instagram" aria-label="Instagram">📷</a>
              <a href="#linkedin" aria-label="LinkedIn">💼</a>
            </div>
            <p className="copyright">
              &copy; 2025 drivalyze — Empowering Smart Automotive Decisions.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}


export default App;
