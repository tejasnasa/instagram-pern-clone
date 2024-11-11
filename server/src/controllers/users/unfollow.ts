import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../index";

const unfollowUser = async (req: Request, res: Response) => {
  const followingId = req.params.id;
  const followerId = req.body.user.userid;

  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerid_followingid: {
          followerid: followerId,
          followingid: followingId,
        },
      },
    });

    if (!existingFollow) {
      res
        .status(400)
        .json(ServiceResponse.failed("You are not following this user"));
    }

    await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });

    res
      .status(200)
      .json(ServiceResponse.success("User unfollowed successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default unfollowUser;
