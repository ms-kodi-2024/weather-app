import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = (city) => {

    setLoading(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b443d8c18166583bc3da17030bd568b&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('ERROR!');
        }
      })
      .then(data => {
        setWeather({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        });
        setError(false);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setError(true);
        setWeather(null);
        setLoading(false);
      });
  };

  return (
    <section>
      <PickCity onSearch={handleCityChange} />
      {loading && <Loader />}
      {weather && <WeatherSummary {...weather} />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;