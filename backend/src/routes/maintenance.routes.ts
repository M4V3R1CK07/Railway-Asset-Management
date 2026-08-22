import { Router } from "express";
import { user_role } from "@prisma/client";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

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

router.get(
  "/",
  authenticate,
  getAllMaintenance
);

router.get(
  "/asset/:assetId",
  authenticate,
  getMaintenanceByAssetId
);

router.get(
  "/user/:userId",
  authenticate,
  getMaintenanceByAssignedToId
);

router.get(
  "/:id",
  authenticate,
  getMaintenanceById
);

router.post(
  "/",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER,
    user_role.TECHNICIAN
  ),
  validateCreateMaintenance,
  createMaintenance
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER,
    user_role.TECHNICIAN
  ),
  validateUpdateMaintenance,
  updateMaintenance
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER
  ),
  deleteMaintenance
);

export default router;