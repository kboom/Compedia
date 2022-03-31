import { Fragment, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useSelectedState } from "../hooks";
import {
  isAccountStatus,
  hasNoTokenButUnknownStatus,
} from "../store/account/account.selectors";
import { AccountStatusEnum, accountActionCreators } from "src/store/account";

interface OptionalAuthenticatorProps {
  children?: React.ReactNode;
}

/**
 * Trigger signing in from session in the background without blocking a page.
 * This means that the user will be able to see the page after refresh with some components hidden.
 * Once the user is authenticated, the components will show themselves.
 * Failed authentication is effectively a no-op.
 */
export const OptionalAuthenticator: FunctionComponent<
  OptionalAuthenticatorProps
> = ({ children }) => {
  const isSignedIn = useSelectedState(
    isAccountStatus(AccountStatusEnum.SIGNED_IN)
  );
  const canSignInAutomatically = useSelectedState(hasNoTokenButUnknownStatus);
  const dispatch = useDispatch();

  if (!isSignedIn && canSignInAutomatically) {
    dispatch(accountActionCreators.tryLoginFromRefresh());
  }

  return <Fragment>{children}</Fragment>;
};
