export interface CreateSensorReadingDto {
  assetId: number;
  locationId: number;
  temperature?: number;
  vibration?: number;
  voltage?: number;
  current?: number;
  humidity?: number;
  recordedAt?: Date;
}

export interface UpdateSensorReadingDto {
  assetId?: number;
  locationId?: number;
  temperature?: number;
  vibration?: number;
  voltage?: number;
  current?: number;
  humidity?: number;
  recordedAt?: Date;
}