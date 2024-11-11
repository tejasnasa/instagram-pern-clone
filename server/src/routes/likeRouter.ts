import express from "express";
import likePost from "../controllers/like/likePost";
import unlikePost from "../controllers/like/unlikePost";

const likeRouter = express.Router();

likeRouter.post("/:postid", likePost);
likeRouter.delete("/:postid", unlikePost);

export default likeRouter;
