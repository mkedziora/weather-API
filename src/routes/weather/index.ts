import { Router } from "express";

import { checkJWTMiddleware } from "../../middleware/checkJWTMiddleware";

const router = Router();
router.get("/weather", checkJWTMiddleware, (req, res) => {
  console.log("TODO");
});

export default router;
