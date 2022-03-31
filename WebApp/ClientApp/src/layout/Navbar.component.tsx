import { useIsLoggedIn } from "../hooks";
import { useDispatch } from "react-redux";
import { Routes as routes } from "../config";
import { PageLinks } from "../config";
import type { Route } from "../config";
import type { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { Button } from "src/components";
import NavigationDropdown from "./NavigationDropdown.component";
import NavbarLink from "./NavbarLink.component";
import { accountActionCreators } from "../store/account/account.actions";

export const Navbar: FunctionComponent = () => {
  const isLoggedIn = useIsLoggedIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(accountActionCreators.signOut());
  };

  const navRoutes = routes.reduce((acc: Route[], r: Route) => {
    r.showInNav && acc.push(r);
    return acc;
  }, []);

  return (
    <nav
      role="navigation"
      className="navbar is-transparent"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img
            alt="logo"
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          ></img>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          {navRoutes.map(
            ({ path, name, params, isSecured }) =>
              (!isSecured || isLoggedIn) && (
                <NavbarLink key={name} path={path} params={params}>
                  {name}
                </NavbarLink>
              )
          )}
          {isLoggedIn && (
            <NavigationDropdown name="Account">
              <NavbarLink path="/profile">Profile</NavbarLink>
              <hr className="navbar-divider" />
              <NavbarLink onClick={signOut} path={PageLinks.mainPage}>
                Sign out
              </NavbarLink>
            </NavigationDropdown>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isLoggedIn && (
                <Button isPrimary onClick={() => navigate("?modal=new-task")}>
                  +Task
                </Button>
              )}
              {!isLoggedIn && (
                <Button isPrimary onClick={() => navigate(PageLinks.loginPage)}>
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
