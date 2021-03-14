import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import asyncHandler from "express-async-handler";

// type
declare global {
  namespace Express {
    export interface Request {
      user: IUser | null;
    }
  }
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      //   console.log(token);
      // decode it
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
      //   console.log(decoded);

      req.user = (await User.findById((<any>decoded).id).select(
        "-password"
      )) as IUser;

      next();
    } else {
      res.status(400);
      throw new Error("Du hast keine Rechte dazu");
    }
    if (!token) {
      res.status(400);
      throw new Error("Du hast keine Rechte");
    }
  }
);
