import { FunctionComponent } from "react";
import { useRadioInput } from "src/hooks";

export type RadioButtonProps = Readonly<{
  name: string;
  checkedByDefault?: boolean;
  value: string;
  children: React.ReactNode;
}>;

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
  name,
  checkedByDefault = false,
  value,
  children,
}) => {
  return (
    <label className="radio">
      <input
        type="radio"
        name={name}
        defaultChecked={checkedByDefault}
        value={value}
      />
      {children}
    </label>
  );
};

export type RadioGroupProps = Readonly<{
  //   textInput: ReturnType<typeof useTextInput>;
  name: string;
  radioInput: ReturnType<typeof useRadioInput>;
  children:
    | React.ReactElement<RadioButtonProps>
    | React.ReactElement<RadioButtonProps>[];
}>;

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  name,
  radioInput,
  children,
}) => {
  return (
    <div className="field" {...radioInput.bindToContainer}>
      <label className="label">{name}</label>
      <div className="control">{children}</div>
    </div>
  );
};
