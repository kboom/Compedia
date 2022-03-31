import { Fragment, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { useSelectedState } from "../hooks";
import {
  isAccountStatus,
  hasNoTokenButUnknownStatus,
} from "../store/account/account.selectors";
import { AccountStatusEnum, accountActionCreators } from "src/store/account";

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
  const isSignedIn = useSelectedState(
    isAccountStatus(AccountStatusEnum.SIGNED_IN)
  );
  const canSignInAutomatically = useSelectedState(hasNoTokenButUnknownStatus);
  const location = useLocation();
  const dispatch = useDispatch();

  if (isSignedIn) {
    return <Fragment>{children}</Fragment>;
  } else {
    if (canSignInAutomatically) {
      dispatch(accountActionCreators.tryLoginFromRefresh());
      return <div>Signing you in</div>;
    }

    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }
};
