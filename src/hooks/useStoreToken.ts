import Cookies from 'js-cookie';
import { useSearchParams, useRouter } from 'next/navigation';

export default function useStoreToken(pathname: string) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken') ?? '';
  const refreshToken = searchParams.get('refreshToken') ?? '';

  const storeTokenToCookie = () => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);

    if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
      replace(pathname);
    }
  };

  return { storeTokenToCookie };
}
