import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
};

export const getUserInfoFromToken = (req) => {
  const token = req.cookies._auth;
  const { userid, fname, lname } = jwt.decode(
    token,
    process.env.JWT_SECRET
  ).userData;
  return { userid, fname, lname };
};

export const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);
