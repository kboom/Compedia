import { combineReducers } from "redux";
import OidcReducer from "./oidc/oidc.reducer";
import AccountReducer from "./account";
import TasksPageReducer from "src/pages/tasks/store";
import CreateTaskModalReducer from "src/modals/create-task/store";

import type { RootState } from "./index";

const reducer = () =>
	combineReducers<RootState>({
		oidc: OidcReducer,
		account: AccountReducer,
		TasksPageReducer,
		CreateTaskModalReducer,
	});

export default reducer;
