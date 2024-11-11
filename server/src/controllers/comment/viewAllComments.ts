import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const viewAllComments = async (req: Request, res: Response) => {
  const { postid } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postid: postid,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Comments fetched successfully", comments));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default viewAllComments;
