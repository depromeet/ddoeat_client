import Cookies from 'js-cookie';

import { ApiResponse, axiosRequest } from '@api/api-config';
import { TOKEN_NULL_MESSAGE } from '@constants/postmessage';

interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const removeTokenAndMoveToLogin = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  if (window?.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(TOKEN_NULL_MESSAGE);
  }
  window.location.href = '/login';
};

export const getTokenRefresh = async (): Promise<
  ApiResponse<TokenRefreshResponse>
> => {
  return await axiosRequest('post', '/api/v1/auth/token/reissue');
};

export const logout = async (): Promise<void> => {
  return axiosRequest('post', '/api/v1/auth/logout').then(() => {
    removeTokenAndMoveToLogin();
  });
};
