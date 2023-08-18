import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ message: "You are not authorized to access the API." });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token." });
  }
};
