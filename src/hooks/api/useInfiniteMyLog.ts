import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface ContentData {
  reviewId: number;
  storeId: string;
  storeName: string;
  visitTimes: number;
  visitedAt: string;
  categoryName: string;
  rating: number;
  imageUrl: string;
  description: string;
}

interface MyLog {
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

export interface GetMyLogParams {
  page?: number;
  size?: number;
}

const getMyLog = ({
  page,
  size,
}: GetMyLogParams): Promise<ApiResponse<MyLog>> => {
  const queryString = `page=${page}&size=${size}`;

  return axiosRequest('get', `/api/v1/users/reviews?${queryString}`);
};

export const useInfiniteGetMyLog = (
  params: GetMyLogParams,
): UseInfiniteQueryResult<ApiResponse<MyLog>[], Error> => {
  return useInfiniteQuery({
    queryKey: ['get-myLog', params],
    queryFn: ({ pageParam = 1 }) => getMyLog({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) {
        return lastPage.data.number + 1;
      }
      return undefined;
    },
    select: (data) => data.pages,
  });
};
