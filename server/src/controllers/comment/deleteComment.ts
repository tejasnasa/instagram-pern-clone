import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });

    if (!comment) {
      res.status(404).json(ServiceResponse.notFound("Comment not found"));
      return;
    }

    await prisma.comment.delete({
      where: {
        id: id,
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("Comment deleted successfully"));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default deleteComment;
