import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@api/api-config';

const patchBookmark = (bookmarkId: number): Promise<void> => {
  return axiosRequest('delete', `/api/v1/bookmarks/${bookmarkId}`);
};

const usePatchBookmark = (): UseMutationResult<void, AxiosError, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-bookMark'],
    mutationFn: (storeId) => patchBookmark(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-bookMark', 'get-pin-list', 'get-store'],
      });
    },
  });
};

export default usePatchBookmark;
