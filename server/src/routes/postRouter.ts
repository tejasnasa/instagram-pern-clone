import express from "express";
import viewPosts from "../controllers/post/viewPosts";
import createPost from "../controllers/post/createPost";
import postDetails from "../controllers/post/postDetails";

const postRouter = express.Router();

postRouter.get("/", viewPosts);
postRouter.post("/", createPost);
postRouter.get("/:id", postDetails);
postRouter.patch("/:id");
postRouter.delete("/:id");

export default postRouter;