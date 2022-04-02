import { memo } from "react";
import { classNames } from "src/utils";
import { useTextInput } from "src/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type TextInputProps = Readonly<{
  name: string;
  placeholder: string;
  disabled: boolean;
  isInputInvalid: boolean;
  textInput: ReturnType<typeof useTextInput>;
  icon?: IconProp;
}>;

export const TextInput = memo<TextInputProps>(
  ({
    disabled = false,
    icon = undefined,
    name,
    placeholder,
    textInput,
    isInputInvalid,
  }) => {
    const { hasValue, isPristine, bindToInput } = textInput;

    const className = classNames([
      "input",
      !isPristine && isInputInvalid && !hasValue && "is-danger",
    ]);

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="control has-icons-left">
          <input
            autoFocus
            {...bindToInput}
            className={className}
            disabled={disabled}
            placeholder={placeholder}
          />
          {icon && (
            <span className="icon is-left">
              <FontAwesomeIcon icon={icon} />
            </span>
          )}
        </div>
        {!isPristine && isInputInvalid && (
          <p className="help is-danger">{placeholder}</p>
        )}
      </div>
    );
  }
);
