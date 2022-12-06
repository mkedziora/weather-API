import { Router } from "express";
import { get } from "lodash";

import { InvalidBasicToken } from "../../../utils/errors";
import { generateUserToken } from "../../../services/authService";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const encodedToken = get(req, "headers.authorization", "").split(" ")[1];
    if (!encodedToken) {
      console.error("Basic token not present");
      res
        .status(401)
        .send(new InvalidBasicToken("Basic token not present in the request."));
      return;
    }
    const generatedToken = await generateUserToken(encodedToken);
    console.log("Token returned successfully");
    res.status(200).send({
      access_token: generatedToken,
      token_type: "Bearer",
    });
  } catch (error) {
    const response = {
      code: error.code || 403,
      message: error.message || "Invalid Basic Token",
      type: error.type || "InvalidBasicTokenError",
    };
    console.error("Login error", { error });
    res.status(error.code || 403).send(response);
  }
});

export default router;
