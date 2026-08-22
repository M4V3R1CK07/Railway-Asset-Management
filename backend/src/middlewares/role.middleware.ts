import { NextFunction, Request, Response } from "express";
import { user_role } from "@prisma/client";
import { ValidationError } from "../errors/ValidationError.js";

export function authorizeRoles(
  ...allowedRoles: user_role[]
) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(
        new ValidationError("Authentication required")
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ValidationError(
          "You do not have permission to perform this action"
        )
      );
    }

    next();
  };
}