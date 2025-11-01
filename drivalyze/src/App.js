import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './components/Home.css';
import './components/Dashboard.css';

// Dashboard Component
const Dashboard = ({ onLogout, onShowPredictor }) => {
  // Sample data for market trends
  const marketTrends = [
    { model: 'Hyundai Creta', change: '+2.5%', trend: 'up' },
    { model: 'Tata Nexon', change: '+1.8%', trend: 'up' },
    { model: 'Maruti Brezza', change: '-0.5%', trend: 'down' },
    { model: 'Kia Seltos', change: '+3.2%', trend: 'up' },
    { model: 'Toyota Fortuner', change: '-1.2%', trend: 'down' },
  ];

  // Sample recent searches
  const recentSearches = [
    { model: 'Hyundai Creta SX Diesel', price: '₹14.5 L', date: '2 hours ago' },
    { model: 'Maruti Brezza ZXI+', price: '₹9.8 L', date: '1 day ago' },
    { model: 'Tata Nexon XZ+', price: '₹11.2 L', date: '2 days ago' },
  ];

  // Popular models data
  const popularModels = [
    { name: 'Hyundai Creta', avgPrice: '₹14.5L - ₹16.5L', image: 'creta.jpg' },
    { name: 'Tata Nexon', avgPrice: '₹8.1L - ₹14.5L', image: 'nexon.jpg' },
    { name: 'Maruti Brezza', avgPrice: '₹8.3L - ₹14.1L', image: 'brezza.jpg' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-message">
          <h1>Welcome back, User! 👋</h1>
          <p>Here's what's happening with car prices today</p>
        </div>
        <button onClick={onShowPredictor} className="cta-primary">
          🚗 Predict New Car Price
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Market Trend</h3>
            <p className="stat-value up">+1.8%</p>
            <p className="stat-label">This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Your Predictions</h3>
            <p className="stat-value">12</p>
            <p className="stat-label">Total Predictions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <h3>Saved Vehicles</h3>
            <p className="stat-value">5</p>
            <p className="stat-label">In Your Garage</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card trending-card">
          <div className="card-header">
            <h3>🚀 Trending This Week</h3>
            <Link to="/trending" className="see-all">See All</Link>
          </div>
          <div className="trending-models">
            {popularModels.map((car, index) => (
              <div key={index} className="trending-model">
                <div className="car-image"></div>
                <div className="car-details">
                  <h4>{car.name}</h4>
                  <p className="price-range">{car.avgPrice}</p>
                  <button className="btn-outline">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <h3>📋 Recent Predictions</h3>
            <Link to="/predictions" className="see-all">View All</Link>
          </div>
          <ul className="prediction-list">
            {recentSearches.map((search, index) => (
              <li key={index} className="prediction-item">
                <div className="prediction-info">
                  <h4>{search.model}</h4>
                  <span className="prediction-date">{search.date}</span>
                </div>
                <div className="prediction-price">{search.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard-card market-trends">
        <div className="card-header">
          <h3>📊 Market Trends</h3>
          <div className="time-filters">
            <button className="time-filter active">1M</button>
            <button className="time-filter">3M</button>
            <button className="time-filter">6M</button>
            <button className="time-filter">1Y</button>
          </div>
        </div>
        <div className="trends-container">
          <div className="trend-chart">
            {/* Placeholder for chart */}
            <div className="chart-placeholder">
              <div className="chart-line"></div>
              <div className="chart-points">
                {[1, 2, 3, 4, 5, 6].map((point) => (
                  <div key={point} className="chart-point"></div>
                ))}
              </div>
            </div>
            <div className="chart-labels">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>
          <div className="trend-list">
            {marketTrends.map((trend, index) => (
              <div key={index} className="trend-item">
                <span className="model-name">{trend.model}</span>
                <span className={`trend-value ${trend.trend}`}>
                  {trend.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="page-container">
    <h2>About CarPricePredictor</h2>
    <p>We provide accurate car price predictions using advanced AI algorithms trained on real market data.</p>
  </div>
);

const Contact = () => (
  <div className="page-container">
    <h2>Contact Us</h2>
    <p>Have questions? Reach out to our team at contact@carpricepredictor.com</p>
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

  const handleAuth = () => {
    if (isLoggedIn) {
      // Handle logout
      setIsLoggedIn(false);
      setShowPredictor(false);
      localStorage.removeItem('isLoggedIn');
      // Redirect to home after logout
      window.location.href = '/';
    } else {
      // Handle login
      setIsLoggedIn(true);
      setShowPredictor(false);
      localStorage.setItem('isLoggedIn', 'true');
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
                  <Home onGetStarted={handleGetStarted} />
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
              &copy; 2025 CarPricePredictor — Empowering Smart Automotive Decisions.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

const CarPricePredictor = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    transmission: 'automatic',
    fuelType: 'petrol',
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockPrediction = Math.floor(Math.random() * 50000) + 10000;
      setPrediction(mockPrediction);
      setIsLoading(false);
    }, 1000);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const makes = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia'];
  const models = {
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot'],
    'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape'],
    'BMW': ['3 Series', '5 Series', 'X3', 'X5'],
    'Mercedes': ['C-Class', 'E-Class', 'GLC', 'GLE'],
    'Audi': ['A4', 'A6', 'Q5', 'Q7'],
    'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe'],
    'Kia': ['Forte', 'Optima', 'Sportage', 'Sorento']
  };

  return (
    <div className="predictor-container">
      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="make">Brand:</label>
            <select 
              id="make" 
              name="make" 
              value={formData.make}
              onChange={handleChange}
              required
            >
              <option value="">Select Brand</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <select 
              id="model" 
              name="model" 
              value={formData.model}
              onChange={handleChange}
              disabled={!formData.make}
              required
            >
              <option value="">Select Model</option>
              {formData.make && models[formData.make]?.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <select 
              id="year" 
              name="year" 
              value={formData.year}
              onChange={handleChange}
              required
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Transmission:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="transmission"
                  value="automatic"
                  checked={formData.transmission === 'automatic'}
                  onChange={handleChange}
                />
                Automatic
              </label>
              <label>
                <input
                  type="radio"
                  name="transmission"
                  value="manual"
                  checked={formData.transmission === 'manual'}
                  onChange={handleChange}
                />
                Manual
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Fuel Type:</label>
          <select 
            name="fuelType" 
            value={formData.fuelType}
            onChange={handleChange}
            className="fuel-type-select"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid</option>
            <option value="electric">Electric</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="predict-button">
          {isLoading ? 'Predicting...' : 'Predict Price'}
        </button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h3>Estimated Value:</h3>
          <div className="price">${prediction.toLocaleString()}</div>
          <p className="disclaimer">
            This is an estimate based on the provided information. 
            Actual market value may vary based on condition, location, and other factors.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
