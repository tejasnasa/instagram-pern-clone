import express from "express";

const masterRouter = express.Router();

masterRouter.use("/auth");
masterRouter.use("/post");
masterRouter.use("/like");
masterRouter.use("/comment");

export default masterRouter;
