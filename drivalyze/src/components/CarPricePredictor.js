import React, { useState } from 'react';
import './CarPricePredictor.css';

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
    try {
      // In a real app, you would make an API call here
      // const response = await fetch('/api/predict', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      // For demo purposes, we'll simulate a response with realistic Indian car prices (in lakhs)
      setTimeout(() => {
        // Base price based on make (in lakhs)
        const basePrices = {
          'Toyota': 10,
          'Honda': 8,
          'Ford': 12,
          'BMW': 45,
          'Mercedes': 50,
          'Audi': 42,
          'Hyundai': 7,
          'Kia': 8
        };
        
        // Get base price or default to 15 lakhs if make not found
        const basePrice = basePrices[formData.make] || 15;
        
        // Add variation based on model, year, etc.
        const yearFactor = (formData.year - 2000) * 0.1; // Newer cars cost more
        const transmissionFactor = formData.transmission === 'automatic' ? 1.5 : 0;
        const fuelFactor = formData.fuelType === 'diesel' ? 1.2 : 1;
        
        // Calculate final price in lakhs
        const priceInLakhs = (basePrice + yearFactor + transmissionFactor) * fuelFactor;
        
        // Convert to actual rupees and round to nearest 1000
        const priceInRupees = Math.round(priceInLakhs * 100000 / 1000) * 1000;
        
        setPrediction(priceInRupees);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error predicting price:', error);
      setIsLoading(false);
    }
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
      <h1>Drivalyze</h1>
      <h2>Car Price Predictor</h2>
      
      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-group">
          <label htmlFor="make">Make:</label>
          <select 
            id="make" 
            name="make" 
            value={formData.make}
            onChange={handleChange}
            required
          >
            <option value="">Select Make</option>
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

        <div className="form-group">
          <label>Fuel Type:</label>
          <select 
            name="fuelType" 
            value={formData.fuelType}
            onChange={handleChange}
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
          <h3>Estimated Ex-Showroom Price:</h3>
          <div className="price">₹{prediction.toLocaleString('en-IN', {
            maximumFractionDigits: 0,
            style: 'currency',
            currency: 'INR'
          })}</div>
          <p className="disclaimer">
            This is an estimate based on the provided information. 
            Actual ex-showroom price may vary based on location, taxes, and other factors.
          </p>
        </div>
      )}
    </div>
  );
};

export default CarPricePredictor;
