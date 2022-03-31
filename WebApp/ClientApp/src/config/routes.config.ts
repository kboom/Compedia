import type { ComponentType } from "react";
import type { Params } from "react-router";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { HomePage, LoginPage, TasksPage } from "../pages";

export const TRANSITION_DEFAULT = {
  classNames: "fade",
  timeout: { enter: 250, exit: 250 },
};

export type RouteComponent = ComponentType<any>;
export type TransitionMetaData = typeof TRANSITION_DEFAULT;

export type Route = Readonly<{
  name: string;
  path: string;
  icon?: IconProp;
  showInNav?: boolean;
  Component: RouteComponent;
  transition: TransitionMetaData;
  isSecured: boolean;
  params?: Readonly<Params<string>>;
}>;

export const Routes: Route[] = [
  {
    showInNav: true,
    path: "/",
    name: "Home",
    isSecured: false,
    Component: HomePage,
    transition: TRANSITION_DEFAULT,
  },
  {
    path: "/login",
    isSecured: false,
    icon: "sign-out-alt",
    name: "Login",
    Component: LoginPage,
    transition: TRANSITION_DEFAULT,
  },
  {
    showInNav: true,
    isSecured: true,
    name: "Tasks",
    path: "/tasks/:taskId",
    Component: TasksPage,
    transition: {
      classNames: "page-slide-left",
      timeout: { enter: 350, exit: 250 },
    },
    params: {
      taskId: "0",
    },
  },
];

export const findRouteByName = (name: String) =>
  Routes.find((x) => x.name === name)?.path ?? "/";

export const PageLinks: Readonly<{
  mainPage: string;
  loginPage: string;
  tasksPage: string;
}> = {
  mainPage: findRouteByName("Home"),
  loginPage: findRouteByName("Login"),
  tasksPage: findRouteByName("Tasks"),
};
