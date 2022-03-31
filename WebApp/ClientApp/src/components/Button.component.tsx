import { FunctionComponent } from "react";
import { classNames } from "src/utils";

type ButtonProps = Readonly<{
  isPrimary?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  children: string;
  [otherOptions: string]: any;
}>;

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  isPrimary = false,
  isLoading = false,
  isDisabled = false,
  ...otherOptions
}) => {
  const buttonClasses = classNames([
    "button",
    isPrimary && "is-primary",
    isLoading && "is-loading",
  ]);

  return (
    <button {...otherOptions} className={buttonClasses} disabled={isDisabled}>
      <strong>{children}</strong>
    </button>
  );
};
