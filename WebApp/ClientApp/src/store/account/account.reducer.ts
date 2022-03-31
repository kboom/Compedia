import { AccountActionType, AccountStatusEnum } from "./account.types";
import type { ReduxAction } from "..";
import type {
  AccountState,
  AccountPayload,
  IOauthToken,
} from "./account.types";

const initialState: AccountState = {
  oauth2Token: null,
  status: AccountStatusEnum.UNKNOWN,
};

export const reducer = (
  state: AccountState = initialState,
  action: ReduxAction<AccountPayload>
): AccountState => {
  switch (action.type) {
    case AccountActionType.LOGIN_SUCCESS: {
      const oauth2Token = action!.payload as IOauthToken;
      return { oauth2Token, status: AccountStatusEnum.SIGNED_IN };
    }
    case AccountActionType.LOGOUT:
    case AccountActionType.RESET_STATE: {
      return { oauth2Token: null, status: AccountStatusEnum.SIGNED_OUT };
    }
    case AccountActionType.LOGIN: {
      return { oauth2Token: null, status: AccountStatusEnum.SIGNING_IN };
    }
    case AccountActionType.LOGIN_FAIL: {
      return { oauth2Token: null, status: AccountStatusEnum.SIGN_IN_FAILED };
    }
    case AccountActionType.LOGIN_UNAVAILABLE: {
      return { oauth2Token: null, status: AccountStatusEnum.UNAVAILABLE };
    }
    default:
      return state;
  }
};
