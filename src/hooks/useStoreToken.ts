import Cookies from 'js-cookie';
import { useSearchParams, useRouter } from 'next/navigation';

export default function useStoreToken() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken') ?? '';
  const refreshToken = searchParams.get('refreshToken') ?? '';
  const isFirstLogin = searchParams.get('isFirst') ?? false;

  const storeTokenToCookieAndRedirect = () => {
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);

    if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
      isFirstLogin ? push('/') : push('/terms');
    }
  };

  return { storeTokenToCookieAndRedirect };
}
