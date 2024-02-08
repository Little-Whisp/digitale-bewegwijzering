import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, SvgIcon } from '@mui/material';
import WeeklyForecast from './WeeklyForecast/WeeklyForecast';
import TodayWeather from './TodayWeather/TodayWeather';
import { fetchWeatherByCoordinates } from '../../api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
import UTCDatetime from './Reusable/UTCDatetime';
import LoadingBox from './Reusable/LoadingBox';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import ErrorBox from './Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import { getTodayForecastWeather, getWeekForecastWeather } from './utilities/DataUtils';

function Weather() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherForBreda = async () => {
      setIsLoading(true);
      setError(false);
    
      // Coordinates for Breda
      const latitude = 51.5863;
      const longitude = 4.7697;
    
      try {
        const [weatherResponse, forecastResponse] = await fetchWeatherByCoordinates(latitude, longitude);
        console.log('Weather Response:', weatherResponse);
        console.log('Forecast Response:', forecastResponse);
    
        // Ensure both weather and forecast responses are valid
        if (!weatherResponse || !forecastResponse) {
          setError(true);
          return;
        }
    
        const currentDate = transformDateFormat(); // Assuming this function returns today's date in the correct format
        const dt_now = Math.floor(new Date().getTime() / 1000); // Current Unix timestamp
  
        // Process forecast data for today and the week
        const all_today_forecasts_list = getTodayForecastWeather(forecastResponse, currentDate, dt_now);
        const all_week_forecasts_list = getWeekForecastWeather(forecastResponse, ALL_DESCRIPTIONS);
  
        // Set weather and forecast data to state
        setTodayWeather({ city: 'Breda', ...weatherResponse });
        setTodayForecast([...all_today_forecasts_list]);
        setWeekForecast({ city: 'Breda', list: all_week_forecasts_list });
      } catch (error) {
        setError(true);
        console.error('Error fetching weather data:', error);
      }
    
      setIsLoading(false);
    };
    
    fetchWeatherForBreda();
  }, []);
  
  

  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: '100px', sm: '120px', md: '140px' } }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '12px', sm: '14px' },
          color: 'rgba(255,255,255, .85)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          margin: '2rem 0',
          maxWidth: '80%',
          lineHeight: '22px',
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '500px',
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, .8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '2rem',
        }}
      >
        {appContent}
        <UTCDatetime />
      </Box>
    </Container>
  );
}

export default Weather;
