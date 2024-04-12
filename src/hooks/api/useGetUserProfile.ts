import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '../../api/api-config';

export interface UserInfo {
  isMine: boolean;
  userId: number;
  profileImgUrl: string;
  nickname: string;
  feedCnt: number;
  follwerCnt: number;
  followingCnt: number;
  isFollowed: boolean;
}

const getUserProfile = (userId: number): Promise<ApiResponse<UserInfo>> => {
  return axiosRequest('get', `/api/v1/profile/${userId}`);
};

export const useGetUserProfile = (
  userId: number,
): UseQueryResult<UserInfo, AxiosError> => {
  return useQuery({
    queryKey: ['get-userProfile'],
    queryFn: () => getUserProfile(userId),
    select: (data) => data.data,
  });
};
