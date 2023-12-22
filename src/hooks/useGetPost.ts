import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface PostProps {
  body: string;
  id: number;
  title: string;
  userId: number;
}

// Promise return 함수
const getPost = (postSeq: number): Promise<ApiResponse<PostProps>> => {
  const path = '/posts';
  const query = `/${postSeq}`;
  return axiosRequest('get', `${path}${query}`);
};

// useQuery return 함수
export const useGetPost = (
  postSeq: number,
): UseQueryResult<PostProps, ApiResponse<PostProps>> => {
  return useQuery({
    queryKey: ['get-post', postSeq],
    queryFn: () => getPost(postSeq),
  });
};
