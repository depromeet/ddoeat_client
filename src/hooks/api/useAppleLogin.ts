import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { axiosRequest, ApiResponse } from '@api/api-config';

interface LoginRequest {
  code: string;
  redirect_uri: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  isFirst: boolean;
}

const appleLogin = ({
  code,
  redirect_uri,
}: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const path = '/api/v1/auth/login?provider=apple';
  const body = { code, redirect_uri };

  return axiosRequest('post', path, body);
};

export default function useAppleLogin(): UseMutationResult<
  ApiResponse<LoginResponse>,
  AxiosError,
  LoginRequest
> {
  const { push } = useRouter();
  return useMutation({
    mutationFn: ({ code, redirect_uri }) => appleLogin({ code, redirect_uri }),
    onSuccess: (data) => {
      console.log(data.data);
      Cookies.set('accessToken', data.data.accessToken);
      Cookies.set('refreshToken', data.data.refreshToken);

      if (data.data.isFirst) {
        push('/terms');
      } else {
        push('/');
      }
    },
  });
}
