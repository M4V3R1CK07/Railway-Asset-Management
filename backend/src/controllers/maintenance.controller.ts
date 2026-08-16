import { NextFunction, Request, Response } from "express";
import maintenanceService from "../services/maintenance.service.js";

export async function getAllMaintenance(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const maintenance = await maintenanceService.getAllMaintenance();

    res.status(200).json({
      success: true,
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMaintenanceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const maintenance =
      await maintenanceService.getMaintenanceById(id);

    res.status(200).json({
      success: true,
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMaintenanceByAssetId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const assetId = Number(req.params.assetId);

    const maintenance =
      await maintenanceService.getMaintenanceByAssetId(assetId);

    res.status(200).json({
      success: true,
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMaintenanceByAssignedToId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const assignedToId = Number(req.params.userId);

    const maintenance =
      await maintenanceService.getMaintenanceByAssignedToId(
        assignedToId
      );

    res.status(200).json({
      success: true,
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
}

export async function createMaintenance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const maintenance =
      await maintenanceService.createMaintenance(req.body);

    res.status(201).json({
      success: true,
      message: "Maintenance record created successfully",
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateMaintenance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const maintenance =
      await maintenanceService.updateMaintenance(id, req.body);

    res.status(200).json({
      success: true,
      message: "Maintenance record updated successfully",
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteMaintenance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await maintenanceService.deleteMaintenance(id);

    res.status(200).json({
      success: true,
      message: "Maintenance record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}