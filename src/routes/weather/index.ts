import { Router } from "express";

import { checkJWTMiddleware } from "../../middleware/checkJWTMiddleware";
import { getUsernameFromToken } from "../../utils/getUsernameFromAuthorizationHeader";
import { getCurrentWeatherForEachFavoriteLocation } from "../../services/weatherService";
import { getUserByUsername } from "../../services/DB/databaseService";

const router = Router();
router.get("/weather", checkJWTMiddleware, async (req, res) => {
  try {
    const username = getUsernameFromToken(req);
    const user = await getUserByUsername(username);
    const result = await getCurrentWeatherForEachFavoriteLocation(user);
    res.status(200).send(result);
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
