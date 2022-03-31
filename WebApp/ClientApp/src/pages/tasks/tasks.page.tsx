import React, { FunctionComponent, useEffect } from "react";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelectedState } from "src/hooks";
import styled from "styled-components";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "./components/Breadcrumbs.component";
import TaskStats from "./components/TaskStats.component";
import { selectors, actions } from "./store";
import TaskGallery from "./components/TaskGallery.component";
import { Tag, TagList } from "src/components";
import { PageLinks } from "src/config";

type TasksPageProps = Readonly<{
  taskId: string;
}>;

const StyledHero = styled.section`
  background-image: radial-gradient(
    circle farthest-corner at 22.4% 21.7%,
    rgba(4, 189, 228, 1) 0%,
    rgba(2, 83, 185, 1) 100.2%
  );
`;

export const TasksPage: FunctionComponent<TasksPageProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    dispatch(actions.loadTask(taskId!!));
  }, [taskId]);

  const task = useSelectedState(selectors.selectTask);
  const subtasks = task?.subtasks;
  const supertasks = task?.supertasks;

  return (
    <React.Fragment>
      {task && (
        <StyledHero className="hero is-dark">
          {supertasks && (
            <div className="hero-head">
              <div className="px-5 pt-5">
                <Breadcrumbs>
                  {supertasks
                    .map((_, idx, arr) => arr[arr.length - 1 - idx])
                    .map((task) => (
                      <BreadcrumbItem
                        key={task.id}
                        path={PageLinks.tasksPage}
                        progress={task.progressPercent}
                        params={{
                          taskId: task.id,
                        }}
                      >
                        {task.name}
                      </BreadcrumbItem>
                    ))}
                </Breadcrumbs>
              </div>
            </div>
          )}
          <div className="hero-body">
            <p className="title">{task.name}</p>
            <p className="subtitle">{task.description}</p>
            {task.tags && (
              <TagList>
                {task.tags.map(({ name, color }, idx) => (
                  <Tag key={idx} name={name} color={color} />
                ))}
              </TagList>
            )}
            <TaskStats task={task} />
          </div>
          <div className="hero-foot">
            <nav className="tabs is-boxed is-fullwidth">
              <div className="container">
                <ul>
                  <li className="is-active">
                    <a>Subtasks</a>
                  </li>
                  <li>
                    <a>Notes</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </StyledHero>
      )}
      <div className="container is-fullhd">
        {subtasks && (
          <TaskGallery
            tasks={subtasks}
            onSelectTask={(task) =>
              navigate(
                generatePath(PageLinks.tasksPage, {
                  taskId: task.id,
                })
              )
            }
          />
        )}
      </div>
    </React.Fragment>
  );
};
