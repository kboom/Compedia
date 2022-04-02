import { RootState } from "..";

export const getAccessToken = (state: RootState) =>
	state.oidc.user?.access_token;
