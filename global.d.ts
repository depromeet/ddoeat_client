interface AppleIDAuth {
  auth: {
    init: (config: AppleIDAuthInitConfig) => void;
    signIn: (
      config?: AppleIDAuthSignInConfig,
    ) => Promise<AppleIDAuthSignInResponse>;
    signOut: () => Promise<void>;
  };
}

interface AppleIDAuthInitConfig {
  clientId: string | undefined;
  scope: string;
  redirectURI: string;
  state: string;
  nonce: string;
  usePopup: boolean;
}

interface AppleIDAuthSignInConfig {
  state?: string;
  nonce?: string;
  usePopup?: boolean;
}

interface AppleIDAuthSignInResponse {
  authorization: {
    state: string;
    code: string;
    id_token: string;
  };
  user?: {
    email: string;
    name: {
      firstName: string;
      lastName: string;
    };
  };
}
export declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage(msg: string): void;
    };
    AppleID: AppleIDAuth;
  }
}

export const ReactNativeWebView = window.ReactNativeWebView;
