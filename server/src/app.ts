import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import masterRouter from "./routes/masterRouter";

config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://tejas-instagram.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/v1", masterRouter);

app.get("/", (req, res) => {
  res.send("Insta Clone");
});

app.get("/profile", (req, res) => {
  res.send("Insta Clone Profile Page");
});

export default app;
