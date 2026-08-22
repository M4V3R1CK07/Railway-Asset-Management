import { Router } from "express";
import { user_role } from "@prisma/client";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

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

router.get(
  "/",
  authenticate,
  getAllPredictions
);

router.get(
  "/sensor-reading/:sensorReadingId",
  authenticate,
  getPredictionBySensorReadingId
);

router.get(
  "/asset/:assetId",
  authenticate,
  getPredictionsByAssetId
);

router.get(
  "/:id",
  authenticate,
  getPredictionById
);

router.post(
  "/",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER
  ),
  validateCreatePrediction,
  createPrediction
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER
  ),
  validateUpdatePrediction,
  updatePrediction
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  deletePrediction
);

export default router;