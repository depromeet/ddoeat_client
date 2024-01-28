export interface Coordinate {
  lat: number;
  lng: number;
}

export interface StoreIds {
  storeId?: number;
  kakaoStoreId?: number;
}

interface StoreName {
  storeName?: string;
}

export type CoordinateWithIds = Coordinate & StoreIds & StoreName;
