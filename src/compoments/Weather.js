import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Weather.css';


const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Breda&appid=0f60c0cdad2be902e5a43c601ea5701c')
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Fout bij het ophalen van weerbericht:', error);
      });
  }, []);

  return (
    <div>
      {weather && (
        <div>
          <h2>Weerbericht voor Breda</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperatuur: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
