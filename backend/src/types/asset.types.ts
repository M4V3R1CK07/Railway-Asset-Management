import { asset_status } from "@prisma/client";

export interface CreateAssetDto {
  assetCode: string;
  assetName: string;
  assetType: string;
  manufacturer?: string;
  installationDate?: Date;
  status?: asset_status;
  locationId: number;
}

export interface UpdateAssetDto {
  assetCode?: string;
  assetName?: string;
  assetType?: string;
  manufacturer?: string;
  installationDate?: Date;
  status?: asset_status;
  locationId?: number;
}