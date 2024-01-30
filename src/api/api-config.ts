import axios from 'axios';
import Cookies from 'js-cookie';

import { TOKEN_REFRESH_URL, LOGOUT_URL } from '@constants/endpoint';
import {
  getTokenRefresh,
  logout,
  removeTokenAndMoveToLogin,
} from '@utils/auth';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface ApiMeta {
  code: number;
  message: string;
}
export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta | null;
  error?: {
    code: number;
    detail: string;
    title: string;
    status: number;
  };
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (!config.headers) {
      return config;
    }

    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    // 쿠키에 토큰 전부 없을 시 로그인 페이지로 이동
    if (!accessToken && !refreshToken) {
      removeTokenAndMoveToLogin();
    }

    // NOTE: 토큰 재발급 요청 시 accessToken 헤더 삭제, refreshToken 헤더 추가
    if (config.url === TOKEN_REFRESH_URL && refreshToken) {
      delete config.headers['Authorization'];
      config.headers['Authorization-refresh'] = refreshToken;
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

      return config;
    }

    // NOTE: 브라우저 쿠키에 accessToken이 있고, 요청 헤더에 토큰이 없다면 헤더에 accessToken 추가
    if (
      accessToken &&
      !config.headers['Authorization'] &&
      config.url !== TOKEN_REFRESH_URL
    ) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // NOTE: 네이버 클라우드 이미지 업로드 요청 시 baseURL, accessToken 헤더 삭제
    if (
      config.url?.includes(process.env.NEXT_PUBLIC_NCLOUD_STORAGE_URL as string)
    ) {
      delete config.baseURL;
      delete config.headers['Authorization'];
    }

    // NOTE: 로그아웃 요청 시 헤더 변경
    if (config.url === LOGOUT_URL) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { config, response } = error;

    const refreshToken = Cookies.get('refreshToken');

    // NOTE: 토큰 재발급 요청이고, 401에러가 아니면 에러 던지기
    if (
      config.url === TOKEN_REFRESH_URL ||
      response.data.code !== 401 ||
      config.sent
    ) {
      return Promise.reject(error);
    }

    config.sent = true;

    // NOTE: 401 에러인데, refreshToken이 존재하지 않으면 로그아웃
    // NOTE: 토큰 재발급 요청
    if (
      config.url !== TOKEN_REFRESH_URL &&
      response.data.code === 401 &&
      refreshToken
    ) {
      const { data } = await getTokenRefresh();
      Cookies.set('accessToken', data.accessToken);
      config.headers['Authorization'] = data.accessToken;
      return axios(config);
    }

    // NOTE: 토큰 재발급 요청이 유효하지 않으면, 쿠키의 토큰을 삭제하고 로그아웃 처리. 로그인 페이지로 이동
    if (config.url === TOKEN_REFRESH_URL && response.data.code === 401) {
      logout();
    }
  },
);

export const axiosRequest = async <T>(
  method: Method,
  url: string,
  data?: FormData | File | Blob | ArrayBuffer | Record<string, unknown>, // FormData 또는 일반 객체를 허용
  headers?: Record<string, string>,
  params?: Record<string, unknown>,
): Promise<T> => {
  const instance = await axiosInstance.request<T>({
    method,
    url,
    data,
    headers,
    params,
  });

  return instance.data;
};
