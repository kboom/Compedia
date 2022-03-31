import type { AppThunk } from "src/store";
import { TasksActionType } from "./tasks.reducer";
import { TasksPagePayload } from "./tasks.state";
import { getTask } from "../api";

export const loadTask =
  (taskId: string): AppThunk<TasksPagePayload> =>
  async (dispatch) => {
    dispatch({
      type: TasksActionType.LOAD_TASK_START,
    });
    try {
      const task = await getTask(taskId);
      dispatch({
        type: TasksActionType.LOAD_TASK_SUCCESS,
        payload: {
          task,
        },
      });
    } catch (e) {}
  };
