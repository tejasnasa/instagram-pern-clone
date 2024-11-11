import { Request, Response } from "express";
import { hash } from "bcrypt";
import { prisma } from "../../index";
import { createToken } from "../../utils/jwtConfig";
import { ServiceResponse } from "../../models/serviceResponse";
import {
  createFirebaseUser,
  deleteFirebaseUser,
  pollEmailVerification,
} from "./firebaseControllers";

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, username, fullname, avatar, bio } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists"
          : "Username already taken";
      res.status(401).json(ServiceResponse.unauthorized(message));
      return;
    }

    const hashedPassword = await hash(password, 10);

    const firebaseUser = await createFirebaseUser(email, password);
    console.log("Email sent!");

    const verified = await pollEmailVerification(firebaseUser);

    if (verified) {
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          fullname,
          avatar,
          bio,
        },
      });

      const token = createToken({
        userId: newUser.id,
      });
      await deleteFirebaseUser(firebaseUser);

      res.status(201).json(
        ServiceResponse.create("User created successfully", {
          accessToken: token,
          user: newUser,
        })
      );
      return;
    }

    await deleteFirebaseUser(firebaseUser);
    res
      .status(400)
      .json(ServiceResponse.badrequest("Verification not completed."));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json(ServiceResponse.failed("Internal server error"));
    return;
  }
};

export default register;
