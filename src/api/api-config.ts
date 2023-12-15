import axios from 'axios';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const axiosInstance = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 3000,
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
