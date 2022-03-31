import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { reducer } from "./account.reducer";
export { accountActionCreators } from "./account.actions";
export { getAccessToken } from "./account.selectors";
export { AccountActionType, AccountStatusEnum } from "./account.types";

export type {
  AccountPayload,
  IOauthToken,
  AccountState,
  ICredentials,
} from "./account.types";

export default persistReducer(
  {
    key: "account",
    storage: storage,
    whitelist: ["oauth2Token"],
  },
  reducer
);
