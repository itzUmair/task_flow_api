import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import * as dotenv from "dotenv";
import connectDB from "./database/database.js";
import * as middlewares from "./middleware/middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    methods: "*",
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(middlewares.loggerMiddleware);
app.use(middlewares.authenticationMiddleware);

app.use("/api/v1/", router);

const startServer = async () => {
  try {
    console.log("establishing connection to mongoDB...");
    await connectDB();
    app.listen(8080, () =>
      console.log("server listening on:http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
