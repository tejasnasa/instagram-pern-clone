import express from "express";
import viewAllComments from "../controllers/comment/viewAllComments";
import deleteComment from "../controllers/comment/deleteComment";
import createComment from "../controllers/comment/createComment";

const commentRouter = express.Router();

commentRouter.get("/:postid", viewAllComments);
commentRouter.post("/:postid", createComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
