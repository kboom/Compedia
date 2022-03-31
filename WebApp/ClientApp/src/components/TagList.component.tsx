import React, { FunctionComponent } from "react";
import { TagProps } from ".";

export type TagListProps = Readonly<{
  children: React.ReactElement<TagProps> | React.ReactElement<TagProps>[];
}>;

export const TagList: FunctionComponent<TagListProps> = ({ children }) => {
  return <div className="tags">{children}</div>;
};
