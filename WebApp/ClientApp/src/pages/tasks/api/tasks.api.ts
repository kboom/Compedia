import axios, { getTaskPath } from "src/api";
import { TaskDetails } from "../models";

export async function getTask(taskId: string): Promise<TaskDetails> {
  const { data } = await axios.get<TaskDetails>(getTaskPath(taskId));
  return data;
}
