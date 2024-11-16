import express from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import masterRouter from "./routes/masterRouter";

config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "https://tejas-instagram.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/v1", masterRouter);

app.get("/", (req, res) => {
  res.send("Insta Clone");
});

app.get("/profile", (req, res) => {
  res.send("Insta Clone Profile Page");
});

export default app;
