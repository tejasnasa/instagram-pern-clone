import express from "express";
import postRouter from "./postRouter";
import authRouter from "./authRouter";
import commentRouter from "./commentRouter";
import userRouter from "./userRouter";

const masterRouter = express.Router();

masterRouter.use("/auth", authRouter);
masterRouter.use("/posts", postRouter);
masterRouter.use("/comments", commentRouter);
masterRouter.use("/users", userRouter);

export default masterRouter;
