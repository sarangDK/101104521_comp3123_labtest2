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
      <h1>Weather App</h1>
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
          <p>Temperature: {weatherData.list[0].main.temp} °C</p>
          <p>Humidity: {weatherData.list[0].main.humidity} %</p>
          <p>Condition: {weatherData.list[0].weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;