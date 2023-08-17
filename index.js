import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    methods: "*",
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(8080, () => "server listening on 8080");
