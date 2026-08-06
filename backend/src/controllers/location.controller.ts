import { Request, Response, NextFunction } from "express";
import locationService from "../services/location.service.js";

class LocationController {
  async getAllLocations(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const locations = await locationService.getAllLocations();

      res.status(200).json({
        success: true,
        message: "Locations fetched successfully",
        data: locations,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LocationController();