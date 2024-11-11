import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const createComment = async (req: Request, res: Response) => {
  const { text } = req.body;
  const { userid } = req.body.user;
  const { postid } = req.params;
  console.log(userid);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postid },
    });

    if (!post) {
      res.status(404).json(ServiceResponse.notFound("Post not found"));
      return;
    }

    const newComment = await prisma.comment.create({
      data: {
        text: text,
        post: {
          connect: { id: postid },
        },
        user: {
          connect: { id: userid },
        },
      },
    });

    res.status(201).json(ServiceResponse.create("Comment created", newComment));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default createComment;
