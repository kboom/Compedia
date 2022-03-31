export type TagColor = "red" | "blue" | "green" | "yellow" | undefined;

export type Tag = Readonly<{
  name: string;
  color: TagColor;
}>;
