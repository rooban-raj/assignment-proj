import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import weatherIcon from "./image/weather.png";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = (input) => {
    const options = {
      method: "GET",
      url: "http://api.weatherapi.com/v1/current.json",
      params: {
        q: input ? input : "Mumbai",
        key: "973ba260356145cbbf8135721232203",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="outer-container p-4">
      <h2>Weather App</h2>
      <div className="inputRow">
        <input
          type={"text"}
          placeholder="Please enter city, country"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          as="input"
          type="submit"
          value="Submit"
          className="button-design"
          onClick={() => getWeatherData(inputValue)}
        />
      </div>
      <div className="col-md-12 cont">
        <div className="row">
          <div className="col-md-12">
            <span className="city">
              {weather?.location?.name} , {weather?.location?.country}, Weather
            </span>
            <span className="time">
              As of time{" "}
              {moment(weather?.location?.localtime).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </span>
            <span className="temp">
              <b>{weather?.current?.temp_c} deg</b>
              <div className="imgRow">
                <img src={weatherIcon} alt="Loading" className="image" />
                <span className="imgText">
                  {weather?.current?.condition?.text}
                </span>
              </div>
            </span>
            <span className="time">{weather?.current?.condition?.text}</span>
          </div>
        </div>
      </div>
      <div className="col-md-12 p-3">
        <div className="row">
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Temperature</b>
              </span>
              <span className="end">{weather?.current?.temp_c}</span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Wind</b>
              </span>
              <span className="end">{weather?.current?.wind_kph} km/hr</span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Humidity</b>
              </span>
              <span className="end">{weather?.current?.humidity} %</span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Wind</b>
              </span>
              <span className="end">{weather?.current?.wind_degree} deg</span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Pressure</b>
              </span>
              <span className="end">
                {weather?.current?.pressure_in} millibars
              </span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Gust</b>
              </span>
              <span className="end">{weather?.current?.gust_kph} km/hr</span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Visibility</b>
              </span>
              <span className="end">{weather?.current?.vis_km} km</span>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="pb-3 h-50 head">
              <span className="start">
                <b>Precipiation</b>
              </span>
              <span className="end">{weather?.current?.precip_mm} mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
