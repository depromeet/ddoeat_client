export interface AppleSigninResponse {
  authorization: {
    code: string;
    id_token: string;
    state: string;
  };
}
