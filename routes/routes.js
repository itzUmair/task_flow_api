import { Router } from "express";
import {
  home,
  verifyToken,
  signup,
  signin,
  getUserDetails,
  createTeam,
  createTask,
} from "../controllers/controllers.js";

const router = Router();

router.route("/").get(home);
router.route("/verifytoken").get(verifyToken);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/userdetails").get(getUserDetails);
router.route("/createteam").post(createTeam);
router.route("/task/create").put(createTask);

export default router;
