import { prediction_predictedStatus } from "@prisma/client";

export interface CreatePredictionDto {
  sensorReadingId: number;
  assetId: number;
  failureProbability: number;
  predictedStatus: prediction_predictedStatus;
  recommendation?: string;
  predictedAt?: Date;
}

export interface UpdatePredictionDto {
  sensorReadingId?: number;
  assetId?: number;
  failureProbability?: number;
  predictedStatus?: prediction_predictedStatus;
  recommendation?: string;
  predictedAt?: Date;
}