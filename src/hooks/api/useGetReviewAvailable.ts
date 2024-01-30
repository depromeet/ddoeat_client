import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosRequest } from '../../api/api-config';

interface ReviewAvailableRequest {
  storeId?: number;
}

interface ReviewAvailableResponse {
  isAvailable: boolean;
}

const getReviewAvailable = async ({ storeId }: ReviewAvailableRequest) => {
  const response = await axiosRequest<AxiosResponse<ReviewAvailableResponse>>(
    'get',
    `api/v1/stores/${storeId}/reviews/check-limit`,
  );

  return response.data;
};

const useGetReviewAvailable = ({
  storeId,
}: ReviewAvailableRequest): UseQueryResult<
  ReviewAvailableResponse,
  AxiosError
> => {
  return useQuery({
    queryKey: ['get-isAvailable', storeId],
    queryFn: () => getReviewAvailable({ storeId }),
    enabled: false,
    staleTime: 0,
  });
};

export default useGetReviewAvailable;
