import { NextFunction, Request, Response } from "express";
import locationService from "../services/location.service.js";

export async function getAllLocations(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const locations = await locationService.getAllLocations();

    res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLocationById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const location = await locationService.getLocationById(id);

    res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    next(error);
  }
}

export async function createLocation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const location = await locationService.createLocation(req.body);

    res.status(201).json({
      success: true,
      message: "Location created successfully",
      data: location,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateLocation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const location = await locationService.updateLocation(id, req.body);

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: location,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteLocation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await locationService.deleteLocation(id);

    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}