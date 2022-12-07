import nock from "nock";

import { Point } from "../../models/point";

const mockWeather = (point: Point, apiKey: string) => {
  nock("https://api.openweathermap.org")
    .get(
      `/data/2.5/weather?lat=${point.latitude}&lon=${point.longitude}&appid=${apiKey}`
    )
    .reply(200, mockWeatherResponse);
};

const mockWeatherResponse = {
  coord: { lon: 19.456, lat: 51.7592 },
  weather: [{ id: 701, main: "Mist", description: "mist", icon: "50n" }],
  base: "stations",
  main: {
    temp: 274.09,
    feels_like: 268.58,
    temp_min: 273.55,
    temp_max: 274.59,
    pressure: 1006,
    humidity: 96,
  },
  visibility: 5000,
  wind: { speed: 6.69, deg: 230 },
  clouds: { all: 75 },
  dt: 1670430261,
  sys: {
    type: 2,
    id: 19430,
    country: "PL",
    sunrise: 1670394865,
    sunset: 1670423580,
  },
  timezone: 3600,
  id: 3093133,
  name: "Łódź",
  cod: 200,
};

export { mockWeather };
