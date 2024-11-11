import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../dev";

const likePost = async (req: Request, res: Response) => {
  const { postid } = req.params;
  const { userid } = req.body.user;

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userid_postid: {
          userid: userid,
          postid: postid,
        },
      },
    });

    if (existingLike) {
      res
        .status(400)
        .json(ServiceResponse.failed("You have already liked this post"));
      return;
    }

    const newLike = await prisma.like.create({
      data: {
        userid: userid,
        postid: postid,
      },
    });

    res
      .status(201)
      .json(ServiceResponse.create("Post liked successfully", newLike));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default likePost;
