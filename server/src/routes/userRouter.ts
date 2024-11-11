import express from "express";

const userRouter = express.Router();

userRouter.get("/");
userRouter.get("/:id");

export default userRouter;
