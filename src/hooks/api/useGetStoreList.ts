import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '../../api/api-config';

interface StoreListQueries {
  keyword: string;
  longitude?: string;
  latitude?: string;
}

interface StoreSearch {
  address: string;
  categoryType: string;
  distance: number;
  kakaoCategoryName: string;
  kakaoStoreId: number;
  latitude: number;
  longitude: number;
  storeId: number | null;
  storeName: string;
  totalRevisitedCount: number;
}

interface StoreListResponse {
  storeSearchResult: StoreSearch[];
  storeIsEnd: boolean;
  cafeIsEnd: boolean;
}

const getStoreList = ({
  keyword,
  longitude,
  latitude,
}: StoreListQueries): Promise<ApiResponse<StoreListResponse>> => {
  return axiosRequest(
    'get',
    `/api/v1/stores/search?query=${keyword}&x=${longitude}&y=${latitude}&storePage=1&cafePage=1`,
  );
};

export const useGetStoreList = ({
  keyword,
  longitude,
  latitude,
}: StoreListQueries): UseQueryResult<StoreListResponse, AxiosError> => {
  return useQuery({
    queryKey: ['get-store-list', keyword, longitude, latitude],
    queryFn: () => getStoreList({ keyword, longitude, latitude }),
    enabled: false,
    staleTime: 0,
    gcTime: 0,
    select: (data) => data.data,
  });
};
