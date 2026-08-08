import { Router } from "express";
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

const router = Router();

router.get("/", getAllLocations);

router.get("/:id", getLocationById);

router.post("/", validateCreateLocation, createLocation);

router.put("/:id", validateUpdateLocation, updateLocation);

router.delete("/:id", deleteLocation);

export default router;