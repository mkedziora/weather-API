import { Router } from "express";
import { get } from "lodash";

import { BadRequest } from "../../../utils/errors";
import {
  getCityById,
  postUserFavoriteCity,
} from "../../../services/DB/databaseService";
import { getUsernameFromToken } from "../../../utils/getUsernameFromAuthorizationHeader";

const router = Router();

router.post("/location/:locationId/favorite", async (req, res) => {
  try {
    const locationId = get(req, "params.locationId");
    if (!locationId) throw new BadRequest("Location ID is missing");
    const city = await getCityById(locationId);
    if (!city) throw new BadRequest("Location with a given ID not found", 404);

    const username = getUsernameFromToken(req);

    const result = await postUserFavoriteCity(username, locationId);

    res.status(201).send({
      message: "Favorite location added successfully",
      user: result.username,
      favoriteCities: result.favoriteCities,
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
