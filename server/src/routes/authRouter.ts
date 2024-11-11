import express from "express";

const authRouter = express.Router();

authRouter.post("/login");
authRouter.post("/signup");
authRouter.post("/googleLogin");

export default authRouter;
