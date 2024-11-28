import React, { useState } from "react";
import axios from "axios";
import "../css/WeatherComponent.css";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "1978c77b2113d22997ee86becf28d3ab"; 

  const fetchWeather = async () => {
    if (!city) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError(""); 
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather data.");
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="container">
      <h1>Welcome!</h1>
      <h1>Dakyung's Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.city.name}, {weatherData.city.country}</h2>
          <p><strong>Temperature:</strong> {weatherData.list[0].main.temp} °C</p>
          <p><strong>Humidity:</strong> {weatherData.list[0].main.humidity} %</p>
          <p><strong>Condition:</strong> {weatherData.list[0].weather[0].description}</p>
          <p><strong>Wind Speed:</strong> {weatherData.list[0].wind.speed} m/s</p>
          <p><strong>Pressure:</strong> {weatherData.list[0].main.pressure} hPa</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <h3>3-Hour Forecast for the Next 24 Hours</h3>
          <div className="forecast">
            {weatherData.list.slice(0, 8).map((forecast, index) => (
              <div key={index} className="forecast-item">
                <p><strong>Time:</strong> {new Date(forecast.dt * 1000).toLocaleTimeString()}</p>
                <p><strong>Temp:</strong> {forecast.main.temp} °C</p>
                <p><strong>Condition:</strong> {forecast.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;