import express from "express";

const postRouter = express.Router();

postRouter.get("/");
postRouter.post("/create");
postRouter.get("/:id");
postRouter.patch("/:id");
postRouter.delete("/:id");

export default postRouter;