import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '@api/api-config';

interface UploadImageRequest {
  presignedUrl: string;
  file: File | null;
}

const uploadImageToNCloud = ({
  presignedUrl,
  file,
}: UploadImageRequest): Promise<void> => {
  const body = { ...file };
  const headers = {
    'Content-type': 'image/png',
  };
  return axiosRequest('put', presignedUrl, body, headers);
};

export const useUploadImageToNCloud = (): UseMutationResult<
  void,
  AxiosError,
  UploadImageRequest
> => {
  return useMutation({
    mutationKey: ['upload-image-to-ncloud'],
    mutationFn: ({ presignedUrl, file }: UploadImageRequest) =>
      uploadImageToNCloud({ presignedUrl, file }),
  });
};
