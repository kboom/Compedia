import axios from "axios";
import { ServerPath } from "./paths";
import { accountActionCreators, getAccessToken } from "../store/account";
import { loginAsync } from "./account.api";
import { Store } from "redux";

const SERVER_URL = process.env["REACT_APP_SERVER_URL"];

const instance = axios.create({
  timeout: 5000,
  baseURL: `${SERVER_URL}/`,
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
            const rs = await loginAsync();
            store.dispatch(accountActionCreators.loginFromRefresh(rs));

            return instance(originalConfig);
          } catch (_error) {
            store.dispatch(accountActionCreators.signOut());
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default instance;
