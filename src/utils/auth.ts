import { ApiResponse, axiosRequest } from '@api/api-config';

interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const getTokenRefresh = async (): Promise<
  ApiResponse<TokenRefreshResponse>
> => {
  return await axiosRequest('post', '/api/v1/auth/token/reissue');
};

export const logout = async (): Promise<void> => {
  return axiosRequest('post', '/api/v1/auth/logout');
};
