import { FunctionComponent } from "react";
import { NavLink, generatePath } from "react-router-dom";

type NavbarLink = Readonly<{
  path: string;
  params?: any;
  children: string;
  [otherOptions: string]: any;
}>;

export const NavbarLink: FunctionComponent<NavbarLink> = ({
  children,
  path,
  params,
  ...otherOptions
}) => {
  return (
    <NavLink
      to={generatePath(path, params)}
      className={({ isActive }) =>
        "navbar-item" + (isActive ? " is-active" : "")
      }
      {...otherOptions}
    >
      {children}
    </NavLink>
  );
};

export default NavbarLink;
