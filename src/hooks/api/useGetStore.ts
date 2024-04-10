import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosRequest } from '../../api/api-config';

interface StoreRequest {
  storeId?: number;
}

interface StoreResponse {
  storeId: number;
  categoryName: string;
  storeName: string;
  address: string;
  totalRating: number;
  totalReviewCount: number;
  feedImageUrls: string[];
  userId: number;
  myRevisitedCount: number;
  totalRevisitedCount: number;
  isBookmarked: boolean;
}

const getStore = async ({ storeId }: StoreRequest) => {
  const response = await axiosRequest<AxiosResponse<StoreResponse>>(
    'get',
    `/api/v1/stores/${storeId}`,
  );

  return response.data;
};

const useGetStore = ({
  storeId,
}: StoreRequest): UseQueryResult<StoreResponse, AxiosError> => {
  return useQuery({
    queryKey: ['get-store', storeId],
    queryFn: () => getStore({ storeId }),
    enabled: !!storeId,
  });
};

export default useGetStore;
