import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import CarPricePredictor from './components/CarPricePredictor';
import About from './components/About';
import Contact from './components/Contact';
import './components/Home.css';
import './components/Dashboard.css';
import './components/Contact.css';

// Dashboard Component
const Dashboard = ({ onLogout, onShowPredictor }) => {
  const userEmail = localStorage.getItem('userEmail') || 'User';
  const firstName = userEmail.split('@')[0];
  const navigate = useNavigate();
  
  // Sample recent activity data
  const recentActivity = [
    { id: 1, action: 'Logged in', time: 'Just now', icon: '🔒' },
    { id: 2, action: 'Viewed predictions', time: '2 hours ago', icon: '📊' },
    { id: 3, action: 'Updated profile', time: '1 day ago', icon: '👤' },
  ];
  
  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-greeting">
          <h1>Welcome back, <span className="highlight">{firstName}</span>! 👋</h1>
          <p className="subtitle">Here's what's happening with your account today</p>
        </div>
        <div className="user-avatar">
          {firstName.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card primary">
          <div className="card-icon">🚗</div>
          <h3>Car Price Prediction</h3>
          <p>Get accurate price estimates for any car model</p>
          <button onClick={onShowPredictor} className="action-button">
            Predict Now <span>→</span>
          </button>
        </div>

        <div className="dashboard-card secondary">
          <div className="card-icon">📊</div>
          <h3>Your Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Predictions</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3</div>
              <div className="stat-label">Saved</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <span className="activity-icon">{activity.icon}</span>
                <div className="activity-details">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card cta">
          <div className="cta-content">
            <h3>Need Help?</h3>
            <p>Our support team is here to help you with any questions</p>
            <button onClick={handleContactSupport} className="outline-button">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



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

  // Check for existing session on initial load and on route changes
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('isLoggedIn');
      const isAuthenticated = storedAuth ? JSON.parse(storedAuth) : false;
      if (isAuthenticated !== isLoggedIn) {
        setIsLoggedIn(isAuthenticated);
      }
    };
    
    // Check auth on initial load
    checkAuth();
    
    // Set up an interval to check auth state (in case of multiple tabs)
    const authCheckInterval = setInterval(checkAuth, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(authCheckInterval);
  }, [isLoggedIn]);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      setShowPredictor(false);
      // Ensure the login state is properly stored
      localStorage.setItem('isLoggedIn', JSON.stringify(status));
    } else {
      localStorage.removeItem('isLoggedIn');
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
                  <CarPricePredictor />
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
        <footer>
          <div className="footer-content">
            <nav className="footer-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </nav>
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
