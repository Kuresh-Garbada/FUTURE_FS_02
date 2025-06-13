import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css';

const API_KEY = "69fd460b90650c82a66859a650ebef3c"; // Replace with your OpenWeather API key

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          units: 'metric',
          appid: API_KEY,
        },
      });
      const forecastData = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: city,
          units: 'metric',
          appid: API_KEY,
        },
      });
      setWeather(response.data);
      setForecast(forecastData.data.list.slice(0, 5));
      setError('');
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
        },
      });
      const forecastData = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
        },
      });
      setWeather(response.data);
      setForecast(forecastData.data.list.slice(0, 5));
    } catch (err) {
      console.error("Error fetching weather by location", err);
    }
  };

  return (
    <div className="app-container dark">
      <div className="weather-box">
        <h1 className="heading">🌤️ Weather Dashboard</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input-box"
        />
        <button
          onClick={fetchWeather}
          className="search-button"
        >
          Get Weather
        </button>
        {error && <p className="error">{error}</p>}
        <WeatherCard weather={weather} forecast={forecast} />
      </div>
    </div>
  );
};

export default App;