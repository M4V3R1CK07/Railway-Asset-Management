import predictionRepository from "../repositories/prediction.repository.js";
import sensorReadingRepository from "../repositories/sensor-reading.repository.js";
import assetRepository from "../repositories/asset.repository.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ConflictError } from "../errors/ConflictError.js";
import {
  CreatePredictionDto,
  UpdatePredictionDto,
} from "../types/prediction.types.js";

class PredictionService {
  async getAllPredictions() {
    return predictionRepository.getAllPredictions();
  }

  async getPredictionById(id: number) {
    const prediction =
      await predictionRepository.getPredictionById(id);

    if (!prediction) {
      throw new NotFoundError("Prediction not found");
    }

    return prediction;
  }

  async getPredictionBySensorReadingId(
    sensorReadingId: number
  ) {
    const sensorReading =
      await sensorReadingRepository.getSensorReadingById(
        sensorReadingId
      );

    if (!sensorReading) {
      throw new NotFoundError("Sensor reading not found");
    }

    return predictionRepository.getPredictionBySensorReadingId(
      sensorReadingId
    );
  }

  async getPredictionsByAssetId(assetId: number) {
    const asset = await assetRepository.getAssetById(assetId);

    if (!asset) {
      throw new NotFoundError("Asset not found");
    }

    return predictionRepository.getPredictionsByAssetId(
      assetId
    );
  }

  async createPrediction(data: CreatePredictionDto) {
    const sensorReading =
        await sensorReadingRepository.getSensorReadingById(
        data.sensorReadingId
        );

    if (!sensorReading) {
        throw new NotFoundError("Sensor reading not found");
    }

    const asset = await assetRepository.getAssetById(
        data.assetId
    );

    if (!asset) {
        throw new NotFoundError("Asset not found");
    }

    if (sensorReading.assetId !== data.assetId) {
        throw new ConflictError(
        "Sensor reading does not belong to the specified asset"
        );
    }

    const existingPrediction =
        await predictionRepository.getPredictionBySensorReadingId(
        data.sensorReadingId
        );

    if (existingPrediction) {
        throw new ConflictError(
        "A prediction already exists for this sensor reading"
        );
    }

    return predictionRepository.create(data);
}

  async updatePrediction(
    id: number,
    data: UpdatePredictionDto
  ) {
    await this.getPredictionById(id);

    if (data.sensorReadingId !== undefined) {
      const sensorReading =
        await sensorReadingRepository.getSensorReadingById(
          data.sensorReadingId
        );

      if (!sensorReading) {
        throw new NotFoundError("Sensor reading not found");
      }

      const existingPrediction =
        await predictionRepository.getPredictionBySensorReadingId(
          data.sensorReadingId
        );

      if (
        existingPrediction &&
        existingPrediction.id !== id
      ) {
        throw new ConflictError(
          "A prediction already exists for this sensor reading"
        );
      }
    }

    if (data.assetId !== undefined) {
      const asset = await assetRepository.getAssetById(
        data.assetId
      );

      if (!asset) {
        throw new NotFoundError("Asset not found");
      }
    }

    return predictionRepository.update(id, data);
  }

  async deletePrediction(id: number) {
    await this.getPredictionById(id);

    return predictionRepository.delete(id);
  }
}

export default new PredictionService();