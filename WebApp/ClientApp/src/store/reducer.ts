import { combineReducers } from "redux";
import AccountReducer from "./account";
import TasksPageReducer from "src/pages/tasks/store";
import CreateTaskModalReducer from "src/modals/create-task/store";

import type { RootState } from "./index";

const reducer = () =>
  combineReducers<RootState>({
    account: AccountReducer,
    TasksPageReducer,
    CreateTaskModalReducer,
  });

export default reducer;
