import { ReactNode, Fragment, FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ErrorControlsProps = Readonly<{
  error: boolean;
  children: ReactNode | ReactNode[];
  onReset: () => void;
}>;

export const ErrorControls: FunctionComponent<ErrorControlsProps> = ({
  error,
  children,
  onReset,
}) => {
  if (error) {
    return (
      <Fragment>
        <div className="block">There was an error!</div>
        <button
          type="submit"
          onClick={onReset}
          className="button is-info is-medium is-fullwidth"
        >
          <span>Try again</span>
          <span className="icon">
            <FontAwesomeIcon icon="sign-in-alt" />
          </span>
        </button>
      </Fragment>
    );
  } else {
    return <Fragment>{children}</Fragment>;
  }
};

ErrorControls.displayName = "ErrorControls";

export default ErrorControls;
