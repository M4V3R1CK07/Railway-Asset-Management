import { Router } from "express";
import { user_role } from "@prisma/client";

import {
  validateCreateLocation,
  validateUpdateLocation,
} from "../validators/location.validator.js";

import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/location.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getAllLocations
);

router.get(
  "/:id",
  authenticate,
  getLocationById
);

router.post(
  "/",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  validateCreateLocation,
  createLocation
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  validateUpdateLocation,
  updateLocation
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  deleteLocation
);

export default router;