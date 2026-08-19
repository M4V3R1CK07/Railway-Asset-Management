import { Router } from "express";

import {
  getAllPredictions,
  getPredictionById,
  getPredictionBySensorReadingId,
  getPredictionsByAssetId,
  createPrediction,
  updatePrediction,
  deletePrediction,
} from "../controllers/prediction.controller.js";

import {
  validateCreatePrediction,
  validateUpdatePrediction,
} from "../validators/prediction.validator.js";

const router = Router();

router.get("/", getAllPredictions);

router.get(
  "/sensor-reading/:sensorReadingId",
  getPredictionBySensorReadingId
);

router.get(
  "/asset/:assetId",
  getPredictionsByAssetId
);

router.get("/:id", getPredictionById);

router.post(
  "/",
  validateCreatePrediction,
  createPrediction
);

router.put(
  "/:id",
  validateUpdatePrediction,
  updatePrediction
);

router.delete("/:id", deletePrediction);

export default router;