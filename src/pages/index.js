import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [displayedDate, setDisplayedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch Weather data
        const weatherResponse = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=51.42&longitude=-0.11&current=temperature_2m,precipitation,rain,showers,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,rain,showers,wind_speed_10m&timezone=Europe%2FLondon"
        );
        setWeatherData(weatherResponse.data);
        const currentDateObj = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDateObj);
        setDisplayedDate(formattedDate);
        setCurrentDate(currentDateObj);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (weatherData) {
      const currentHour = parseInt(weatherData.hourly.time[0].split("T")[1].split(":")[0]);
      if (currentHour === 23) {
        const currentDateIndex = weatherData.hourly.time.findIndex(time => time.split("T")[1] === "23:00");
        const nextDateIndex = currentDateIndex + 1;
        if (nextDateIndex < weatherData.hourly.time.length) {
          const nextDay = new Date(weatherData.hourly.time[nextDateIndex].split("T")[0]);
          const options = { weekday: 'long' };
          const nextDayName = new Intl.DateTimeFormat('en-US', options).format(nextDay);
          setDisplayedDate(nextDayName);
        }
      }
    }
  }, [weatherData]);

  return (
    <div style={{ background: "#f0f0f0", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {weatherData && (
        <div style={{ width: "100%", maxWidth: "1200px", fontSize: "20px", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
            Today: {displayedDate}
          </h1>
          <p>Current Temperature: {weatherData.current.temperature_2m}°C</p>
          <p>Precipitation: {weatherData.current.precipitation}</p>
          <p>Rain: {weatherData.current.rain}</p>
          <p>Showers: {weatherData.current.showers}</p>
          <p>Wind Speed: {weatherData.current.wind_speed_10m} km/h</p>
          <h2>Hourly Forecast:</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {weatherData.hourly.time.map((time, index) => (
              <div key={index} style={{ width: "calc(20% - 10px)", margin: "5px", border: "1px solid #ccc", padding: "10px" }}>
                <p>{new Date(time).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p>Time: {time.split("T")[1]}</p>
                <p>Temperature: {weatherData.hourly.temperature_2m[index]}°C</p>
                <p>Apparent Temperature: {weatherData.hourly.apparent_temperature[index]}°C</p>
                <p>Precipitation Probability: {weatherData.hourly.precipitation_probability[index]}</p>
                <p>Rain: {weatherData.hourly.rain[index]}</p>
                <p>Showers: {weatherData.hourly.showers[index]}</p>
                <p>Wind Speed: {weatherData.hourly.wind_speed_10m[index]} km/h</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherData;
