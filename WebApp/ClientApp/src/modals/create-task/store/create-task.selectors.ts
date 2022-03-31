import { RootState } from "src/store";

export const selectIsLoadingTasks = (rootState: RootState) =>
  rootState.CreateTaskModalReducer.loadingTasks;

export const selectIsCreatingTask = (rootState: RootState) =>
  rootState.CreateTaskModalReducer.creatingTask;

export const selectIsCreatingTaskFailed = (rootState: RootState) =>
  rootState.CreateTaskModalReducer.creatingTaskFailed;

export const selectParentTasks = (rootState: RootState) =>
  rootState.CreateTaskModalReducer.parentTasks;

export const selectIsLoadingTags = (rootState: RootState) =>
  rootState.CreateTaskModalReducer.loadingTags;

export const selectTags = (rootState: RootState) =>
  rootState.CreateTaskModalReducer.tags;

export const selectNewlyCreatedTask = (rootState: RootState) =>
  rootState.CreateTaskModalReducer.newlyCreatedTask;
