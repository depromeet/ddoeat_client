import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { axiosRequest } from '@api/api-config';

const postWithdraw = (): Promise<void> => {
  return axiosRequest('delete', '/api/v1/users/withdraw');
};

export const usePostWithdraw = (): UseMutationResult<
  void,
  AxiosError,
  void
> => {
  const { push } = useRouter();
  return useMutation({
    mutationKey: ['post-withdraw'],
    mutationFn: postWithdraw,
    onSuccess: () => {
      push('/login');
    },
  });
};
