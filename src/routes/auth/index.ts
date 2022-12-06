import { Router } from "express";

import login from "./login";

const router = Router();

router.use("/auth", login);

export default router;
