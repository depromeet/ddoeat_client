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
    if (
      config.url?.includes(process.env.NEXT_PUBLIC_NCLOUD_STORAGE_URL as string)
    ) {
      delete config.baseURL;
      delete config.headers['Authorization'];
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
  function (error) {
    return Promise.reject(error);
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
    data, // data 객체를 그대로 전달
    headers,
    params,
  });

  return instance.data;
};
