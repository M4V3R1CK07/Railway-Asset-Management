import { NextFunction, Request, Response } from "express";
import sensorReadingService from "../services/sensor-reading.service.js";

export async function getAllSensorReadings(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const readings =
      await sensorReadingService.getAllSensorReadings();

    res.status(200).json({
      success: true,
      data: readings,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSensorReadingById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const reading =
      await sensorReadingService.getSensorReadingById(id);

    res.status(200).json({
      success: true,
      data: reading,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSensorReadingsByAssetId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const assetId = Number(req.params.assetId);

    const readings =
      await sensorReadingService.getSensorReadingsByAssetId(
        assetId
      );

    res.status(200).json({
      success: true,
      data: readings,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSensorReadingsByLocationId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const locationId = Number(req.params.locationId);

    const readings =
      await sensorReadingService.getSensorReadingsByLocationId(
        locationId
      );

    res.status(200).json({
      success: true,
      data: readings,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSensorReadingsByTimeRange(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const startDate = new Date(String(req.query.startDate));
    const endDate = new Date(String(req.query.endDate));

    const readings =
      await sensorReadingService.getSensorReadingsByTimeRange(
        startDate,
        endDate
      );

    res.status(200).json({
      success: true,
      data: readings,
    });
  } catch (error) {
    next(error);
  }
}

export async function createSensorReading(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reading =
      await sensorReadingService.createSensorReading(req.body);

    res.status(201).json({
      success: true,
      message: "Sensor reading created successfully",
      data: reading,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSensorReading(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const reading =
      await sensorReadingService.updateSensorReading(
        id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Sensor reading updated successfully",
      data: reading,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteSensorReading(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await sensorReadingService.deleteSensorReading(id);

    res.status(200).json({
      success: true,
      message: "Sensor reading deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}