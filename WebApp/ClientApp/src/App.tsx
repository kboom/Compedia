import Layout from "src/layout/Layout";
import { hot } from "react-hot-loader/root";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router-dom";
import { Routes as routes, RouteComponent, TRANSITION_DEFAULT } from "./config";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { MandatoryAuthenticator, OptionalAuthenticator } from "src/components";

import type { FunctionComponent } from "react";

const App: FunctionComponent = () => {
	const location = useLocation();
	const cssKey = location.pathname?.split("/")[1] || "/";
	const curRoute = routes.find(
		(x) => x.path === cssKey || x.name.toLowerCase() === cssKey.toLowerCase()
	);
	const { timeout, classNames } = curRoute?.transition ?? TRANSITION_DEFAULT;

	const withSecurityMode = (isSecured: boolean, Component: RouteComponent) => {
		if (isSecured) {
			return (
				<MandatoryAuthenticator>
					<Component />
				</MandatoryAuthenticator>
			);
		} else {
			return (
				<OptionalAuthenticator>
					<Component />
				</OptionalAuthenticator>
			);
		}
	};

	return (
		<Layout>
			<SwitchTransition mode="out-in">
				<CSSTransition key={cssKey} timeout={timeout} classNames={classNames}>
					<Routes location={location}>
						{routes.map(({ path, isSecured, Component }) => (
							<Route
								key={path}
								path={path}
								element={withSecurityMode(isSecured, Component)}
							/>
						))}
					</Routes>
				</CSSTransition>
			</SwitchTransition>
		</Layout>
	);
};

export default hot(App);
