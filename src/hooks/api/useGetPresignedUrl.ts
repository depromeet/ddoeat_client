import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse, axiosRequest } from '@api/api-config';

interface PresignedUrlResponse {
  presignedUrl: string;
}

const getPresignedUrl = (
  fileName: string,
): Promise<ApiResponse<PresignedUrlResponse>> => {
  return axiosRequest(
    'get',
    `/api/v1/images/presigned-url?fileName=${fileName}`,
  );
};

export const useGetPresignedUrl = (
  fileName: string,
): UseQueryResult<PresignedUrlResponse, AxiosError> => {
  return useQuery({
    queryKey: ['get-presigned-url', fileName],
    queryFn: () => getPresignedUrl(fileName),
    enabled: false,
    select: (data) => data.data,
  });
};
