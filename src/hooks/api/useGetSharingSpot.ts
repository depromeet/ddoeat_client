import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosRequest } from '../../api/api-config';
import { Pin } from './useGetPinList';

interface GetSharingSpotRequest {
  userId: string;
}

interface GetSharingSpotResponse {
  locationStoreList: Omit<Pin, 'isBookmarked'>[];
  userNickName: string;
}

const getSharingSpot = async ({ userId }: GetSharingSpotRequest) => {
  const response = await axiosRequest<AxiosResponse<GetSharingSpotResponse>>(
    'get',
    `/api/v1/stores/sharing-spot?userId=${userId}`,
  );

  return response.data;
};

const useGetSharingSpot = ({
  userId,
}: GetSharingSpotRequest): UseQueryResult<
  GetSharingSpotResponse,
  AxiosError
> => {
  return useQuery({
    queryKey: ['get-sharing-spot', userId],
    queryFn: () => getSharingSpot({ userId }),
  });
};

export default useGetSharingSpot;
