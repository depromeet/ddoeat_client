import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '../../api/api-config';

export interface UserInfo {
  nickname: string;
  level: '맨밥이' | '배고픈' | '또밥이' | '또또밥이';
}

const getUserProfile = (): Promise<ApiResponse<UserInfo>> => {
  return axiosRequest('get', '/api/v1/users/profile');
};

export const useGetUserProfile = (): UseQueryResult<UserInfo, AxiosError> => {
  return useQuery({
    queryKey: ['get-userProfile'],
    queryFn: getUserProfile,
    select: (data) => data.data,
  });
};
