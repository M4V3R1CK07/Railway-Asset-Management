import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError.js";

function isValidPositiveInteger(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0
  );
}

function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isValidDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    !Number.isNaN(Date.parse(value))
  );
}

export function validateCreateSensorReading(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    assetId,
    locationId,
    temperature,
    vibration,
    voltage,
    current,
    humidity,
    recordedAt,
  } = req.body;

  if (!isValidPositiveInteger(assetId)) {
    return next(
      new ValidationError("assetId must be a positive integer")
    );
  }

  if (!isValidPositiveInteger(locationId)) {
    return next(
      new ValidationError("locationId must be a positive integer")
    );
  }

  if (
    temperature !== undefined &&
    !isValidNumber(temperature)
  ) {
    return next(
      new ValidationError("temperature must be a valid number")
    );
  }

  if (
    vibration !== undefined &&
    !isValidNumber(vibration)
  ) {
    return next(
      new ValidationError("vibration must be a valid number")
    );
  }

  if (
    voltage !== undefined &&
    !isValidNumber(voltage)
  ) {
    return next(
      new ValidationError("voltage must be a valid number")
    );
  }

  if (
    current !== undefined &&
    !isValidNumber(current)
  ) {
    return next(
      new ValidationError("current must be a valid number")
    );
  }

  if (
    humidity !== undefined &&
    !isValidNumber(humidity)
  ) {
    return next(
      new ValidationError("humidity must be a valid number")
    );
  }

  if (
    recordedAt !== undefined &&
    !isValidDate(recordedAt)
  ) {
    return next(
      new ValidationError(
        "recordedAt must be a valid ISO-8601 date"
      )
    );
  }

  next();
}

export function validateUpdateSensorReading(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    assetId,
    locationId,
    temperature,
    vibration,
    voltage,
    current,
    humidity,
    recordedAt,
  } = req.body;

  if (
    assetId === undefined &&
    locationId === undefined &&
    temperature === undefined &&
    vibration === undefined &&
    voltage === undefined &&
    current === undefined &&
    humidity === undefined &&
    recordedAt === undefined
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
    locationId !== undefined &&
    !isValidPositiveInteger(locationId)
  ) {
    return next(
      new ValidationError("locationId must be a positive integer")
    );
  }

  if (
    temperature !== undefined &&
    !isValidNumber(temperature)
  ) {
    return next(
      new ValidationError("temperature must be a valid number")
    );
  }

  if (
    vibration !== undefined &&
    !isValidNumber(vibration)
  ) {
    return next(
      new ValidationError("vibration must be a valid number")
    );
  }

  if (
    voltage !== undefined &&
    !isValidNumber(voltage)
  ) {
    return next(
      new ValidationError("voltage must be a valid number")
    );
  }

  if (
    current !== undefined &&
    !isValidNumber(current)
  ) {
    return next(
      new ValidationError("current must be a valid number")
    );
  }

  if (
    humidity !== undefined &&
    !isValidNumber(humidity)
  ) {
    return next(
      new ValidationError("humidity must be a valid number")
    );
  }

  if (
    recordedAt !== undefined &&
    !isValidDate(recordedAt)
  ) {
    return next(
      new ValidationError(
        "recordedAt must be a valid ISO-8601 date"
      )
    );
  }

  next();
}

export function validateSensorReadingTimeRange(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { startDate, endDate } = req.query;

  if (!startDate) {
    return next(
      new ValidationError("startDate query parameter is required")
    );
  }

  if (!endDate) {
    return next(
      new ValidationError("endDate query parameter is required")
    );
  }

  if (!isValidDate(startDate)) {
    return next(
      new ValidationError(
        "startDate must be a valid ISO-8601 date"
      )
    );
  }

  if (!isValidDate(endDate)) {
    return next(
      new ValidationError(
        "endDate must be a valid ISO-8601 date"
      )
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    return next(
      new ValidationError(
        "startDate cannot be after endDate"
      )
    );
  }

  next();
}