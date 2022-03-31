import { loginAsync } from "../../api";
import { AccountActionType } from "./account.types";

import type { AppThunk, ReduxAction } from "..";
import type {
  IOauthToken,
  AccountPayload,
  ICredentials,
} from "./account.types";

export const accountActionCreators = {
  loginFromRefresh: (oauth2Token: IOauthToken) => ({
    type: AccountActionType.LOGIN_SUCCESS,
    payload: { oauth2Token },
  }),
  tryLoginFromRefresh: (): AppThunk<AccountPayload> => async (dispatch) => {
    try {
      const oauth2Token = await loginAsync();
      dispatch({
        type: AccountActionType.LOGIN_SUCCESS,
        payload: { oauth2Token },
      });
    } catch (e) {
      dispatch({
        type: AccountActionType.LOGOUT,
      });
    }
  },
  signOut: (): ReduxAction => ({
    type: AccountActionType.LOGOUT,
  }),
  resetState: (): ReduxAction => ({
    type: AccountActionType.RESET_STATE,
  }),
  login:
    (credentials: ICredentials): AppThunk<AccountPayload> =>
    async (dispatch) => {
      dispatch({
        type: AccountActionType.LOGIN,
      });
      try {
        const oauth2Token = await loginAsync(credentials);
        dispatch({
          type: AccountActionType.LOGIN_SUCCESS,
          payload: { oauth2Token },
        });
      } catch (e) {
        dispatch({
          type: AccountActionType.LOGIN_UNAVAILABLE,
        });
      }
    },
};
