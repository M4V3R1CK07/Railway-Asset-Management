import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError.js";

export function validateCreateLocation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { stationCode, stationName, division, zone } = req.body ?? {};

  if (!stationCode || typeof stationCode !== "string") {
    return next(new ValidationError("stationCode is required"));
  }

  if (!stationName || typeof stationName !== "string") {
    return next(new ValidationError("stationName is required"));
  }

  if (!division || typeof division !== "string") {
    return next(new ValidationError("division is required"));
  }

  if (zone !== undefined && typeof zone !== "string") {
    return next(new ValidationError("zone must be a string"));
  }

  next();
}

export function validateUpdateLocation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { stationCode, stationName, division, zone } = req.body ?? {};

  if (stationCode !== undefined) {
    if (typeof stationCode !== "string" || stationCode.trim() === "") {
      return next(
        new ValidationError("stationCode must be a non-empty string")
      );
    }
  }

  if (stationName !== undefined) {
    if (typeof stationName !== "string" || stationName.trim() === "") {
      return next(
        new ValidationError("stationName must be a non-empty string")
      );
    }
  }

  if (division !== undefined) {
    if (typeof division !== "string" || division.trim() === "") {
      return next(
        new ValidationError("division must be a non-empty string")
      );
    }
  }

  if (zone !== undefined && typeof zone !== "string") {
    return next(new ValidationError("zone must be a string"));
  }

  next();
}