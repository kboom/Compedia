import * as Oidc from "oidc-client";

export enum OidcAction {
	LOGIN_LOGIN_REQUESTED = "@oidc/LOGIN_REQUESTED",
	LOGIN_LOGOUT_REQUESTED = "@oidc/LOGOUT_REQUESTED",
	LOGIN_LOGGED_IN = "@oidc/LOGIN_LOGGED_IN",
	LOGIN_LOGGED_OUT = "@oidc/LOGGED_OUT",
	LOGIN_NETWORK_FAILED = "@oidc/LOGIN_NETWORK_FAILED",
	OIDC_USER_LOADED = "@oidc/USER_LOADED",
	OIDC_USER_UNLOADED = "@oidc/USER_UNLOADED",
	OIDC_ACCESS_TOKEN_EXPIRING = "@oidc/ACCESS_TOKEN_EXPIRING",
	OIDC_ACCESS_TOKEN_EXPIRED = "@oidc/ACCESS_TOKEN_EXPIRED",
	OIDC_SILENT_RENEW_ERROR = "@oidc/SILENT_RENEW_ERROR",
	OIDC_USER_SIGNED_OUT = "@oidc/USER_SIGNED_OUT",
	LOGIN_CALLBACK_REQUESTED = "@oidc/LOGIN_CALLBACK_REQUESTED",
}

export type OidcState = Readonly<{
	user: Oidc.User | null;
}>;

export type OidcPayload = Partial<OidcState>;

// https://github.com/mikebridge/IdentityServer4SignalR/blob/master/src/Web/src/redux-oidc/oidcConstants.ts
