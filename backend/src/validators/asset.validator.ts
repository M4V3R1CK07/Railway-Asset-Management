import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError.js";

const validStatuses = [
  "OPERATIONAL",
  "MAINTENANCE_DUE",
  "UNDER_MAINTENANCE",
  "FAILED",
];

export function validateCreateAsset(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    assetCode,
    assetName,
    assetType,
    manufacturer,
    installationDate,
    status,
    locationId,
  } = req.body ?? {};

  if (!assetCode || typeof assetCode !== "string") {
    return next(new ValidationError("assetCode is required"));
  }

  if (!assetName || typeof assetName !== "string") {
    return next(new ValidationError("assetName is required"));
  }

  if (!assetType || typeof assetType !== "string") {
    return next(new ValidationError("assetType is required"));
  }

  if (manufacturer !== undefined && typeof manufacturer !== "string") {
    return next(new ValidationError("manufacturer must be a string"));
  }

  if (installationDate !== undefined) {
  const parsedDate = new Date(installationDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return next(
      new ValidationError("installationDate must be a valid date")
    );
  }

  req.body.installationDate = parsedDate;
}

  if (status !== undefined && !validStatuses.includes(status)) {
    return next(new ValidationError("Invalid asset status"));
  }

  if (
    locationId === undefined ||
    typeof locationId !== "number" ||
    !Number.isInteger(locationId) ||
    locationId <= 0
  ) {
    return next(
      new ValidationError("locationId must be a positive integer")
    );
  }

  next();
}

export function validateUpdateAsset(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    assetCode,
    assetName,
    assetType,
    manufacturer,
    installationDate,
    status,
    locationId,
  } = req.body ?? {};

  const fields = [
    assetCode,
    assetName,
    assetType,
    manufacturer,
    installationDate,
    status,
    locationId,
  ];

  if (fields.every((field) => field === undefined)) {
    return next(
      new ValidationError("At least one field is required for update")
    );
  }

  if (
    assetCode !== undefined &&
    (typeof assetCode !== "string" || assetCode.trim() === "")
  ) {
    return next(
      new ValidationError("assetCode must be a non-empty string")
    );
  }

  if (
    assetName !== undefined &&
    (typeof assetName !== "string" || assetName.trim() === "")
  ) {
    return next(
      new ValidationError("assetName must be a non-empty string")
    );
  }

  if (
    assetType !== undefined &&
    (typeof assetType !== "string" || assetType.trim() === "")
  ) {
    return next(
      new ValidationError("assetType must be a non-empty string")
    );
  }

  if (manufacturer !== undefined && typeof manufacturer !== "string") {
    return next(new ValidationError("manufacturer must be a string"));
  }

  if (installationDate !== undefined) {
  const parsedDate = new Date(installationDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return next(
      new ValidationError("installationDate must be a valid date")
    );
  }

  req.body.installationDate = parsedDate;
}

  if (status !== undefined && !validStatuses.includes(status)) {
    return next(new ValidationError("Invalid asset status"));
  }

  if (
    locationId !== undefined &&
    (
      typeof locationId !== "number" ||
      !Number.isInteger(locationId) ||
      locationId <= 0
    )
  ) {
    return next(
      new ValidationError("locationId must be a positive integer")
    );
  }

  next();
}