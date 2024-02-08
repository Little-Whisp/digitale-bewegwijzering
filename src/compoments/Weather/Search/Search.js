import { useEffect } from 'react';
import { fetchWeatherByCoordinates } from '../../../api/OpenWeatherService';

const Search = ({ onSearchChange }) => {
  useEffect(() => {
    const loadWeatherForBreda = async () => {
      // Coordinates for Breda
      const latitude = 51.5863;
      const longitude = 4.7697;

      // Fetch weather for Breda
      try {
        const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
        // Trigger the callback with weather data
        onSearchChange(weatherData);
      } catch (error) {
        // Handle error if needed
      }
    };

    loadWeatherForBreda();
  }, [onSearchChange]);

  // Render nothing, as we don't need a search bar
  return null;
};

export default Search;
