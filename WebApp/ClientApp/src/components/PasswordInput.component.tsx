import { memo } from "react";
import { classNames } from "src/utils";
import { useTextInput } from "src/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PasswordInputProps = Readonly<{
  disabled: boolean;
  showPassword: boolean;
  isInputInvalid: boolean;
  toggleShowPassword: () => void;
  textInput: ReturnType<typeof useTextInput>;
}>;

export const PasswordInput = memo<PasswordInputProps>(
  ({
    disabled = false,
    textInput,
    showPassword,
    isInputInvalid,
    toggleShowPassword,
  }) => {
    const { hasValue, bindToInput } = textInput;

    const className = classNames([
      "input",
      "is-medium",
      isInputInvalid && !hasValue && "is-danger",
    ]);

    return (
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input
            {...bindToInput}
            className={className}
            placeholder="Password"
            autoComplete="password"
            disabled={disabled}
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon="lock" />
          </span>
          <span
            onClick={toggleShowPassword}
            className="icon is-right icon-clickable"
            data-tooltip={!showPassword ? "Show password" : "Hide password"}
          >
            <FontAwesomeIcon icon={!showPassword ? "eye" : "eye-slash"} />
          </span>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
