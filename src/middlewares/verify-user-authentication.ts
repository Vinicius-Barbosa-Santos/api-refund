import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

const verifyUserAuthorization = (role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !role.includes(req.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
};

export { verifyUserAuthorization };
