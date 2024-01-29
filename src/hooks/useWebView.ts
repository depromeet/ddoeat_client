import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useWebView = () => {
  useEffect(() => {
    if (!window?.ReactNativeWebView) return;
    else {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      const message = JSON.stringify({ accessToken, refreshToken });
      window.ReactNativeWebView.postMessage(message);
    }
  }, []);
  return;
};

export default useWebView;
