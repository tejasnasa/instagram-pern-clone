import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const unlikePost = async (req: Request, res: Response) => {
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

    if (!existingLike) {
      res
        .status(400)
        .json(ServiceResponse.failed("You have not liked this post"));
    }

    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    res.status(200).json(ServiceResponse.success("Post disliked successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default unlikePost;
