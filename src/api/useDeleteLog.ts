import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from './api-config';

const deleteLog = (storeId: string): Promise<void> => {
  return axiosRequest('delete', `endpoint/${storeId}`);
};

export const useDeleteLog = (): UseMutationResult<void, AxiosError, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-log'],
    mutationFn: (storeId) => deleteLog(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temp-log-list'] });
    },
  });
};
