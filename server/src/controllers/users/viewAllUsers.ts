import { Request, Response } from "express";
import { prisma } from "../../index";
import { ServiceResponse } from "../../models/serviceResponse";

const viewAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});

    res.status(200).json(ServiceResponse.success("Users found", users));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default viewAllUsers;
