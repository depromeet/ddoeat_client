import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '../../api/api-config';

interface Store {
  // TODO: spec 확정 시 수정
  storeId: string;
  storeName: string;
  revisitNum: number;
  menuType: string;
  location: string;
  distance: string;
}

const getStoreList = (keyword: string): Promise<Store[]> => {
  return axiosRequest('get', `endpoint/${keyword}`);
};

export const useGetStoreList = (
  keyword: string,
): UseQueryResult<Store[], AxiosError> => {
  return useQuery({
    queryKey: ['get-store-list', keyword],
    queryFn: () => getStoreList(keyword),
    enabled: !!keyword,
  });
};
