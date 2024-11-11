import express from "express";
import viewAllUsers from "../controllers/users/viewAllUsers";
import profile from "../controllers/users/profile";

const userRouter = express.Router();

userRouter.get("/", viewAllUsers);
userRouter.get("/:id", profile);

export default userRouter;
