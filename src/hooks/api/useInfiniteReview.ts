import { useInfiniteQuery } from '@tanstack/react-query';

import { axiosRequest } from '@api/api-config';

interface ContentData {
  userId: number;
  reviewId: string;
  nickName: string;
  rating: number;
  imageUrl: string;
  visitTimes: number;
  visitedAt: string;
  description: string;
  isMine: boolean;
}

interface ReviewProps {
  data: {
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
  };
}

export interface GetReviewParams {
  storeId: string;
  page?: number;
  size?: number;
  type: 'REVISITED' | 'PHOTO' | null;
}

const getReview = ({
  storeId,
  page,
  size,
  type,
}: GetReviewParams): Promise<ReviewProps> => {
  let queryString = `page=${page}&size=${size}`;

  if (type) queryString += `&type=${type}`;

  return axiosRequest(
    'get',
    `/api/v1/stores/${storeId}/reviews?${queryString}`,
  );
};

export const getReviewData = async (params: GetReviewParams) => {
  const res = await getReview(params);

  return res;
};

export const useInfiniteReview = (params: GetReviewParams) => {
  return useInfiniteQuery({
    queryKey: ['get-review', params],
    queryFn: ({ pageParam = 1 }) =>
      getReviewData({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.last) {
        return lastPage.data.number + 1;
      }
      return undefined;
    },
  });
};
