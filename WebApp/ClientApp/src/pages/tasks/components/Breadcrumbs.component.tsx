import { FunctionComponent, ReactElement } from "react";
import { NavLink, generatePath } from "react-router-dom";
import styled from "styled-components";
import { Progress } from "src/components";

type BreadCrumbItemProps = Readonly<{
  path: string;
  progress: number;
  params?: any;
  children: string;
}>;

const StyledBreadCrumb = styled.li`
  min-width: 100px;
  position: relative;

  > div {
    position: absolute;
    bottom: -15px;
    width: 100%;
    padding-left: 40px;
    padding-right: 20px;
    display: flex;
    justify-content: center;
  }

  :first-child {
    > div {
      padding-left: 5px;
    }
  }
`;

export const BreadcrumbItem: FunctionComponent<BreadCrumbItemProps> = ({
  path,
  progress,
  params,
  children,
}) => {
  return (
    <StyledBreadCrumb>
      <NavLink
        to={generatePath(path, params)}
        className={({ isActive }) =>
          isActive ? ' is-active aria-current="page"' : ""
        }
      >
        {children}
      </NavLink>
      <div>
        <Progress value={progress} max={100} />
      </div>
    </StyledBreadCrumb>
  );
};

type BreadcrumbProps = Readonly<{
  children:
    | ReactElement<typeof BreadcrumbItem>
    | ReactElement<typeof BreadcrumbItem>[];
}>;

export const Breadcrumbs: FunctionComponent<BreadcrumbProps> = ({
  children,
}) => {
  return (
    <nav
      className="breadcrumb has-succeeds-separator is-medium"
      aria-label="breadcrumbs"
    >
      <ul>{[children].flatMap((item) => item)}</ul>
    </nav>
  );
};
