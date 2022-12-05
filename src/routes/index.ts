import { Router } from "express";

import auth from "./auth";
import location from "./location";
import weather from "./weather";

const router: Router = Router();

router.use(auth);
router.use(location);
router.use(weather);

export default router;
