export declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(msg: string): void;
    };
  }
}

export const ReactNativeWebView = window.ReactNativeWebView;