import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '../../api/api-config';

const deleteBookMark = (bookmarkId: string): Promise<void> => {
  return axiosRequest('delete', `/api/v1/bookmarks/${bookmarkId}`);
};

export const useDeleteBookMark = (): UseMutationResult<
  void,
  AxiosError,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-bookMark'],
    mutationFn: (storeId) => deleteBookMark(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-bookMark'] });
    },
  });
};
