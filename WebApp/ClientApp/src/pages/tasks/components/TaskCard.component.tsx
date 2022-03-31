import { FunctionComponent } from "react";
import styled from "styled-components";
import { Task } from "../models";
import { Progress, TagList, Tag } from "src/components";

export type TaskCardProps = Readonly<{
  task: Task;
  onSelect: (t: Task) => void;
}>;

const StyledTask = styled.div`
  cursor: pointer;
`;

export const TaskCard: FunctionComponent<TaskCardProps> = ({
  task,
  onSelect,
}) => {
  return (
    <StyledTask className="tile is-child box" onClick={() => onSelect(task)}>
      <p className="title">{task.name}</p>
      <p className="subtitle">{task.description}</p>
      {task.tags && (
        <TagList>
          {task.tags.map(({ name, color }, idx) => (
            <Tag key={idx} name={name} color={color} />
          ))}
        </TagList>
      )}
      {task.progressPercent && (
        <Progress value={task.progressPercent} max={100} />
      )}
    </StyledTask>
  );
};

export default TaskCard;
