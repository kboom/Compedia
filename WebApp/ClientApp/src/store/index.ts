import AccountReducer from "./account";
import OidcReducer from "src/store/oidc/oidc.reducer";
import TasksPageReducer from "src/pages/tasks/store";
import CreateTaskModalReducer from "src/modals/create-task/store";

import type { Action } from "redux";
import type { ThunkAction } from "redux-thunk";

export { default as createStore } from "./store";
export * as selectors from "./selectors";

export type RootState = Readonly<{
	oidc: ReturnType<typeof OidcReducer>;
	account: ReturnType<typeof AccountReducer>;
	TasksPageReducer: ReturnType<typeof TasksPageReducer>;
	CreateTaskModalReducer: ReturnType<typeof CreateTaskModalReducer>;
}>;

export interface ReduxAction<T = undefined> extends Action<string> {
	payload?: T;
}

export type AppThunk<T = undefined> = ThunkAction<
	void,
	RootState,
	unknown,
	ReduxAction<T>
>;
