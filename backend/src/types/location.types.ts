export interface CreateLocationDto {
  stationCode: string;
  stationName: string;
  division: string;
  zone?: string;
}

export interface UpdateLocationDto {
  stationCode?: string;
  stationName?: string;
  division?: string;
  zone?: string;
}