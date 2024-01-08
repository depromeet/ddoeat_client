import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@api/api-config';

const patchBookmark = (storeId: string): Promise<void> => {
  return axiosRequest('patch', `endpoint=${storeId}`);
};

//TODO: 인터페이스 나오면 타입 수정
const usePatchBookmark = (
  options?: UseMutationOptions<void, AxiosError, string, { markers: string[] }>,
): UseMutationResult<void, AxiosError, string, { markers: string[] }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['patch-bookmark'],
    mutationFn: (storeId) => patchBookmark(storeId),
    onMutate: async (storeId) => {
      //TODO: 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ['temp-markers'] });
      const previousMarkers = queryClient.getQueryData<{ markers: string[] }>([
        'temp-markers',
      ]);

      if (previousMarkers) {
        queryClient.setQueryData<{ markers: string[] }>(['temp-markers'], {
          markers: previousMarkers.markers.map((marker) =>
            // TODO: 로직 수정
            marker === storeId ? marker : marker,
          ),
        });
      }

      return previousMarkers;
    },
    onError: (_, __, context) => {
      if (context?.markers) {
        queryClient.setQueryData(['temp-markers'], {
          markers: context.markers,
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['temp-markers'] });
    },
    ...options,
  });
};

export default usePatchBookmark;
