import jwt from "jsonwebtoken";
import { ServiceResponse } from "../models/serviceResponse";

const JWT_token = `${process.env.JWT_SECRET}`;

export const createToken = (payload: object): string => {
  return jwt.sign(payload, JWT_token, { expiresIn: "1w" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_token);
  } catch (error) {
    return ServiceResponse.failed("Invalid token");
  }
};
