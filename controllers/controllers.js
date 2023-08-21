import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import asyncHanlder from "express-async-handler";
import userModel from "../models/user_schema.js";
import teamModel from "../models/teams_schema.js";
import { generateRandomId, getUserIdFromToken } from "../utils/utils.js";

export const home = (req, res) => {
  res.status(200).send("Task flow API");
};

export const verifyToken = (req, res) => {
  res.status(200).send({ message: "token verified" });
};

export const signup = async (req, res) => {
  const { first_name, last_name, bio, occupation, email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res
      .status(401)
      .send({ message: "an account with this email already exists" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = generateRandomId();
  try {
    await userModel.create({
      _id: id,
      first_name,
      last_name,
      bio,
      occupation,
      email,
      password: hashedPassword,
    });
    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userModel
    .findOne({ email })
    .select({ email: 1, password: 1 });
  if (!userExists) {
    res.status(404).send({ message: "no account with this email exists" });
    return;
  }
  const validPassword = await bcrypt.compare(password, userExists.password);
  if (!validPassword) {
    res.status(401).send({ message: "wrong password" });
    return;
  }
  const token = jwt.sign({ userid: userExists._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.status(200).send({ message: "logged in successfully", token });
};

export const getUserDetails = async (req, res) => {
  const userID = getUserIdFromToken(req);
  const userData = await userModel.findById(userID);
  if (!userData) {
    res.status(404).send({ message: "no user found" });
    return;
  }
  res.status(200).send({ message: "user found successfully", data: userData });
};

export const createTeam = async (req, res) => {
  const { name, description, members, badgeColor } = req.body;
  const createrID = getUserIdFromToken(req);
  const teamID = generateRandomId();

  try {
    await teamModel.create({
      _id: teamID,
      name,
      description,
      members: [createrID, ...members],
      badgeColor,
      createdBy: createrID,
      tasks: [],
    });

    res.status(201).send({ message: "team created successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: error._message });
    }
    res.status(500).send({ message: "something went wrong" });
  }
};

export const createTask = async (req, res) => {
  const {
    title,
    description,
    priority,
    deadline,
    state,
    completionDate,
    completedBy,
    createdBy,
    createdOn,
    teamID,
  } = req.body;

  const team = await teamModel.findById(teamID);
  if (!team) {
    res.status(404).send({ message: "no team with this team id found" });
    return;
  }
  try {
    team.tasks.push({
      title,
      description,
      priority,
      deadline,
      state,
      completionDate,
      completedBy,
      createdBy,
      createdOn,
    });
    await team.save();
    const user = await userModel
      .findById(createdBy)
      .select({ first_name: 1, last_name: 1 });
    team.logs.push({
      message: `${title} was added to team tasks by ${
        user.first_name + " " + user.last_name
      }`,
    });
    await team.save();
    res.status(200).send({ message: "task created successfully" });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: error._message });
      return;
    }
    res.status(500).send({ message: "something went wrong" });
  }
};

export const getAllTeamTasks = async (req, res) => {
  const { teamID } = req.params;
  const tasks = await teamModel.findById(teamID).select({ tasks: 1 });
  if (!tasks) {
    res
      .status(404)
      .send({ message: `team with id: ${teamID} does not exists` });
    return;
  }
  res
    .status(200)
    .send({ message: "tasks recieved successfully!", data: tasks });
};

export const addTeamMembers = async (req, res) => {
  const { userID, teamID } = req.body;
  const team = await teamModel.findById(teamID);
  if (!team) {
    res
      .status(404)
      .send({ message: `team with id: ${teamID} does not exists` });
    return;
  }

  const user = await userModel.findById(userID);

  if (team.members.includes(userID)) {
    res.status(400).send({
      message: `${
        user.first_name + " " + user.last_name
      } is already in this team.`,
    });
    return;
  }

  if (!user) {
    res
      .status(404)
      .send({ message: `user with id: ${userID} does not exists` });
    return;
  }
  const userAdder = await userModel.findById(getUserIdFromToken(req));
  try {
    team.members.push(userID);
    await team.save();
    team.logs.push({
      message: `${
        user.first_name + " " + user.last_name
      } was added to the team by ${
        userAdder.first_name + " " + userAdder.last_name
      }.`,
    });
    await team.save();

    res.status(200).send({
      message: `${
        user.first_name + " " + user.last_name
      } was added to the team.`,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: error._message });
    }
    res.status(500).send({ message: "something went wrong" });
  }
};
