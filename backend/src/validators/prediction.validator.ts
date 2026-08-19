import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError.js";

const VALID_STATUSES = ["NORMAL", "WARNING", "CRITICAL"];

function isValidPositiveInteger(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0
  );
}

function isValidProbability(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  );
}

function isValidDate(value: unknown): value is string {
  return (
    typeof value === "string" &&
    !Number.isNaN(Date.parse(value))
  );
}

export function validateCreatePrediction(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    sensorReadingId,
    assetId,
    failureProbability,
    predictedStatus,
    recommendation,
    predictedAt,
  } = req.body;

  if (!isValidPositiveInteger(sensorReadingId)) {
    return next(
      new ValidationError(
        "sensorReadingId must be a positive integer"
      )
    );
  }

  if (!isValidPositiveInteger(assetId)) {
    return next(
      new ValidationError("assetId must be a positive integer")
    );
  }

  if (!isValidProbability(failureProbability)) {
    return next(
      new ValidationError(
        "failureProbability must be a number between 0 and 1"
      )
    );
  }

  if (
    typeof predictedStatus !== "string" ||
    !VALID_STATUSES.includes(predictedStatus)
  ) {
    return next(
      new ValidationError(
        "predictedStatus must be NORMAL, WARNING, or CRITICAL"
      )
    );
  }

  if (
    recommendation !== undefined &&
    typeof recommendation !== "string"
  ) {
    return next(
      new ValidationError("recommendation must be a string")
    );
  }

  if (
    predictedAt !== undefined &&
    !isValidDate(predictedAt)
  ) {
    return next(
      new ValidationError(
        "predictedAt must be a valid ISO-8601 date"
      )
    );
  }

  next();
}

export function validateUpdatePrediction(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const {
    sensorReadingId,
    assetId,
    failureProbability,
    predictedStatus,
    recommendation,
    predictedAt,
  } = req.body;

  if (
    sensorReadingId === undefined &&
    assetId === undefined &&
    failureProbability === undefined &&
    predictedStatus === undefined &&
    recommendation === undefined &&
    predictedAt === undefined
  ) {
    return next(
      new ValidationError("At least one field is required")
    );
  }

  if (
    sensorReadingId !== undefined &&
    !isValidPositiveInteger(sensorReadingId)
  ) {
    return next(
      new ValidationError(
        "sensorReadingId must be a positive integer"
      )
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
    failureProbability !== undefined &&
    !isValidProbability(failureProbability)
  ) {
    return next(
      new ValidationError(
        "failureProbability must be a number between 0 and 1"
      )
    );
  }

  if (
    predictedStatus !== undefined &&
    (
      typeof predictedStatus !== "string" ||
      !VALID_STATUSES.includes(predictedStatus)
    )
  ) {
    return next(
      new ValidationError(
        "predictedStatus must be NORMAL, WARNING, or CRITICAL"
      )
    );
  }

  if (
    recommendation !== undefined &&
    typeof recommendation !== "string"
  ) {
    return next(
      new ValidationError("recommendation must be a string")
    );
  }

  if (
    predictedAt !== undefined &&
    !isValidDate(predictedAt)
  ) {
    return next(
      new ValidationError(
        "predictedAt must be a valid ISO-8601 date"
      )
    );
  }

  next();
}