import { Task } from "src/pages/tasks/models";
import { ReduxAction } from "src/store";
import { ParentTaskList, TagList } from "../create-task.models";
import {
  CreateTaskModalPayload,
  CreateTaskModalState,
} from "./create-task.state";

const initialState: CreateTaskModalState = {
  loadingTasks: false,
  loadingTags: false,
  creatingTask: false,
  creatingTaskFailed: false,
};

export enum CreateTaskModalActionType {
  RESET_CREATE_TASK = "@@create-task/create-task/reset",
  LOAD_PARENT_TASKS_START = "@@create-task/parents-load/start",
  LOAD_PARENT_TASKS_SUCCESS = "@@create-task/parents-load/success",
  LOAD_PARENT_TASKS_FAILURE = "@@create-task/parents-load/failure",
  LOAD_TAGS_START = "@@create-task/tags-load/start",
  LOAD_TAGS_FAILURE = "@@create-task/tags-load/failure",
  LOAD_TAGS_SUCCESS = "@@create-task/tags-load/success",
  CREATE_TASK_START = "@@create-task/create-task/start",
  CREATE_TASK_SUCCESS = "@@create-task/create-task/success",
  CREATE_TASK_FAILURE = "@@create-task/create-task/failure",
  DISMISS_CREATE_TASK_FAILED = "@@create-task/create-task/dismiss-failure",
}

export const createTasksModalReducer = (
  state: CreateTaskModalState = initialState,
  action: ReduxAction<CreateTaskModalPayload>
): CreateTaskModalState => {
  switch (action.type) {
    case CreateTaskModalActionType.LOAD_PARENT_TASKS_START:
      return { ...state, loadingTasks: true };
    case CreateTaskModalActionType.LOAD_PARENT_TASKS_SUCCESS:
      const parentTaskList = action.payload?.parentTasks as ParentTaskList;
      return { ...state, loadingTasks: false, parentTasks: parentTaskList };
    case CreateTaskModalActionType.LOAD_PARENT_TASKS_FAILURE:
      return { ...state, loadingTasks: false };
    case CreateTaskModalActionType.LOAD_TAGS_START:
      return { ...state, loadingTags: true };
    case CreateTaskModalActionType.LOAD_TAGS_SUCCESS:
      const tags = action.payload?.tags as TagList;
      return { ...state, loadingTags: false, tags };
    case CreateTaskModalActionType.LOAD_TAGS_FAILURE:
      return { ...state, loadingTags: false };
    case CreateTaskModalActionType.CREATE_TASK_START:
      return { ...state, creatingTask: true };
    case CreateTaskModalActionType.CREATE_TASK_FAILURE:
      return { ...state, creatingTask: false, creatingTaskFailed: true };
    case CreateTaskModalActionType.CREATE_TASK_SUCCESS:
      const newlyCreatedTask = action.payload?.newlyCreatedTask as Task;
      return { ...state, newlyCreatedTask, creatingTask: false };
    case CreateTaskModalActionType.DISMISS_CREATE_TASK_FAILED:
      return { ...state, creatingTaskFailed: false };
    case CreateTaskModalActionType.RESET_CREATE_TASK:
      return initialState;
    default:
      return state;
  }
};
