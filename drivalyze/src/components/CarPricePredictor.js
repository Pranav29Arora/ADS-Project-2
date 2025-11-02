import React, { useState, useEffect } from 'react';
import './CarPricePredictor.css';

const API_BASE_URL = 'http://localhost:5001';

const CarPricePredictor = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    fuel_type: '',
    transmission: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableFuelTypes, setAvailableFuelTypes] = useState([]);
  const [availableTransmissions, setAvailableTransmissions] = useState([]);

  // Fetch available brands, years, and transmissions from dataset on component mount
  useEffect(() => {
    const fetchDatasetOptions = async () => {
      try {
        // Fetch brands
        const brandsResponse = await fetch(`${API_BASE_URL}/api/brands`);
        if (!brandsResponse.ok) throw new Error('Failed to fetch brands');
        const brandsData = await brandsResponse.json();
        setAvailableBrands(brandsData.brands || []);

        // Fetch years
        const yearsResponse = await fetch(`${API_BASE_URL}/api/years`);
        if (yearsResponse.ok) {
          const yearsData = await yearsResponse.json();
          setAvailableYears(yearsData.years || []);
        }

        // Fetch transmissions
        const transmissionResponse = await fetch(`${API_BASE_URL}/api/transmissions`);
        if (transmissionResponse.ok) {
          const transmissionData = await transmissionResponse.json();
          setAvailableTransmissions(transmissionData.transmissions || []);
        }
      } catch (err) {
        console.error('Error fetching dataset options:', err);
        setError('Failed to load data. Please make sure the backend server is running.');
      }
    };
    fetchDatasetOptions();
  }, []);

  // Fetch models when brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!formData.brand) {
        setAvailableModels([]);
        setFormData(prev => ({ ...prev, model: '', fuel_type: '' }));
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/models/${encodeURIComponent(formData.brand)}`);
        if (!response.ok) throw new Error('Failed to fetch models');
        const data = await response.json();
        const models = data.models || [];
        setAvailableModels(models);
        
        // Reset model and fuel_type selection if the current model is not in the new list
        if (formData.model && !models.includes(formData.model)) {
          setFormData(prev => ({ ...prev, model: '', fuel_type: '' }));
        }
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to load car models. Please try again.');
        setAvailableModels([]);
      }
    };
    fetchModels();
  }, [formData.brand]);

  // Fetch fuel types when brand and model are selected
  useEffect(() => {
    const fetchFuelTypes = async () => {
      if (!formData.brand || !formData.model) {
        setAvailableFuelTypes([]);
        setFormData(prev => ({ ...prev, fuel_type: '' }));
        return;
      }
      
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/fuel-types/${encodeURIComponent(formData.brand)}/${encodeURIComponent(formData.model)}`
        );
        if (!response.ok) throw new Error('Failed to fetch fuel types');
        const data = await response.json();
        const fuelTypes = data.fuel_types || [];
        setAvailableFuelTypes(fuelTypes);
        
        // Reset fuel_type selection if the current fuel_type is not in the new list
        if (formData.fuel_type && !fuelTypes.includes(formData.fuel_type)) {
          setFormData(prev => ({ ...prev, fuel_type: '' }));
        }
      } catch (err) {
        console.error('Error fetching fuel types:', err);
        setError('Failed to load fuel types. Please try again.');
        setAvailableFuelTypes([]);
      }
    };
    fetchFuelTypes();
  }, [formData.brand, formData.model]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'brand') {
      // When brand changes, reset model and fuel_type
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        model: '',
        fuel_type: ''
      }));
    } else if (name === 'model') {
      // When model changes, reset fuel_type
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
        fuel_type: ''
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPrediction(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: formData.brand,
          model: formData.model,
          year: parseInt(formData.year),
          fuel_type: formData.fuel_type,
          transmission: formData.transmission
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get prediction');
      }
      
      const data = await response.json();
      setPrediction(data.predicted_price);
      
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to get price prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    if (!price) return '';
    const formattedNumber = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price);
    return `₹${formattedNumber}`;
  };

  const isFormValid = formData.brand && formData.model && formData.year && formData.fuel_type && formData.transmission;

  return (
    <div className="predictor-container">
      <h1>Car Price Predictor</h1>
      <p className="subtitle">Get Ex-Showroom Price Estimate</p>
      
      <form onSubmit={handleSubmit} className="prediction-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <select 
            id="brand" 
            name="brand" 
            value={formData.brand}
            onChange={handleChange}
            required
            disabled={isLoading || availableBrands.length === 0}
          >
            <option value="">Select Brand</option>
            {availableBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
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
            required
            disabled={!formData.brand || isLoading || availableModels.length === 0}
          >
            <option value="">Select Model</option>
            {availableModels.map(model => (
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
            disabled={isLoading || availableYears.length === 0}
          >
            <option value="">Select Year</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="fuel_type">Fuel Type:</label>
          <select 
            id="fuel_type" 
            name="fuel_type" 
            value={formData.fuel_type}
            onChange={handleChange}
            required
            disabled={!formData.brand || !formData.model || isLoading || availableFuelTypes.length === 0}
          >
            <option value="">Select Fuel Type</option>
            {availableFuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="transmission">Transmission:</label>
          <select 
            id="transmission" 
            name="transmission" 
            value={formData.transmission}
            onChange={handleChange}
            required
            disabled={isLoading || availableTransmissions.length === 0}
          >
            <option value="">Select Transmission</option>
            {availableTransmissions.map(transmission => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className="predict-button"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? 'Predicting...' : 'Get Ex-Showroom Price'}
        </button>
      </form>
      
      {prediction && (
        <div className="prediction-result">
          <div className="price">{formatPrice(prediction)}</div>
        </div>
      )}
    </div>
  );
};

export default CarPricePredictor;
