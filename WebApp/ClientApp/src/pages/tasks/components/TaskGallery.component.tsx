import { FunctionComponent, memo } from "react";
import type { Task } from "../models";
import TaskCard from "./TaskCard.component";
import { chunk } from "lodash";

type TaskGalleryProps = Readonly<{
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}>;

type TileRenderer = (
  key: any,
  renderTask: (task: Task) => React.ReactNode,
  task1: Task,
  task2: Task,
  task3: Task,
  task4: Task,
  task5: Task
) => React.ReactNode;

const firstTilePatternRenderer = (
  key: any,
  renderTask: (task: Task) => React.ReactNode,
  task1: Task,
  task2: Task,
  task3: Task,
  task4: Task,
  task5: Task
) => (
  <div key={key} className="tile is-ancestor">
    <div className="tile is-vertical is-8">
      <div className="tile">
        <div className="tile is-vertical">
          <div className="tile is-parent is-color-4">{renderTask(task4)}</div>
          <div className="tile is-parent is-color-5">{renderTask(task5)}</div>
        </div>
        <div className="tile is-parent is-color-3">{renderTask(task3)}</div>
      </div>
      <div className="tile is-parent is-color-2">{renderTask(task2)}</div>
    </div>
    <div className="tile is-parent is-color-1">{renderTask(task1)}</div>
  </div>
);

const secondTilePatternRenderer = (
  key: any,
  renderTask: (task: Task) => React.ReactNode,
  task1: Task,
  task2: Task,
  task3: Task,
  task4: Task,
  task5: Task
) => (
  <div key={key} className="tile is-ancestor">
    <div className="tile is-parent is-color-1">{renderTask(task1)}</div>
    <div className="tile is-vertical is-8">
      <div className="tile">
        <div className="tile is-parent is-color-3">{renderTask(task3)}</div>
        <div className="tile is-vertical">
          <div className="tile is-parent is-color-5"> {renderTask(task5)}</div>
          <div className="tile is-parent is-color-4">{renderTask(task4)}</div>
        </div>
      </div>
      <div className="tile is-parent is-color-2">{renderTask(task2)}</div>
    </div>
  </div>
);

const tileRenderers: TileRenderer[] = [
  firstTilePatternRenderer,
  secondTilePatternRenderer,
];

export const TaskGallery: FunctionComponent<TaskGalleryProps> = memo(
  ({ tasks, onSelectTask }) => {
    const chunkedByRenderer = chunk(tasks, 5);

    const renderTask = (task: Task) => (
      <TaskCard task={task} onSelect={(task) => onSelectTask(task)} />
    );

    return (
      <section className="section">
        {chunkedByRenderer.map((tasksInSegment, idx) => {
          const sortedTasks = tasksInSegment.sort(
            (a, b) => b.description.length - a.description.length
          );
          if (sortedTasks.length < 5) {
            return (
              <div key={idx} className="tile is-ancestor">
                <div className="tile is-parent is-color-3">
                  {renderTask(sortedTasks[0])}
                </div>
                {sortedTasks[1] && (
                  <div className="tile is-parent is-color-5">
                    {renderTask(sortedTasks[1])}
                  </div>
                )}
                {sortedTasks[2] ||
                  (sortedTasks[3] && (
                    <div className="tile is-vertical is-4 is-color-1">
                      {sortedTasks[2] && (
                        <div className="tile">
                          <div className="tile is-parent">
                            {renderTask(sortedTasks[2])}
                          </div>
                        </div>
                      )}
                      {sortedTasks[3] && (
                        <div className="tile">
                          <div className="tile is-parent is-color-4">
                            {renderTask(sortedTasks[3])}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            );
          }
          return tileRenderers[idx % tileRenderers.length](
            idx,
            renderTask,
            sortedTasks[0],
            sortedTasks[1],
            sortedTasks[2],
            sortedTasks[3],
            sortedTasks[4]
          );
        })}
      </section>
    );
  }
);

export default TaskGallery;
