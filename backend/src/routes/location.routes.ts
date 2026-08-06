import { Router } from "express";
import locationController from "../controllers/location.controller.js";

const router = Router();

router.get("/", locationController.getAllLocations);

export default router;