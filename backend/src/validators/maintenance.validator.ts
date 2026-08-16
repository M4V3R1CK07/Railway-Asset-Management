import { NextFunction, Request, Response } from "express";
import {
  maintenance_priority,
  maintenance_status,
} from "@prisma/client";
import { ValidationError } from "../errors/ValidationError.js";

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isValidPositiveInteger(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0
  );
}

export function validateCreateMaintenance(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    assetId,
    assignedToId,
    title,
    // description,
    scheduledDate,
    completedDate,
    priority,
    status,
  } = req.body;

  if (!isValidPositiveInteger(assetId)) {
    return next(
      new ValidationError("assetId must be a positive integer")
    );
  }

  if (!isValidPositiveInteger(assignedToId)) {
    return next(
      new ValidationError("assignedToId must be a positive integer")
    );
  }

  if (
    typeof title !== "string" ||
    title.trim().length === 0
  ) {
    return next(new ValidationError("title is required"));
  }

  if (!isValidDate(scheduledDate)) {
    return next(
      new ValidationError(
        "scheduledDate must be a valid ISO-8601 date"
      )
    );
  }

  if (
    completedDate !== undefined &&
    !isValidDate(completedDate)
  ) {
    return next(
      new ValidationError(
        "completedDate must be a valid ISO-8601 date"
      )
    );
  }

  if (
    priority !== undefined &&
    !Object.values(maintenance_priority).includes(priority)
  ) {
    return next(
      new ValidationError("Invalid maintenance priority")
    );
  }

  if (
    status !== undefined &&
    !Object.values(maintenance_status).includes(status)
  ) {
    return next(
      new ValidationError("Invalid maintenance status")
    );
  }

  next();
}

export function validateUpdateMaintenance(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    assetId,
    assignedToId,
    title,
    description,
    scheduledDate,
    completedDate,
    priority,
    status,
  } = req.body;

  if (
    assetId === undefined &&
    assignedToId === undefined &&
    title === undefined &&
    description === undefined &&
    scheduledDate === undefined &&
    completedDate === undefined &&
    priority === undefined &&
    status === undefined
  ) {
    return next(
      new ValidationError("At least one field is required")
    );
  }

  if (
    assetId !== undefined &&
    !isValidPositiveInteger(assetId)
  ) {
    return next(
      new ValidationError("assetId must be a positive integer")
    );
  }

  if (
    assignedToId !== undefined &&
    !isValidPositiveInteger(assignedToId)
  ) {
    return next(
      new ValidationError("assignedToId must be a positive integer")
    );
  }

  if (
    title !== undefined &&
    (typeof title !== "string" ||
      title.trim().length === 0)
  ) {
    return next(
      new ValidationError("title must be a valid string")
    );
  }

  if (
    scheduledDate !== undefined &&
    !isValidDate(scheduledDate)
  ) {
    return next(
      new ValidationError(
        "scheduledDate must be a valid ISO-8601 date"
      )
    );
  }

  if (
    completedDate !== undefined &&
    !isValidDate(completedDate)
  ) {
    return next(
      new ValidationError(
        "completedDate must be a valid ISO-8601 date"
      )
    );
  }

  if (
    priority !== undefined &&
    !Object.values(maintenance_priority).includes(priority)
  ) {
    return next(
      new ValidationError("Invalid maintenance priority")
    );
  }

  if (
    status !== undefined &&
    !Object.values(maintenance_status).includes(status)
  ) {
    return next(
      new ValidationError("Invalid maintenance status")
    );
  }

  next();
}