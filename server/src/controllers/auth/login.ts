import { Request, Response } from "express";
import { prisma } from "../../index";
import { compare } from "bcrypt";
import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });

    if (!user) {
      res.status(401).json(ServiceResponse.unauthorized("User doesn't exist"));
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json(ServiceResponse.unauthorized("Invalid credentials"));
      return;
    }

    const token = createToken({
      userid: user.id,
    });

    res.status(200).json(
      ServiceResponse.success("Sign-in successful", {
        accessToken: token,
        user
      })
    );
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};
