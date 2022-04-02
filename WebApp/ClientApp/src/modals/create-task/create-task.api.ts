import axios, { createTaskPath, getTagsPath, getTasksPath } from "src/api";
import { TaskDetails } from "src/pages/tasks/models";
import { CreatedTask, ParentTaskList, TagList } from "./create-task.models";

export async function getParentTasks(): Promise<ParentTaskList> {
  const { data } = await axios.get<ParentTaskList>(getTasksPath());
  return data;
}

export async function getTags(): Promise<TagList> {
  const { data } = await axios.get<TagList>(getTagsPath());
  return data;
}

export async function createTask(task: CreatedTask): Promise<TaskDetails> {
  const { data } = await axios.post<TaskDetails>(createTaskPath(), task);
  return data;
}
