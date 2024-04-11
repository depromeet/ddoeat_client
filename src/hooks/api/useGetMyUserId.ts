import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface MyUserIdData {
  userId: number;
  nickname: string;
  profileImageUrl: number;
}

const getMyUserId = (): Promise<ApiResponse<MyUserIdData>> => {
  return axiosRequest('get', '/api/v1/profile/me');
};

export const useGetMyUserId = (): UseQueryResult<MyUserIdData, AxiosError> => {
  return useQuery({
    queryKey: ['get-report'],
    queryFn: getMyUserId,
    select: (data) => data.data,
  });
};
