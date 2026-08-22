import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ValidationError } from "../errors/ValidationError.js";

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "ENGINEER" | "TECHNICIAN";
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new ValidationError("Authentication token is required")
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(
        new ValidationError("Authentication token is required")
      );
    }

    const decoded = jwt.verify(
      token,
      getJwtSecret()
    ) as JwtPayload;

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch {
    return next(
      new ValidationError("Invalid or expired authentication token")
    );
  }
}