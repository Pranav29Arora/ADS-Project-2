# drivalyze - Car Price Prediction System

A machine learning-based car price prediction application that provides accurate ex-showroom price estimates for Indian car market.

## Features

- **AI-Powered Predictions**: Uses Random Forest Regressor trained on real market data
- **Comprehensive Dataset**: 400+ car configurations across 14 brands and 48 models
- **Year Support**: Predictions available for years 2019-2025
- **Dynamic Filtering**: Brand, model, fuel type, and transmission filters based on actual dataset
- **Modern UI**: Clean and responsive React frontend
- **RESTful API**: Flask backend with ML model integration

## Tech Stack

### Frontend
- React.js
- React Router
- CSS3

### Backend
- Python 3
- Flask
- scikit-learn (Random Forest Regressor)
- pandas
- numpy

## Project Structure

```
ADS - 2/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── train_model.py         # ML model training script
│   ├── data/
│   │   └── cars_data.csv      # Car dataset
│   ├── models/                # Trained model files
│   └── requirements.txt       # Python dependencies
└── drivalyze/
    ├── src/
    │   ├── components/        # React components
    │   └── App.js             # Main app component
    └── package.json           # Node dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Train the model:
```bash
python train_model.py
```

5. Run the server:
```bash
python app.py
```

The backend will start on `http://localhost:5001`

### Frontend Setup

1. Navigate to drivalyze directory:
```bash
cd drivalyze
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

- `GET /api/brands` - Get all available car brands
- `GET /api/models/<brand>` - Get models for a specific brand
- `GET /api/fuel-types/<brand>/<model>` - Get fuel types for brand-model combination
- `GET /api/years` - Get available years
- `GET /api/transmissions` - Get available transmission types
- `POST /predict` - Predict car price
  - Body: `{ "brand": "Hyundai", "model": "Creta", "year": 2023, "fuel_type": "Petrol", "transmission": "Manual" }`

## Model Performance

- Training R²: 0.9857
- Testing R²: 0.8913
- Training MAE: ₹78,238.99
- Testing MAE: ₹210,583.92

## Dataset

The dataset contains 403 car configurations with:
- 14 brands (Maruti Suzuki, Hyundai, Tata, Mahindra, Kia, Toyota, Honda, etc.)
- 48 models
- Years: 2019-2025
- Fuel types: Petrol, Diesel, CNG, Electric, Hybrid, Turbo
- Transmissions: Manual, Automatic

## License

This project is part of an academic assignment.

## Author

Pranav Arora
