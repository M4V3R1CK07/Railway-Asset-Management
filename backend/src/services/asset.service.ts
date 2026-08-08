import assetRepository from "../repositories/asset.repository.js";
import locationRepository from "../repositories/location.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ConflictError } from "../errors/ConflictError.js";
import {
  CreateAssetDto,
  UpdateAssetDto,
} from "../types/asset.types.js";

class AssetService {
  async getAllAssets() {
    return assetRepository.getAllAssets();
  }

  async getAssetById(id: number) {
    const asset = await assetRepository.getAssetById(id);

    if (!asset) {
      throw new NotFoundError("Asset not found");
    }

    return asset;
  }

  async createAsset(data: CreateAssetDto) {
    const existingAsset =
      await assetRepository.getAssetByCode(data.assetCode);

    if (existingAsset) {
      throw new ConflictError("Asset code already exists");
    }

    const location =
      await locationRepository.getLocationById(data.locationId);

    if (!location) {
      throw new NotFoundError("Location not found");
    }

    return assetRepository.create(data);
  }

  async updateAsset(
    id: number,
    data: UpdateAssetDto
  ) {
    await this.getAssetById(id);

    if (data.assetCode) {
      const existingAsset =
        await assetRepository.getAssetByCode(data.assetCode);

      if (existingAsset && existingAsset.id !== id) {
        throw new ConflictError("Asset code already exists");
      }
    }

    if (data.locationId !== undefined) {
      const location =
        await locationRepository.getLocationById(data.locationId);

      if (!location) {
        throw new NotFoundError("Location not found");
      }
    }

    return assetRepository.update(id, data);
  }

  async deleteAsset(id: number) {
    await this.getAssetById(id);

    return assetRepository.delete(id);
  }
}

export default new AssetService();