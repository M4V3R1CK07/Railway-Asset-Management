import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError.js";

const validRoles = ["ADMIN", "ENGINEER", "TECHNICIAN"] as const;

export function validateCreateUser(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { employeeId, fullName, email, phone, role } = req.body;

  if (
    typeof employeeId !== "string" ||
    employeeId.trim().length === 0
  ) {
    return next(new ValidationError("employeeId is required"));
  }

  if (
    typeof fullName !== "string" ||
    fullName.trim().length === 0
  ) {
    return next(new ValidationError("fullName is required"));
  }

  if (
    typeof email !== "string" ||
    email.trim().length === 0
  ) {
    return next(new ValidationError("email is required"));
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return next(new ValidationError("email must be valid"));
  }

  if (
    phone !== undefined &&
    (typeof phone !== "string" || phone.trim().length === 0)
  ) {
    return next(new ValidationError("phone must be a valid string"));
  }

  if (
    role !== undefined &&
    !validRoles.includes(role)
  ) {
    return next(
      new ValidationError(
        "role must be ADMIN, ENGINEER, or TECHNICIAN"
      )
    );
  }

  next();
}

export function validateUpdateUser(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { employeeId, fullName, email, phone, role } = req.body;

  if (
    employeeId === undefined &&
    fullName === undefined &&
    email === undefined &&
    phone === undefined &&
    role === undefined
  ) {
    return next(
      new ValidationError("At least one field is required")
    );
  }

  if (
    employeeId !== undefined &&
    (typeof employeeId !== "string" ||
      employeeId.trim().length === 0)
  ) {
    return next(new ValidationError("employeeId must be a valid string"));
  }

  if (
    fullName !== undefined &&
    (typeof fullName !== "string" ||
      fullName.trim().length === 0)
  ) {
    return next(new ValidationError("fullName must be a valid string"));
  }

  if (
    email !== undefined &&
    (typeof email !== "string" ||
      email.trim().length === 0)
  ) {
    return next(new ValidationError("email must be a valid string"));
  }

  if (
    email !== undefined &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return next(new ValidationError("email must be valid"));
  }

  if (
    phone !== undefined &&
    (typeof phone !== "string" || phone.trim().length === 0)
  ) {
    return next(new ValidationError("phone must be a valid string"));
  }

  if (
    role !== undefined &&
    !validRoles.includes(role)
  ) {
    return next(
      new ValidationError(
        "role must be ADMIN, ENGINEER, or TECHNICIAN"
      )
    );
  }

  next();
}