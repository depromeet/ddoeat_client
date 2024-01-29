import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@api/api-config';

const patchBookmark = (bookmarkId: number): Promise<void> => {
  return axiosRequest('patch', `/api/v1/bookmarks/${bookmarkId}`);
};

const usePatchBookmark = (): UseMutationResult<void, AxiosError, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['patch-bookMark'],
    mutationFn: (storeId) => patchBookmark(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-bookMark'],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: ['get-pin-list'],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: ['get-store'],
        refetchType: 'all',
      });
    },
  });
};

export default usePatchBookmark;
