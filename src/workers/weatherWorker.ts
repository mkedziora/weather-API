import { getAllCities, postWeather } from "../services/DB/databaseService";
import { getCurrentWeatherForLocation } from "../services/weatherService";

import { database } from "../services/DB/databaseService";

const postWeatherForEachCity = async () => {
  console.log("WORKER STARTED PROCESSING");
  const allCities = await getAllCities();
  allCities.map(async (city) => {
    const apiResponse = await getCurrentWeatherForLocation(city.coordinate);
    await postWeather({ apiResponse, city });
  });
  console.log("WORKER PROCESSING ENDED");
};

database
  .initialize()
  .then(() => {
    console.log("Data Source in worker has been initialized!");
    setInterval(postWeatherForEachCity, 60 * 60 * 1000);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization in worker:", err);
  });
