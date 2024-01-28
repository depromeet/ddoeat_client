import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '@api/api-config';

export interface NewStore {
  storeName: string;
  latitude: number;
  longitude: number;
  categoryId: number;
  address: string;
  categoryType: string;
  kakaoStoreId: number;
  kakaoCategoryName: string;
}

// TODO: api spec 확정되면 변경
interface Log {
  storeId: string | null;
  newStore: NewStore | null;
  rating: number;
  visitedAt: string;
  imageUrl: string;
  description: string;
}

interface LogWriteResponse {
  reviewId: number;
  storeId: number;
}

const postLog = ({ ...props }: Log): Promise<ApiResponse<LogWriteResponse>> => {
  const body = {
    ...props,
  };
  return axiosRequest('post', `/api/v1/stores/reviews`, body);
};

export const usePostLog = (
  options?: UseMutationOptions<ApiResponse<LogWriteResponse>, AxiosError, Log>,
): UseMutationResult<ApiResponse<LogWriteResponse>, AxiosError, Log> => {
  return useMutation({
    mutationKey: ['post-log'],
    mutationFn: ({ ...props }) => postLog({ ...props }),
    ...options,
  });
};
