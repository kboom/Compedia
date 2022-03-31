import { FunctionComponent, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TaskDetails } from "../models";

type TaskStatsProps = Readonly<{
  task: TaskDetails;
}>;

export const TaskStats: FunctionComponent<TaskStatsProps> = ({ task }) => {
  const ageAgo = useMemo(() => {
    const createDt = Date.parse(task.createdAt).valueOf();
    const now = Date.now().valueOf();
    const diffInMilliseconds = Math.max(0, now - createDt);
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 3600 * 24));
    return diffInDays;
  }, [task.createdAt]);

  return (
    <nav className="level">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Age</p>
          <p className="title">
            <FontAwesomeIcon icon="calendar" size="sm" /> {ageAgo}d
          </p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Progress</p>
          <p className="title">
            <FontAwesomeIcon icon="trophy" size="sm" /> {task.progressPercent}%
          </p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Subtasks</p>
          <p className="title">
            <FontAwesomeIcon icon="tasks" size="sm" /> {task.subtaskCount}
          </p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Priority</p>
          <p className="title">
            <FontAwesomeIcon icon="arrow-up" size="sm" /> {task.priority}
          </p>
        </div>
      </div>
    </nav>
  );
};

export default TaskStats;
