import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '../../api/api-config';

const putUserName = (nickname: string): Promise<void> => {
  return axiosRequest('put', '/api/v1/users/nickname', { nickname });
};

export const usePutUserName = (
  options?: UseMutationOptions<void, AxiosError, string>,
): UseMutationResult<void, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['put-userName'],
    mutationFn: (nickname) => putUserName(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-userProfile'] });
    },
    ...options,
  });
};
