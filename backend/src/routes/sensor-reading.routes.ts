import { Router } from "express";

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

router.get("/", getAllSensorReadings);

router.get("/asset/:assetId", getSensorReadingsByAssetId);

router.get("/location/:locationId", getSensorReadingsByLocationId);

router.get(
  "/range",
  validateSensorReadingTimeRange,
  getSensorReadingsByTimeRange
);

router.get("/:id", getSensorReadingById);

router.post(
  "/",
  validateCreateSensorReading,
  createSensorReading
);

router.put(
  "/:id",
  validateUpdateSensorReading,
  updateSensorReading
);

router.delete("/:id", deleteSensorReading);

export default router;