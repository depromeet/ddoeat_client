import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest, ApiResponse } from '@api/api-config';
import { Feed } from 'src/types/feed';

interface GetFeedListArgs {
  lastIdxId?: number | undefined;
  size?: number;
}

interface GetStoreFeedListArgs extends GetFeedListArgs {
  storeId?: number;
}

interface FeedListResponse {
  content: Feed[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

const getFeedList = ({
  lastIdxId,
  size,
}: GetFeedListArgs): Promise<ApiResponse<FeedListResponse>> => {
  const queryString = `&lastIdxId=${lastIdxId}&size=${size}`;
  return axiosRequest('get', `/api/v1/feeds?type=ALL${queryString}`);
};

const getStoreFeedList = ({
  storeId,
  lastIdxId,
  size,
}: GetStoreFeedListArgs): Promise<ApiResponse<FeedListResponse>> => {
  const queryString = `lastIdxId=${lastIdxId}&size=${size}`;
  return axiosRequest('get', `/api/v1/stores/${storeId}/feeds?${queryString}`);
};

export const useGetFeedList = (
  params: GetFeedListArgs = {},
): UseInfiniteQueryResult<ApiResponse<FeedListResponse>[], AxiosError> => {
  return useInfiniteQuery({
    queryKey: ['get-feed-list', params],
    queryFn: (context) => {
      const lastIdxId = context.pageParam ?? 0;
      const size = params.size ?? 10;
      return getFeedList({ ...params, lastIdxId, size });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) {
        return lastPage.data.content[lastPage.data.content.length - 1].feedId;
      }
      return undefined;
    },
    select: (data) => data.pages,
  });
};

export const useGetStoreFeedList = (
  params: GetStoreFeedListArgs = {},
): UseInfiniteQueryResult<ApiResponse<FeedListResponse>[], AxiosError> => {
  return useInfiniteQuery({
    queryKey: ['get-feed-list', params],
    queryFn: (context) => {
      const lastIdxId = context.pageParam ?? 0;
      const size = params.size ?? 10;
      return getStoreFeedList({ ...params, lastIdxId, size });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) {
        return lastPage.data.content[lastPage.data.content.length - 1].feedId;
      }
      return undefined;
    },
    select: (data) => data.pages,
  });
};
