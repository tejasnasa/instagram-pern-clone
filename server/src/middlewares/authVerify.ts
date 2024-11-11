import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtConfig";
import { ServiceResponse } from "../models/serviceResponse";

const authVerify = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json(ServiceResponse.unauthorized("No token provided"));
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(ServiceResponse.unauthorized("Invalid token"));
    return;
  }
};

export default authVerify;
