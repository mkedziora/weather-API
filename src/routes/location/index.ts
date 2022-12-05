import { Router } from "express";

import locations from "./locations";
import favorite from "./favorite";

const router = Router();

router.use(locations);
router.use(favorite);

export default router;
