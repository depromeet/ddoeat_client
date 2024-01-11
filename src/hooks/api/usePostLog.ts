import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { axiosRequest } from '../../api/api-config';

// TODO: api spec 확정되면 변경
interface Log {
  storeId: string;
  rating: number;
  storeImgUrl: string;
  description: string;
}

const postLog = ({ ...props }: Log): Promise<void> => {
  const body = {
    ...props,
  };
  return axiosRequest('post', `/endpoint`, body);
};

export const usePostLog = (): UseMutationResult<void, AxiosError, Log> => {
  const { push } = useRouter();
  return useMutation({
    mutationKey: ['post-log'],
    mutationFn: ({ ...props }) => postLog({ ...props }),
    onSuccess: () => {
      // TODO: 확정되면 변경
      push('/');
    },
  });
};
