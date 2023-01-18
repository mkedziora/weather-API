import { Router } from "express";

import { getUsernameFromToken } from "../../../utils/getUsernameFromAuthorizationHeader";
import {
  getAllCities,
  getUserByUsername,
} from "../../../services/DB/databaseService";

const router = Router();

router.get("/locations", async (req, res) => {
  try {
    const result = await getAllCities();
    res.status(200).send({
      cities_availavle: result,
    });
  } catch (error) {
    const response = {
      code: error.code || 500,
      message: error.message || "Something went wrong",
      type: error.type || "UnknownError",
    };
    console.error("Login error", { error });
    res.status(error.code || 500).send(response);
  }
});

router.get("/favorite-locations", async (req, res) => {
  try {
    const username = getUsernameFromToken(req);
    const result = await getUserByUsername(username);
    res.status(200).send({
      user: result.username,
      locations: result.favoriteCities,
    });
  } catch (error) {
    const response = {
      code: error.code || 500,
      message: error.message || "Something went wrong",
      type: error.type || "UnknownError",
    };
    console.error("Login error", { error });
    res.status(error.code || 500).send(response);
  }
});

export default router;
