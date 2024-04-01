import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface FeedDetailType {
  userId: number;
  profileImg: string;
  nickname: string;
  storeId: number;
  storeName: string;
  kakaoCategoryName: string;
  address: string;
  feedId: number;
  description: string;
  feedImg: string;
  createdAt: string;
  isFollowed: boolean;
  rating: number;
}

const getFeedDetail = (
  feedId: number,
): Promise<ApiResponse<FeedDetailType>> => {
  return axiosRequest('get', `/api/v1/feeds/${feedId}`);
};

export const useGetFeedDetail = (
  feedId: number,
): UseQueryResult<FeedDetailType, AxiosError> => {
  return useQuery({
    queryKey: ['get-feed-detail', feedId],
    queryFn: () => getFeedDetail(feedId),
    select: (data) => data.data,
  });
};
