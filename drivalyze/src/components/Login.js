import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Create floating particles
  useEffect(() => {
    const loginContainer = document.querySelector('.login-container');
    if (!loginContainer) return;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration between 10s and 20s
      const duration = Math.random() * 10 + 10;
      particle.style.setProperty('--duration', `${duration}s`);
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Add to container
      loginContainer.appendChild(particle);
      
      // Remove after animation completes
      setTimeout(() => {
        if (particle && particle.parentNode === loginContainer) {
          particle.remove();
        }
      }, duration * 1000);
    };

    // Create initial particles
    let timeouts = [];
    for (let i = 0; i < 15; i++) {
      const timeout = setTimeout(createParticle, i * 1000);
      timeouts.push(timeout);
    }
    
    // Create new particles periodically
    const interval = setInterval(createParticle, 2000);
    
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - in real app, this would be an actual API call
      setTimeout(() => {
        // For demo purposes, accept any email/password combination
        // In production, you would verify credentials with backend
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Notify parent component about successful login
        if (onLogin) {
          onLogin(true);
        }
        
        // Navigate to home page
        navigate('/');
      }, 500);
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to drivalyze</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <i><FaUser /></i>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <i><FaLock /></i>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            <span>Sign In</span>
            <FaArrowRight className="button-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

