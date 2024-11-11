import { Request, Response } from "express";
import { ServiceResponse } from "../../models/serviceResponse";
import { prisma } from "../../dev";

const followUser = async (req: Request, res: Response) => {
  const followingId = req.params.id;
  const followerId = req.body.user.userid;

  try {
    if (followerId === followingId) {
      res
        .status(400)
        .json(ServiceResponse.failed("You cannot follow yourself"));
      return;
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerid_followingid: {
          followerid: followerId,
          followingid: followingId,
        },
      },
    });

    if (existingFollow) {
      res
        .status(400)
        .json(ServiceResponse.failed("You are already following this user"));
      return;
    }

    const follow = await prisma.follow.create({
      data: {
        followerid: followerId,
        followingid: followingId,
      },
    });

    res
      .status(201)
      .json(ServiceResponse.create("User followed successfully", follow));
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
  }
};

export default followUser;
