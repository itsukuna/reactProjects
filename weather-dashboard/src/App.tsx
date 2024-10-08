import { useState } from "react";
import axios from "axios";

function App() {
  const API_KEY = process.env.API_Key;

  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForcatData] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(weatherResponse);
      setWeatherData(weatherResponse.data);

      const forcastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForcatData(forcastResponse.data.list);
    } catch (err) {
      setError("City not found. Please try another search.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-centre">Weather Dashboard</h1>
      <div className="inpur-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <div className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{weatherData.name}</h3>
            <p className="card-text">Temperature: {weatherData.main.temp}°C</p>
            <p className="card-text">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            <p className="card-text">
              Condition: {weatherData.weather[0].description}
            </p>
          </div>
        </div>
      )}
      {forecastData.length > 0 && (
        <div>
          <h3>5-Day Forecast</h3>
          <div className="row">
            {forecastData.map((forecast, index) => (
              <div key={index} className="col-md-2">
                <div className="card mb-3">
                  <div className="card-body">
                    <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
                    <p>Temp: {forecast.main.temp}°C</p>
                    <p>Humidity: {forecast.main.humidity}%</p>
                    <p>{forecast.weather[0].description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
