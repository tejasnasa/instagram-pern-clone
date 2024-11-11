import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Insta Clone");
});

app.get("/profile", (req, res) => {
  res.send("Insta Clone Profile Page");
});

export default app;
