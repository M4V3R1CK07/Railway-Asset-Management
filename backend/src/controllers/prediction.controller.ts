import { NextFunction, Request, Response } from "express";
import predictionService from "../services/prediction.service.js";

export async function getAllPredictions(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const predictions = await predictionService.getAllPredictions();

    res.status(200).json({
      success: true,
      data: predictions,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPredictionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const prediction =
      await predictionService.getPredictionById(id);

    res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPredictionBySensorReadingId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sensorReadingId = Number(req.params.sensorReadingId);

    const prediction =
      await predictionService.getPredictionBySensorReadingId(
        sensorReadingId
      );

    res.status(200).json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPredictionsByAssetId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const assetId = Number(req.params.assetId);

    const predictions =
      await predictionService.getPredictionsByAssetId(assetId);

    res.status(200).json({
      success: true,
      data: predictions,
    });
  } catch (error) {
    next(error);
  }
}

export async function createPrediction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prediction =
      await predictionService.createPrediction(req.body);

    res.status(201).json({
      success: true,
      message: "Prediction created successfully",
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePrediction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const prediction =
      await predictionService.updatePrediction(id, req.body);

    res.status(200).json({
      success: true,
      message: "Prediction updated successfully",
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
}

export async function deletePrediction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await predictionService.deletePrediction(id);

    res.status(200).json({
      success: true,
      message: "Prediction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}