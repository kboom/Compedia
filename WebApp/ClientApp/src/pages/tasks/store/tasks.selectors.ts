import { RootState } from "src/store";

export const selectTask = (rootState: RootState) =>
  rootState.TasksPageReducer.task;
