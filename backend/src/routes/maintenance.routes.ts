import { Router } from "express";

import {
  getAllMaintenance,
  getMaintenanceById,
  getMaintenanceByAssetId,
  getMaintenanceByAssignedToId,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../controllers/maintenance.controller.js";

import {
  validateCreateMaintenance,
  validateUpdateMaintenance,
} from "../validators/maintenance.validator.js";

const router = Router();

router.get("/", getAllMaintenance);

router.get("/asset/:assetId", getMaintenanceByAssetId);

router.get("/user/:userId", getMaintenanceByAssignedToId);

router.get("/:id", getMaintenanceById);

router.post("/", validateCreateMaintenance, createMaintenance);

router.put("/:id", validateUpdateMaintenance, updateMaintenance);

router.delete("/:id", deleteMaintenance);

export default router;