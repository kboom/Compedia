import { memo } from "react";
import { classNames } from "src/utils";
import { useTextInput } from "src/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type UserNameInputProps = Readonly<{
  disabled: boolean;
  isInputInvalid: boolean;
  textInput: ReturnType<typeof useTextInput>;
}>;

export const UserNameInput = memo<UserNameInputProps>(
  ({ disabled = false, textInput, isInputInvalid }) => {
    const { hasValue, bindToInput } = textInput;

    const className = classNames([
      "input",
      isInputInvalid && !hasValue && "is-danger",
    ]);

    return (
      <div className="field">
        <div className="control has-icons-left">
          <input
            autoFocus
            {...bindToInput}
            className={className}
            disabled={disabled}
            placeholder="Username"
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon="user" />
          </span>
        </div>
      </div>
    );
  }
);
