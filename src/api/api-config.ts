import axios from 'axios';

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

// 테스트를 위해 jsonplaceholder url를 넣었습니다.
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  function (config) {
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
  function (error) {
    return Promise.reject(error);
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
    ...(data && { data }),
    ...(headers && {
      headers: {
        ...headers,
      },
    }),
    ...(params && { params }),
  });

  return instance.data;
};
