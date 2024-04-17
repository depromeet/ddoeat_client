import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosRequest } from '../../api/api-config';

interface userProfileImageProps {
  userId: number;
  profileImageUrl: string;
}

const putUserProfileImage = ({
  userId,
  profileImageUrl,
}: userProfileImageProps): Promise<void> => {
  return axiosRequest('put', `/api/v1/profile/${userId}/img`, {
    profileImageUrl,
  });
};

export const usePutProfileImage = (
  options?: UseMutationOptions<void, AxiosError, userProfileImageProps>,
): UseMutationResult<void, AxiosError, userProfileImageProps> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['put-userProfileImage'],
    mutationFn: (profileData: userProfileImageProps) =>
      putUserProfileImage(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-userProfile'] });
    },
    ...options,
  });
};
