import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    res.status(400).send({ message: error._message });
  }
};
