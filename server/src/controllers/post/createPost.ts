import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../dev";

const createPost = async (req: Request, res: Response) => {
  const { caption, imageurl, userid } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userid },
    });

    if (!user) {
      res.status(404).json(ServiceResponse.failed("User not found"));
      return;
    }

    const post = await prisma.post.create({
      data: {
        caption,
        imageurl,
        user: {
          connect: { id: userid },
        },
      },
    });

    res.status(201).json(ServiceResponse.create("Post created", post));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default createPost;
