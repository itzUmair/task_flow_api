import { Router } from "express";
import { home, signup, signin } from "../controllers/controllers.js";

const router = Router();

router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/signin").post(signin);

export default router;
