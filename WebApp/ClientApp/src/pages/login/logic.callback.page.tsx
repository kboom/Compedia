import { FunctionComponent, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageLinks } from "src/config";
import { useIsLoggedIn } from "src/hooks";
import { oidcActionCreators } from "src/store/oidc/oidc.actions";

export const LoginCallbackPage: FunctionComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useIsLoggedIn();

	useEffect(() => {
		dispatch(oidcActionCreators.newLoginCallbackRequest());
	}, [dispatch]);

	useEffect((): void => {
		if (isLoggedIn) {
			navigate(PageLinks.mainPage);
		}
	}, [navigate, isLoggedIn]);

	return <div>Signing you in...</div>;
};
