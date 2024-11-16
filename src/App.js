import { useEffect, useState } from "react";
import "./styles.css";
import Header from "./Header";
import Tempreture from "./Tempreture";
import Forecast from "./Forecast";
import Footer from "./Footer";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [forecast, setForecast] = useState();
  const [error, setError] = useState(false);
  let latitude;
  let longtitude;
  let geoUrl;

  const apiKey = "ff2a6a389f2b7eeb38619429da46977d";

  const geoApi =
    "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=";
  const weatherApi =
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=";

  function clickHandler(e) {
    e.preventDefault();
    setSubmitValue(inputValue);
  }
  useEffect(() => {
    if (inputValue != "") {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          latitude = data[0].lat;
          longtitude = data[0].lon;
          setError(false);

          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=metric`
          )
            .then((res) => res.json())
            .then((weaData) => setWeatherData(weaData));

          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longtitude}&appid=${apiKey}&units=metric`
          )
            .then((res) => res.json())
            .then((foreC) => setForecast(foreC));
        })
        .catch((err) => {
          setError(true);
          setWeatherData("");
          setForecast("");
        });
    }

    setInputValue("");
  }, [submitValue]);

  return (
    <div className="App">
      <Header />
      <form onSubmit={clickHandler} className="form">
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter location name"
          className="input"
        />
        <button
          className="btn"
          type="submit"
          disabled={inputValue.length == 0 ? true : false}
        >
          Search
        </button>
      </form>
      {error && <h3 className="error">Something went wrong...</h3>}
      {weatherData && <Tempreture weatherData={weatherData} />}
      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
}
