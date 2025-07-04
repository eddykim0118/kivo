# Sales Forecasting Web Application

A modern web application for sales forecasting using machine learning models.

## Features

- Interactive dashboard with real-time metrics
- Multiple model support (XGBoost, LSTM, Prophet)
- Data upload and configuration
- Detailed performance analysis
- Beautiful and responsive UI

## Tech Stack

- React 18
- Tailwind CSS
- Recharts for data visualization
- Axios for API communication
- Lucide React for icons

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sales-forecasting-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_VERSION=1.0.0
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── DataUpload.js
│   │   ├── ModelConfig.js
│   │   ├── Results.js
│   │   ├── Navigation.js
│   │   └── Charts/
│   │       ├── ForecastChart.js
│   │       ├── PerformanceChart.js
│   │       └── ModelDistribution.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Development

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## API Integration

The application expects a backend API with the following endpoints:

- `POST /api/upload` - Upload CSV data
- `POST /api/forecast` - Start forecasting process
- `GET /api/results` - Get forecast results
- `GET /api/status` - Get forecast status
- `GET /api/metrics` - Get model metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 