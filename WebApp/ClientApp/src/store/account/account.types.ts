/* eslint-disable @typescript-eslint/no-redeclare */

export enum AccountStatusEnum {
  UNKNOWN = "unknown",
  UNAVAILABLE = "unavailable",
  SIGN_IN_FAILED = "sign_in_failed",
  SIGNED_OUT = "signed_out",
  SIGNING_IN = "signing_in",
  SIGNED_IN = "signed_in",
}

export enum AccountActionType {
  LOGIN = "account/login",
  LOGIN_UNAVAILABLE = "account/loginUnavailable",
  LOGOUT = "account/logout",
  LOGIN_FAIL = "account/loginFail",
  RESET_STATE = "account/resetState",
  LOGIN_SUCCESS = "account/loginSuccess",
}

export type ICredentials = {
  username?: string;
  password?: string;
};

export type IOauthToken = {
  access_token: string;
  refresh_token: string;
  iat: number;
  nbf: number;
  exp: number;
  sub: string;
};

export type AccountState = Readonly<{
  oauth2Token: IOauthToken | null;
  status: AccountStatusEnum;
}>;

export type AccountPayload = Partial<AccountState>;
