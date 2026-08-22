import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError.js";

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

function isValidPositiveInteger(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0
  );
}

export function validateRegister(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { userId, password } = req.body;

  if (!isValidPositiveInteger(userId)) {
    return next(
      new ValidationError("userId must be a positive integer")
    );
  }

  if (
    typeof password !== "string" ||
    password.length < 8
  ) {
    return next(
      new ValidationError(
        "Password must be at least 8 characters long"
      )
    );
  }

  next();
}

export function validateLogin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return next(
      new ValidationError("A valid email is required")
    );
  }

  if (
    typeof password !== "string" ||
    password.length === 0
  ) {
    return next(
      new ValidationError("Password is required")
    );
  }

  next();
}

export function validateChangePassword(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { currentPassword, newPassword } = req.body;

  if (
    typeof currentPassword !== "string" ||
    currentPassword.length === 0
  ) {
    return next(
      new ValidationError("Current password is required")
    );
  }

  if (
    typeof newPassword !== "string" ||
    newPassword.length < 8
  ) {
    return next(
      new ValidationError(
        "New password must be at least 8 characters long"
      )
    );
  }

  if (currentPassword === newPassword) {
    return next(
      new ValidationError(
        "New password must be different from the current password"
      )
    );
  }

  next();
}