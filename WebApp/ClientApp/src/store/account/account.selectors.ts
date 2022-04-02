import { RootState } from "..";
import { AccountStatusEnum } from "./account.types";
import { createSelector } from "reselect";

export const getAccessToken = (state: RootState) =>
  state.account.oauth2Token?.access_token;

export const isAccountStatus =
  (status: AccountStatusEnum) => (state: RootState) =>
    state.account.status === status;

export const hasNoTokenButUnknownStatus = createSelector(
  getAccessToken,
  isAccountStatus(AccountStatusEnum.UNKNOWN),
  (accessToken, statusUnknown) => statusUnknown && !accessToken
);
