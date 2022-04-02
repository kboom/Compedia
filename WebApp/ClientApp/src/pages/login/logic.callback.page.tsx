import { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { oidcActionCreators } from "src/store/oidc/oidc.actions";

export const LoginCallbackPage: FunctionComponent = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(oidcActionCreators.newLoginCallbackRequest());
	}, [dispatch]);
	return <div>Signing you in...</div>;
};
