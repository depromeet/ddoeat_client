import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { axiosRequest } from '@api/api-config';

const postSignUp = (): Promise<void> => {
  return axiosRequest('post', '/api/v1/auth/signup');
};

export const usePostSignUp = (): UseMutationResult<void, AxiosError, void> => {
  const { push } = useRouter();
  return useMutation({
    mutationKey: ['sign-up'],
    mutationFn: postSignUp,
    onSuccess: () => {
      push('/');
    },
  });
};
