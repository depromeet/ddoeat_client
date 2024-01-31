import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useWebView = () => {
  useEffect(() => {
    if (!window?.ReactNativeWebView) return;

    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    //NOTE: 사용자가 앱을 껐다가 다시 접속할 때는 브라우저 토큰 보낼 필요 없음
    if (accessToken && refreshToken) {
      const message = JSON.stringify({ accessToken, refreshToken });
      window.ReactNativeWebView.postMessage(message);
    }
  }, []);
  return;
};

export default useWebView;
