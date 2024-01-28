import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { ApiResponse, axiosRequest } from '@api/api-config';

export interface ContentData {
  bookmarkId: number;
  storeId: number;
  storeName: string;
  address: string;
  totalRevisitedCount: number;
  categoryName: string;
  isVisited: boolean;
}

interface BookMark {
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

export interface GetBookMarkParams {
  page?: number;
  size?: number;
}

const getBookMark = ({
  page,
  size,
}: GetBookMarkParams): Promise<ApiResponse<BookMark>> => {
  const queryString = `page=${page}&size=${size}`;

  return axiosRequest('get', `/api/v1/users/bookmarks?${queryString}`);
};

export const useInfiniteGetBookMark = (
  params: GetBookMarkParams,
): UseInfiniteQueryResult<ApiResponse<BookMark>[], Error> => {
  return useInfiniteQuery({
    queryKey: ['get-bookMark', params],
    queryFn: ({ pageParam = 1 }) => getBookMark({ ...params, page: pageParam }),
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
