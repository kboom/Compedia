import type { AppThunk } from "src/store";
import { CreateTaskModalActionType } from "./create-task.reducer";
import { CreateTaskModalPayload } from "./create-task.state";
import { getParentTasks, getTags, createTask } from "../create-task.api";
import { CreatedTask } from "../create-task.models";

export const loadParentTasksAction =
  (): AppThunk<CreateTaskModalPayload> => async (dispatch) => {
    dispatch({
      type: CreateTaskModalActionType.LOAD_PARENT_TASKS_START,
    });
    try {
      const parentTasks = await getParentTasks();
      dispatch({
        type: CreateTaskModalActionType.LOAD_PARENT_TASKS_SUCCESS,
        payload: {
          parentTasks,
        },
      });
    } catch (e) {
      dispatch({
        type: CreateTaskModalActionType.LOAD_PARENT_TASKS_FAILURE,
      });
    }
  };

export const loadTagsAction =
  (): AppThunk<CreateTaskModalPayload> => async (dispatch) => {
    dispatch({
      type: CreateTaskModalActionType.LOAD_TAGS_START,
    });
    try {
      const tags = await getTags();
      dispatch({
        type: CreateTaskModalActionType.LOAD_TAGS_SUCCESS,
        payload: {
          tags,
        },
      });
    } catch (e) {
      dispatch({
        type: CreateTaskModalActionType.LOAD_TAGS_FAILURE,
      });
    }
  };

export const createTaskAction =
  (task: CreatedTask): AppThunk<CreateTaskModalPayload> =>
  async (dispatch) => {
    dispatch({
      type: CreateTaskModalActionType.CREATE_TASK_START,
    });
    try {
      const newlyCreatedTask = await createTask(task);
      dispatch({
        type: CreateTaskModalActionType.CREATE_TASK_SUCCESS,
        payload: { newlyCreatedTask },
      });
    } catch (e) {
      dispatch({
        type: CreateTaskModalActionType.CREATE_TASK_FAILURE,
      });
    }
  };

export const dismissCreateTaskFailedAction = {
  type: CreateTaskModalActionType.DISMISS_CREATE_TASK_FAILED,
};

export const resetCreateTaskAction = {
  type: CreateTaskModalActionType.RESET_CREATE_TASK,
};
