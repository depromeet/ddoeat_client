import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useWebView = () => {
  useEffect(() => {
    if (!window?.ReactNativeWebView) return;

    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken != null && refreshToken != null) {
      const message = JSON.stringify({ accessToken, refreshToken });
      window.ReactNativeWebView.postMessage(message);
    }
  }, []);
  return;
};

export default useWebView;
