import { ReduxAction } from "src/store";
import { TaskDetails } from "../models";
import { TasksPageState, TasksPagePayload } from "./tasks.state";

const initialState: TasksPageState = {
  loadingTask: false,
};

export enum TasksActionType {
  LOAD_TASK_START = "@@tasks/load/start",
  LOAD_TASK_SUCCESS = "@@tasks/load/success",
  LOAD_TASK_FAILURE = "@@tasks/load/failure",
}

export const tasksPageReducer = (
  state: TasksPageState = initialState,
  action: ReduxAction<TasksPagePayload>
): TasksPageState => {
  switch (action.type) {
    case TasksActionType.LOAD_TASK_START:
      return { ...state, loadingTask: true };
    case TasksActionType.LOAD_TASK_SUCCESS:
      const task = action.payload as TaskDetails;
      return { loadingTask: false, ...task };
    case TasksActionType.LOAD_TASK_FAILURE:
      return { ...state, loadingTask: false };
    default:
      return state;
  }
};
