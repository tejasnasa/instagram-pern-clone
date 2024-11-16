import express from "express";
import postRouter from "./postRouter";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import authVerify from "../middlewares/authVerify";
import likeRouter from "./likeRouter";

const masterRouter = express.Router();

masterRouter.use("/auth", authRouter);
masterRouter.use("/posts", authVerify, postRouter);
masterRouter.use("/users", authVerify, userRouter);
masterRouter.use("/like", authVerify, likeRouter);

export default masterRouter;
