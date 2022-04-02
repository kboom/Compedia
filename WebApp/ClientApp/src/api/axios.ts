import axios from "axios";
import { Store } from "redux";
import { oidcActionCreators } from "src/store/oidc/oidc.actions";
import { getAccessToken } from "src/store/oidc/oidc.selectors";
import { ServerPath } from "./paths";
import { globalConfig } from "../config/env";

const instance = axios.create({
	timeout: 5000,
	baseURL: `${globalConfig.baseApiUrl}/`,
});

export const configureToken = (store: Store) => {
	instance.interceptors.request.use(
		(config) => {
			const token = getAccessToken(store.getState());
			if (config?.headers && token) {
				config.headers["Authorization"] = "Bearer " + token;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			const originalConfig = err.config;

			if (originalConfig.url !== ServerPath.AccountPostToken && err.response) {
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;

					try {
						store.dispatch(oidcActionCreators.loginRequest());

						return instance(originalConfig);
					} catch (_error) {
						store.dispatch(oidcActionCreators.userSignedOut());
						return Promise.reject(_error);
					}
				}
			}

			return Promise.reject(err);
		}
	);
};

export default instance;
