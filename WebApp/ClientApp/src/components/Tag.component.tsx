import { FunctionComponent } from "react";
import styled from "styled-components";

export type TagColor = "red" | "blue" | "green" | "yellow" | undefined;

export type TagProps = Readonly<{
  name: string;
  color: TagColor;
  onDelete?: () => void;
}>;

const StyledTag = styled.div<{ color: TagColor }>`
  background-color: ${({ color }) => {
    switch (color) {
      case "green":
        return "#B4F8C8";
      case "yellow":
        return "FBE7C6";
      case "blue":
        return "#A0E7E5";
      case "red":
        return "#FFAEBC";
      default:
        return "#000";
    }
  }} !important;
`;

export const Tag: FunctionComponent<TagProps> = ({
  name: text,
  color,
  onDelete,
}) => {
  return (
    <StyledTag className="tag" color={color}>
      {text}
      {onDelete && (
        <button className="delete is-small" onClick={onDelete}></button>
      )}
    </StyledTag>
  );
};
