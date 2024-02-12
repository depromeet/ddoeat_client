import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
  const path = `/api/v1/auth/login?provider=apple&code=${code}&redirect_uri=${redirect_uri}`;

  return axiosRequest('get', path);
};

export default function useAppleLogin({
  code,
  redirect_uri,
}: LoginRequest): UseQueryResult<LoginResponse, AxiosError> {
  return useQuery({
    queryKey: ['apple-login'],
    queryFn: () => appleLogin({ code, redirect_uri }),
    enabled: false,
  });
}
