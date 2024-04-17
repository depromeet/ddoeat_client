import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface ContentData {
  feedId: number;
  userId: number;
  storeId: string;
  storeName: string;
  kakaoStoreId: number;
  address: string;
  feedImageUrl: string;
  feedCreatedAt: string;
  likeCnt: number;
  commentCnt: number;
  isHeartFeed: boolean;
}

interface ProfileFeed {
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

export interface GetProfileFeedParams {
  userId: number;
  lastIdxId?: number;
  size?: number;
}

const getProfileFeed = ({
  userId,
  lastIdxId,
  size,
}: GetProfileFeedParams): Promise<ApiResponse<ProfileFeed>> => {
  const queryString = `&lastIdxId=${lastIdxId}&size=${size}`;

  return axiosRequest('get', `/api/v1/profile/${userId}/feeds?${queryString}`);
};

export const useInfiniteGetProfileFeed = (
  params: GetProfileFeedParams,
): UseInfiniteQueryResult<ApiResponse<ProfileFeed>[], Error> => {
  return useInfiniteQuery({
    queryKey: ['get-profileFeed', params],
    queryFn: (context) => {
      const lastIdxId = context.pageParam ?? 0;
      const size = params.size ?? 10;
      return getProfileFeed({ ...params, lastIdxId, size });
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
