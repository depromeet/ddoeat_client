export interface Coordinate {
  lat: number;
  lng: number;
}

export interface StoreIds {
  id?: string;
  kakaoId?: string;
}

export type CoordinateWithIds = Coordinate & StoreIds;
