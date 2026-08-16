import {
  maintenance_status,
  maintenance_priority,
} from "@prisma/client";

export interface CreateMaintenanceDto {
  assetId: number;
  assignedToId: number;
  title: string;
  description?: string;
  scheduledDate: Date;
  completedDate?: Date;
  priority?: maintenance_priority;
  status?: maintenance_status;
}

export interface UpdateMaintenanceDto {
  assetId?: number;
  assignedToId?: number;
  title?: string;
  description?: string;
  scheduledDate?: Date;
  completedDate?: Date;
  priority?: maintenance_priority;
  status?: maintenance_status;
}