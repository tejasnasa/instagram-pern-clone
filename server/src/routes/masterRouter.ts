import express from "express";
import postRouter from "./postRouter";
import authRouter from "./authRouter";
import commentRouter from "./commentRouter";
import userRouter from "./userRouter";
import authVerify from "../middlewares/authVerify";
import likeRouter from "./likeRouter";

const masterRouter = express.Router();

masterRouter.use("/auth", authRouter);
masterRouter.use("/posts", authVerify, postRouter);
masterRouter.use("/comments", authVerify, commentRouter);
masterRouter.use("/users", authVerify, userRouter);
masterRouter.use("/like", authVerify, likeRouter);

export default masterRouter;
