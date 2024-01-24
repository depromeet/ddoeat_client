import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { axiosRequest } from '@api/api-config';

interface NewStore {
  storeName: string;
  latitude: number;
  longitude: number;
  categoryId: number;
  address: string;
}

// TODO: api spec 확정되면 변경
interface Log {
  storeId: string | null;
  newStore: NewStore | null;
  rating: number;
  visitedAt: string;
  imageUrl: string;
  description: string;
}

const postLog = ({ ...props }: Log): Promise<void> => {
  const body = {
    ...props,
  };
  return axiosRequest('post', `/api/v1/stores/reviews`, body);
};

export const usePostLog = (): UseMutationResult<void, AxiosError, Log> => {
  const { push } = useRouter();
  return useMutation({
    mutationKey: ['post-log'],
    mutationFn: ({ ...props }) => postLog({ ...props }),
    onSuccess: () => {
      // TODO: 홈에서 작성 시 홈으로, 맛집 상세에서 작성 시 맛집 상세로 이동
      push('/');
    },
  });
};
