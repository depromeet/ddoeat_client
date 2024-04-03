import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Feed } from 'src/types/feed';
import { ApiResponse, axiosRequest } from '@api/api-config';

const getFeedDetail = (feedId: number): Promise<ApiResponse<Feed>> => {
  return axiosRequest('get', `/api/v1/feeds/${feedId}`);
};

export const useGetFeedDetail = (
  feedId: number,
): UseQueryResult<Feed, AxiosError> => {
  return useQuery({
    queryKey: ['get-feed-detail', feedId],
    queryFn: () => getFeedDetail(feedId),
    select: (data) => data.data,
  });
};
