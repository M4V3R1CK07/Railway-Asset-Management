import { Router } from "express";
import { user_role } from "@prisma/client";

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

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getAllAssets
);

router.get(
  "/:id",
  authenticate,
  getAssetById
);

router.post(
  "/",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER
  ),
  validateCreateAsset,
  createAsset
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles(
    user_role.ADMIN,
    user_role.ENGINEER
  ),
  validateUpdateAsset,
  updateAsset
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  deleteAsset
);

export default router;