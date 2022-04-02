export enum ServerPath {
  AccountPostToken = "/account/token",
}

export const getTaskPath = (taskId: string) => `/tasks/${taskId}`;
export const getTasksPath = () => "/tasks";
export const getTagsPath = () => "/tags";
export const createTaskPath = () => "/tasks";
