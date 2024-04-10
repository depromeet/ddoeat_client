import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface FollowingData {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  isFollowed: boolean;
}

interface FollowingDataList {
  data: FollowingData[];
}

const getFollowingList = (
  userId: number | null,
  type: 'FOLLOWER' | 'FOLLOWING',
): Promise<ApiResponse<FollowingDataList>> => {
  return axiosRequest('get', `/api/v1/follows/${userId}?type=${type}`);
};

export const useGetFollowingList = (
  userId: number | null,
  type: 'FOLLOWER' | 'FOLLOWING',
): UseQueryResult<FollowingDataList, AxiosError> => {
  return useQuery({
    queryKey: ['get-following-list', userId, type],
    queryFn: () => getFollowingList(userId, type),
    enabled: !!userId,
  });
};
