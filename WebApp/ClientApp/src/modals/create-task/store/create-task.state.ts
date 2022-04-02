import { Task } from "src/pages/tasks/models";
import { ParentTaskList, TagList } from "../create-task.models";

export type CreateTaskModalState = Readonly<{
  newlyCreatedTask?: Task;
  parentTasks?: ParentTaskList;
  tags?: TagList;
  loadingTasks: boolean;
  loadingTags: boolean;
  creatingTask: boolean;
  creatingTaskFailed: boolean;
}>;

export type CreateTaskModalPayload = Partial<CreateTaskModalState>;
