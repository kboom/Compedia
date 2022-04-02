import { memo } from "react";
import { classNames } from "src/utils";
import { useTextInput } from "src/hooks";

type TextAreaProps = Readonly<{
  name: string;
  placeholder: string;
  disabled: boolean;
  isInputInvalid: boolean;
  textInput: ReturnType<typeof useTextInput>;
}>;

export const TextArea = memo<TextAreaProps>(
  ({ disabled = false, placeholder, name, textInput, isInputInvalid }) => {
    const { hasValue, isPristine, bindToInput } = textInput;

    const className = classNames([
      "textarea",
      !isPristine && isInputInvalid && !hasValue && "is-danger",
    ]);

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="control">
          <textarea
            autoFocus
            {...bindToInput}
            className={className}
            disabled={disabled}
            placeholder={placeholder}
          />
        </div>
        {!isPristine && isInputInvalid && (
          <p className="help is-danger">{placeholder}</p>
        )}
      </div>
    );
  }
);
