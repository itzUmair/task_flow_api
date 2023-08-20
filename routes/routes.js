import { Router } from "express";
import {
  home,
  verifyToken,
  signup,
  signin,
  getUserDetails,
  createTeam,
  createTask,
  getAllTeamTasks,
  addTeamMembers,
} from "../controllers/controllers.js";

const router = Router();

router.route("/").get(home);
router.route("/verifytoken").get(verifyToken);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/userdetails").get(getUserDetails);
router.route("/createteam").post(createTeam);
router.route("/task/create").put(createTask);
router.route("/tasks/all/:teamID").get(getAllTeamTasks);
router.route("/team/add/member").post(addTeamMembers);

export default router;
