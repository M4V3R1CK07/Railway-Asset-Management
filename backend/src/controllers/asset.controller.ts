import { NextFunction, Request, Response } from "express";
import assetService from "../services/asset.service.js";

export async function getAllAssets(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const assets = await assetService.getAllAssets();

    res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAssetById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const asset = await assetService.getAssetById(id);

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    next(error);
  }
}

export async function createAsset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const asset = await assetService.createAsset(req.body);

    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: asset,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAsset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const asset = await assetService.updateAsset(id, req.body);

    res.status(200).json({
      success: true,
      message: "Asset updated successfully",
      data: asset,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAsset(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    await assetService.deleteAsset(id);

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}