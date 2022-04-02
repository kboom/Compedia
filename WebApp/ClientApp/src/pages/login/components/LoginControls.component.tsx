import { FunctionComponent, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LoginControlsProps = Readonly<{
  disabled: boolean;
}>;

export const LoginControls: FunctionComponent<LoginControlsProps> = ({ disabled }) => (
  <Fragment>
    <button
      type="submit"
      disabled={disabled}
      className="button is-info is-medium is-fullwidth"
    >
      <span>Login</span>
      <span className="icon">
        <FontAwesomeIcon icon="sign-in-alt" />
      </span>
    </button>
  </Fragment>
);

export default LoginControls;
