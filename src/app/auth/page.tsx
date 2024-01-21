import useStoreToken from '@hooks/useStoreToken';

export default function Page() {
  const { storeTokenToCookieAndRedirect } = useStoreToken();

  storeTokenToCookieAndRedirect();
  return <></>;
}
