import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
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
interface Feed {
  storeId: string | null;
  newStore: NewStore | null;
  rating: number;
  visitedAt: string;
  imageUrl: string;
  description: string;
}

interface FeedWriteResponse {
  reviewId: number;
  storeId: number;
}

const postFeed = ({
  ...props
}: Feed): Promise<ApiResponse<FeedWriteResponse>> => {
  const body = {
    ...props,
  };
  return axiosRequest('post', `/api/v1/feeds`, body);
};

export const usePostFeed = (
  options?: UseMutationOptions<
    ApiResponse<FeedWriteResponse>,
    AxiosError,
    Feed
  >,
): UseMutationResult<ApiResponse<FeedWriteResponse>, AxiosError, Feed> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['post-feed'],
    mutationFn: ({ ...props }) => postFeed({ ...props }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-review'] });
    },
    ...options,
  });
};
