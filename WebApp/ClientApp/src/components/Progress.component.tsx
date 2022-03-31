import { FunctionComponent } from "react";

type ProgressProps = Readonly<{
  value: number;
  max: number;
}>;

export const Progress: FunctionComponent<ProgressProps> = ({ value, max }) => {
  return (
    <progress className="progress is-small is-info" value={value} max={max}>
      15%
    </progress>
  );
};
