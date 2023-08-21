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
  getAllTeamMembers,
  getAllTeamLogs,
} from "../controllers/controllers.js";

const router = Router();

router.route("/").get(home);
router.route("/verifytoken").get(verifyToken);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/user/details").get(getUserDetails);
router.route("/team/create").post(createTeam);
router.route("/tasks/create").put(createTask);
router.route("/tasks/all/:teamID").get(getAllTeamTasks);
router.route("/team/members/add").post(addTeamMembers);
router.route("/team/members/all/:teamID").get(getAllTeamMembers);
router.route("/team/logs/all:teamID").get(getAllTeamLogs);

export default router;
