import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useSelect } from "src/hooks";
import { classNames } from "src/utils";

export type IdentifiableName = Readonly<{
  id: string;
  name: string;
}>;

export type DropdownProps = Readonly<{
  name: string;
  options?: IdentifiableName[];
  placeholder: string;
  select: ReturnType<typeof useSelect>;
  isLoading: boolean;
  isDisabled: boolean;
  icon?: IconProp;
}>;

export const Dropdown: FunctionComponent<DropdownProps> = ({
  name,
  icon,
  select,
  isLoading = false,
  isDisabled = false,
  options,
}) => {
  const { bindToInput } = select;

  const selectClasses = classNames(["select", isLoading && "is-loading"]);

  return (
    <div className="field">
      <label className="label">{name}</label>
      <div className="control has-icons-left">
        <div className={selectClasses}>
          <select {...bindToInput} disabled={isDisabled || isLoading}>
            {options &&
              options.map((option, idx) => (
                <option key={idx} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
          {icon && (
            <span className="icon is-left">
              <FontAwesomeIcon icon={icon} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
