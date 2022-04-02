import { TaskDetails } from "../models";

export type TasksPageState = Readonly<{
  task?: TaskDetails;
  loadingTask: boolean;
}>;

export type TasksPagePayload = Partial<TasksPageState>;
