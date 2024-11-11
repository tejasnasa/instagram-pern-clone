import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../dev";

const postDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          },
        },
        likes: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      res.status(404).json(ServiceResponse.notFound("Post not found"));
      return;
    }

    res.status(200).json(ServiceResponse.success("Post found", post));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default postDetails;
