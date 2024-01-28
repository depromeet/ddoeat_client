import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { logout } from '@utils/auth';

export const useLogout = (): UseMutationResult<void, AxiosError, void> => {
  const { push } = useRouter();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      push('/login');
    },
  });
};
