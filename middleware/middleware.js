import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (req.url.endsWith("/signin") || req.url.endsWith("/signup")) {
    next();
    return;
  }

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

export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const { method, url } = req;

  res.on("finish", () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    const logEntry = {
      timestamp: new Date().toISOString(),
      method,
      url,
      responseTime: `${responseTime}ms`,
    };

    console.log(JSON.stringify(logEntry));
  });

  next();
};
