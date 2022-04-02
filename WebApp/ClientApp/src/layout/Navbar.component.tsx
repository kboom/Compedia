import type { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { Button } from "src/components";
import useProfile from "src/hooks/useProfile";
import type { Route } from "../config";
import { PageLinks, Routes as routes } from "../config";
import { useIsLoggedIn } from "../hooks";
import { oidcActionCreators } from "../store/oidc/oidc.actions";
import NavbarLink from "./NavbarLink.component";
import NavigationDropdown from "./NavigationDropdown.component";

export const Navbar: FunctionComponent = () => {
	const isLoggedIn = useIsLoggedIn();
	const profile = useProfile();
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const signIn = () => {
		dispatch(oidcActionCreators.loginRequest(pathname));
	};

	const signOut = () => {
		dispatch(oidcActionCreators.logoutRequest());
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
						<NavigationDropdown name={`Hi ${profile?.given_name}!`}>
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
								<Button isPrimary onClick={signIn}>
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
