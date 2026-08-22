import { Router } from "express";
import { user_role } from "@prisma/client";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import {
  getAllSensorReadings,
  getSensorReadingById,
  getSensorReadingsByAssetId,
  getSensorReadingsByLocationId,
  getSensorReadingsByTimeRange,
  createSensorReading,
  updateSensorReading,
  deleteSensorReading,
} from "../controllers/sensor-reading.controller.js";

import {
  validateCreateSensorReading,
  validateUpdateSensorReading,
  validateSensorReadingTimeRange,
} from "../validators/sensor-reading.validator.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getAllSensorReadings
);

router.get(
  "/asset/:assetId",
  authenticate,
  getSensorReadingsByAssetId
);

router.get(
  "/location/:locationId",
  authenticate,
  getSensorReadingsByLocationId
);

router.get(
  "/range",
  authenticate,
  validateSensorReadingTimeRange,
  getSensorReadingsByTimeRange
);

router.get(
  "/:id",
  authenticate,
  getSensorReadingById
);

router.post(
  "/",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER,
    user_role.TECHNICIAN
  ),
  validateCreateSensorReading,
  createSensorReading
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER,
    user_role.TECHNICIAN
  ),
  validateUpdateSensorReading,
  updateSensorReading
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  deleteSensorReading
);

export default router;