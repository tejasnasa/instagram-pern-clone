import express from "express";

const commentRouter = express.Router();

commentRouter.get("/:postId");
commentRouter.post("/:postId");
commentRouter.delete("/:id");

export default commentRouter;
