import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '../../api/api-config';

interface StoreListQueries {
  keyword: string;
  longitude?: string;
  latitude?: string;
}

interface Store {
  // TODO: spec 확정 시 수정
  storeId: string;
  storeName: string;
  revisitNum: number;
  menuType: string;
  location: string;
  distance: string;
}

const getStoreList = ({
  keyword,
  longitude,
  latitude,
}: StoreListQueries): Promise<Store[]> => {
  return axiosRequest(
    'get',
    `/api/v1/stores/search?query=${keyword}&x=${longitude}&y=${latitude}`,
  );
};

export const useGetStoreList = ({
  keyword,
  longitude,
  latitude,
}: StoreListQueries): UseQueryResult<Store[], AxiosError> => {
  return useQuery({
    queryKey: ['get-store-list', keyword, longitude, latitude],
    queryFn: () => getStoreList({ keyword, longitude, latitude }),
    enabled: false,
  });
};
