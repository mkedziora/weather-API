import { Router } from "express";

import token from "./token";

const router = Router();

router.use("/auth", token);

export default router;
