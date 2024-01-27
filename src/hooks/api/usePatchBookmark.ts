import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@api/api-config';

const patchBookmark = (bookmarkId: string): Promise<void> => {
  return axiosRequest('delete', `/api/v1/bookmarks/${bookmarkId}`);
};

const usePatchBookmark = (): UseMutationResult<void, AxiosError, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-bookMark'],
    mutationFn: (storeId) => patchBookmark(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-bookMark'] });
    },
  });
};

export default usePatchBookmark;
