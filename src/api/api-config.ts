import axios from 'axios';
import Cookies from 'js-cookie';

import { TOKEN_REFRESH_URL } from '@constants/endpoint';
import { getTokenRefresh } from '@utils/getTokenRefresh';

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

    // 토큰 재발급 요청 시 헤더 세팅
    if (config.url === TOKEN_REFRESH_URL && refreshToken) {
      config.headers['Authorization-refresh'] = refreshToken;
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    // NOTE: 브라우저 쿠키에 accessToken이 있고, 요청 헤더에 토큰이 없다면 헤더에 accessToken 추가
    if (
      accessToken &&
      !config.headers['Authorization'] &&
      config.url !== TOKEN_REFRESH_URL
    ) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
    // NOTE: 토큰 재발급 요청이고, 401에러가 아니면 에러 던지기
    if (
      config.url === TOKEN_REFRESH_URL ||
      response.data.code !== 401 ||
      config.sent
    ) {
      return Promise.reject(error);
    }

    config.sent = true;
    const refreshToken = Cookies.get('refreshToken');

    // NOTE: 토큰 재발급 요청
    if (response.data.code === 401 && refreshToken) {
      const { data } = await getTokenRefresh();
      Cookies.set('accessToken', data.accessToken);
      config.headers['Authorization'] = data.accessToken;
    }
    return axios(config);
  },
);

export const axiosRequest = async <T>(
  method: Method,
  url: string,
  data?: Record<string, unknown>,
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
