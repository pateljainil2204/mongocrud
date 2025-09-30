import { Router } from "express";
import taskRoute from "../route/index.js"
import authRoute from "../route/auth.js"

const router = Router();

router.use("/auth", authRoute);
router.use("/tasks", taskRoute);

export default router;