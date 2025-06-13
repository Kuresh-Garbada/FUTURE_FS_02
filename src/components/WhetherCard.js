import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather, forecast }) => {
  if (!weather) return null;

  const { name, main, weather: details, wind } = weather;

 const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;


  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={getIconUrl(details[0].icon)} alt={details[0].description} />
      <p>{details[0].main} - {details[0].description}</p>
      <p className="temperature">{Math.round(main.temp)}°C</p>
      <div className="details">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>

      <h3 className="forecast-heading">5-Day Forecast</h3>
      <div className="forecast">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <img src={getIconUrl(item.weather[0].icon)} alt="icon" />
            <p>{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;  