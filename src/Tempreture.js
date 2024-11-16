import React from "react";

export default function Tempreture({ weatherData }) {
  const { temp, temp_min, temp_max } = weatherData.main;
  const [{ icon, description }] = weatherData.weather;

  const locationDate = new Date(
    weatherData.dt * 1000 - weatherData.timezone * 1000
  );
  const formattedDate = locationDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const url = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <main className="main">
      <div className="location">
        <h3>{weatherData.name}</h3>
        <h4>{formattedDate}</h4>
      </div>
      <div className="temp">
        <h4>
          Low: <br /> {temp_min} &deg;C
        </h4>
        <h1 className="temp-value">{temp} &deg;C</h1>
        <h4>
          High: <br />
          {temp_max} &deg;C
        </h4>
      </div>
      <div className="condition">
        <h3>Feels like: {description}</h3>
        <img src={url} alt="Tempreture condition" />
      </div>
    </main>
  );
}

