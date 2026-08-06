import locationRepository from "../repositories/location.repository.js";

class LocationService {
  async getAllLocations() {
    return await locationRepository.getAllLocations();
  }
}

export default new LocationService();