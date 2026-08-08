import { Router } from "express";

import {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../controllers/asset.controller.js";

import {
  validateCreateAsset,
  validateUpdateAsset,
} from "../validators/asset.validator.js";

const router = Router();

router.get("/", getAllAssets);

router.get("/:id", getAssetById);

router.post("/", validateCreateAsset, createAsset);

router.put("/:id", validateUpdateAsset, updateAsset);

router.delete("/:id", deleteAsset);

export default router;