import { Tag } from "src/model";

export type ParentTask = Readonly<{
  id: string;
  name: string;
  description: string;
}>;

export type ParentTaskList = Readonly<{
  content: ParentTask[];
}>;

export type TagList = Readonly<{
  content: Tag[];
}>;

export type CreatedTask = Readonly<{
  name: string;
  description: string;
  parentTaskId?: string;
  tags: Tag[];
}>;
