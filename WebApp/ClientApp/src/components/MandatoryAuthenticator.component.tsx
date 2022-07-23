import { Fragment, FunctionComponent } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSelectedState } from "../hooks";
import { isSignedIn } from "src/store/oidc/oidc.selectors";

interface MandatoryAuthenticatorProps {
	children?: React.ReactNode;
}

/**
 * Require authentication before displaying the wrapped children.
 * This stops the user from whatever he intends to do, so a loader is shown in their place.
 */
export const MandatoryAuthenticator: FunctionComponent<
	MandatoryAuthenticatorProps
> = ({ children }) => {
	const signedIn = useSelectedState(isSignedIn());
	const location = useLocation();

	if (signedIn) {
		return <Fragment>{children}</Fragment>;
	} else {
		return <Navigate to="/login" replace state={{ path: location.pathname }} />;
	}
};
