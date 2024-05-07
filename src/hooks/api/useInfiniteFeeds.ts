import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface ContentData {
  userId: number;
  reviewId: number;
  nickName: string;
  rating: number;
  imageUrl: string;
  visitTimes: number;
  visitedAt: string;
  description: string;
  isMine: boolean;
}

interface FeedsProps {
  content: ContentData[];
  pageable: string;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetFeedsParams {
  storeId: string;
  page?: number;
  type: 'REVISITED' | 'PHOTO' | null;
}

const getFeeds = ({
  storeId,
  page,
  type,
}: GetFeedsParams): Promise<ApiResponse<FeedsProps>> => {
  let queryString = `page=${page}`;

  if (type) queryString += `&type=${type}`;

  return axiosRequest('get', `/api/v1/stores/${storeId}/feeds?${queryString}`);
};

export const useInfiniteFeeds = (
  params: GetFeedsParams,
): UseInfiniteQueryResult<ApiResponse<FeedsProps>[], Error> => {
  return useInfiniteQuery({
    queryKey: ['get-review', params],
    queryFn: ({ pageParam = 0 }) => getFeeds({ ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) {
        return lastPage.data.number + 1;
      }
      return undefined;
    },
    select: (data) => data.pages,
    enabled: !!params.storeId,
  });
};
