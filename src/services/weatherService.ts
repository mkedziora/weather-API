import fetch from "node-fetch";

import { Point } from "../models/point";
import { User } from "../models/user";
import { City } from "../models/city";
import { mockWeather } from "../utils/mocks/mockWeather";

const getCurrentWeatherForLocation = async (point: Point) => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (process.env.NODE_ENV === "local") mockWeather(point, apiKey);
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${point.latitude}&lon=${point.longitude}&appid=${apiKey}`
  );
};

const getCurrentWeatherForEachFavoriteLocation = async (user: User) => {
  if (!user.favoriteCities.length) return;
  return Promise.all(
    user.favoriteCities.map(async (city: City) => {
      const apiResponse = await getCurrentWeatherForLocation(city.coordinate);
      const jsonResponse = await apiResponse.json();
      const { weather } = jsonResponse;
      return {
        city: city.name,
        weather: weather || "Cannot get weather for this location",
      };
    })
  );
};

export { getCurrentWeatherForEachFavoriteLocation };
