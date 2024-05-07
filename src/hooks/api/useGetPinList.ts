import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosRequest } from '../../api/api-config';

import { Categories } from 'src/types/tag';

export interface ScreenCoordinate {
  leftTopLatitude: number;
  leftTopLongitude: number;
  rightBottomLatitude: number;
  rightBottomLongitude: number;
}

interface UseGetPinListParams extends PinListRequest {
  isSearchType: boolean;
}
interface PinListRequest {
  type: Categories | null;
  screenCoordinate: ScreenCoordinate | null;
  level: number | null;
}

export interface Pin {
  address: string;
  isBookmarked: boolean;
  kakaoStoreId: number;
  latitude: number;
  longitude: number;
  storeId: number;
  storeName: string;
  // categoryId: number;
  // categoryName: string;
  // categoryType: string;
  // totalRevisitedCnt: number;
  totalFeedCnt: number;
}

interface PinListResponse {
  locationStoreList: Pin[];
}

const getPinList = async ({
  type,
  screenCoordinate,
  level,
}: PinListRequest) => {
  const response = await axiosRequest<AxiosResponse<PinListResponse>>(
    'get',
    '/api/v1/stores/location-range',
    undefined,
    undefined,
    {
      type: type ?? undefined,
      ...screenCoordinate,
      level,
    },
  );

  return response.data;
};

const useGetPinList = ({
  type,
  screenCoordinate,
  level,
  isSearchType,
}: UseGetPinListParams): UseQueryResult<PinListResponse, AxiosError> => {
  return useQuery({
    queryKey: ['get-pin-list', type],
    queryFn: () => getPinList({ type, screenCoordinate, level }),
    enabled: !!screenCoordinate && !!level && !isSearchType,
  });
};

export default useGetPinList;
