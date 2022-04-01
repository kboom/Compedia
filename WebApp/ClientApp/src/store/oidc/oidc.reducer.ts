import { ReduxAction } from "..";
import { OidcAction, OidcState, OidcPayload } from "./oidc.types";

const loggedOutState: OidcState = {
	user: null,
};

export const createStateFromUser = (payload: OidcPayload): OidcState => {
	return payload.user ? { user: payload.user } : loggedOutState;
};

const reducer = (
	state: OidcState = loggedOutState,
	action: ReduxAction<OidcPayload>
): OidcState => {
	switch (action.type) {
		case OidcAction.OIDC_USER_UNLOADED:
			return Object.assign({}, state, loggedOutState);

		case OidcAction.OIDC_USER_LOADED:
			return createStateFromUser(action.payload!);

		case OidcAction.OIDC_USER_SIGNED_OUT:
			return Object.assign({}, state, loggedOutState);

		case OidcAction.OIDC_SILENT_RENEW_ERROR:
			return Object.assign({}, state, loggedOutState);

		case OidcAction.OIDC_ACCESS_TOKEN_EXPIRED:
		case OidcAction.OIDC_ACCESS_TOKEN_EXPIRING:
		case OidcAction.LOGIN_CALLBACK_REQUESTED:
		default:
			return state;
	}
};

export default reducer;
