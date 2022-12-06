import { Router } from "express";

import locations from "./locations";
import favorite from "./favorite";
import { checkJWTMiddleware } from "../../middleware/checkJWTMiddleware";

const router = Router();

router.use(checkJWTMiddleware, locations);
router.use(checkJWTMiddleware, favorite);

export default router;
