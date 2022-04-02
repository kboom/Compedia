import { Tag } from "src/model";

export enum TaskPriority {
  LOW = "low",
  NORMAL = "normal",
  HIGH = "high",
}

export type Task = Readonly<{
  id: string;
  name: string;
  description: string;
  progressPercent: number;
  tags?: Tag[];
}>;

export type TaskDetails = Readonly<{
  createdAt: string;
  subtaskCount: number;
  priority: TaskPriority;
  supertasks: Task[];
  subtasks: Task[];
}> &
  Task;
