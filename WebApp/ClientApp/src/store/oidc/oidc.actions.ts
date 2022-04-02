import { OidcAction } from "./oidc.types";

const loggedIn = (user: any) => ({
	type: OidcAction.LOGIN_LOGGED_IN,
	user,
});

const loggedOut = () => ({
	type: OidcAction.LOGIN_LOGGED_OUT,
});

const loginRequest = (currentRoute: string) => ({
	type: OidcAction.LOGIN_LOGIN_REQUESTED,
	currentRoute,
});

const logoutRequest = () => ({
	type: OidcAction.LOGIN_LOGOUT_REQUESTED,
});

const newLoginCallbackRequest = (redirectRoute: string) => ({
	type: OidcAction.LOGIN_CALLBACK_REQUESTED,
	redirectRoute,
});

const loginNetworkFailed = (message: string) => ({
	type: OidcAction.LOGIN_NETWORK_FAILED,
	message,
});

const userLoaded = (user: any) => ({
	type: OidcAction.OIDC_USER_LOADED,
	user: user,
});

const userUnloaded = () => ({
	type: OidcAction.OIDC_USER_UNLOADED,
});

const userSignedOut = () => ({
	type: OidcAction.OIDC_USER_SIGNED_OUT,
});

const silentRenewError = () => ({
	type: OidcAction.OIDC_SILENT_RENEW_ERROR,
});

const accessTokenExpired = () => ({
	type: OidcAction.OIDC_ACCESS_TOKEN_EXPIRED,
});

const accessTokenExpiring = () => ({
	type: OidcAction.OIDC_ACCESS_TOKEN_EXPIRING,
});

export const oidcActionCreators: any = {
	loginRequest,
	newLoginCallbackRequest,
	logoutRequest,
	loggedIn,
	loggedOut,
	loginNetworkFailed,
	userLoaded,
	userUnloaded,
	userSignedOut,
	silentRenewError,
	accessTokenExpired,
	accessTokenExpiring,
};
