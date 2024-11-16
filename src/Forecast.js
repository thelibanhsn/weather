import React from "react";

export default function Forecast({ forecast: { list } }) {
  const forecastArr = list.filter((val, i) => i < 5);

  let imageUrl;
  return (
    <div className="forecast-container">
      {forecastArr.map((value) => {
        return (
          <div className="forecast">
            <p>{value.dt_txt}</p>

            <img
              src={`https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
              alt="Tempreture condition"
            />
            <h3 className="forecast-temp">{value.main.temp} &deg;C</h3>
          </div>
        );
      })}
    </div>
  );
}
