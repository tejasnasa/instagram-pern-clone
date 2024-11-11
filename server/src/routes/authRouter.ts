import express from "express";
import register from "../controllers/auth/register";
import { login } from "../controllers/auth/login";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;