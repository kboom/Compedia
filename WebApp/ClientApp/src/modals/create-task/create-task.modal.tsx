import React, { FunctionComponent, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  matchPath,
  generatePath,
} from "react-router-dom";
import {
  Modal,
  Dropdown,
  TextInput,
  TextArea,
  Button,
  Notification,
  RadioGroup,
  RadioButton,
} from "src/components";
import { useSelect, useTextInput, useRadioInput } from "src/hooks";
import { useDispatch } from "react-redux";
import {
  loadParentTasksAction,
  loadTagsAction,
  createTaskAction,
  dismissCreateTaskFailedAction,
  resetCreateTaskAction,
} from "./store/create-task.actions";
import {
  selectIsLoadingTasks,
  selectIsLoadingTags,
  selectParentTasks,
  selectIsCreatingTask,
  selectIsCreatingTaskFailed,
  selectTags,
  selectNewlyCreatedTask,
} from "./store/create-task.selectors";
import { useSelectedState } from "src/hooks";
import { ParentTask } from "./create-task.models";
import { PageLinks } from "src/config/routes.config";
import { TagEditor, useTagInput } from "./components/TagEditor.component";
import styled from "styled-components";
import { findKey } from "lodash";

export type ModalProps = Readonly<{}>;

const nextActionRadioName = "nextAction";
enum NextAction {
  NONE = "none",
  CREATE_SUBTASK = "subtask",
  CREATE_SIBLING = "sibling",
}

const NextActionDiv = styled.div`
  input {
    margin: 5px;
  }
`;

export const CreateTaskModal: FunctionComponent<ModalProps> = () => {
  const newlyCreatedTask = useSelectedState(selectNewlyCreatedTask);
  const isLoadingTasks = useSelectedState(selectIsLoadingTasks);
  const isLoadingTags = useSelectedState(selectIsLoadingTags);
  const parentTaskList = useSelectedState(selectParentTasks);
  const isCreatingTask = useSelectedState(selectIsCreatingTask);
  const hasCreatingTaskFailed = useSelectedState(selectIsCreatingTaskFailed);
  const tagList = useSelectedState(selectTags);
  const nameInput = useTextInput("");
  const descriptionInput = useTextInput("");
  const tagInput = useTagInput();
  const nextActionRadio = useRadioInput(NextAction.NONE);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const match = matchPath(PageLinks.tasksPage, pathname);
  const parentTaskId =
    nextActionRadio.value[NextAction.CREATE_SUBTASK] && newlyCreatedTask
      ? newlyCreatedTask?.id
      : match?.params["taskId"];
  const parentTaskSelect = useSelect(parentTaskId);

  useEffect(() => {
    dispatch(loadParentTasksAction());
    dispatch(loadTagsAction());

    if (!hasCreatingTaskFailed && newlyCreatedTask) {
      switch (findKey(nextActionRadio.value, (option) => option)) {
        case NextAction.NONE:
          navigate(
            generatePath(PageLinks.tasksPage, {
              taskId: newlyCreatedTask?.id,
            }) + "?modal="
          );
          dispatch(resetCreateTaskAction);
          return;
        case NextAction.CREATE_SIBLING:
          clearForm();
          break;
        case NextAction.CREATE_SUBTASK:
          clearForm();
          parentTaskSelect.clear();
          break;
      }
    }
  }, [dispatch, newlyCreatedTask]);

  const close = () => {
    dispatch(resetCreateTaskAction);
    navigate("?modal=");
  };

  const clearForm = () => {
    nameInput.clear();
    descriptionInput.clear();
    tagInput.clear();
  };

  const onCreate = () => {
    dispatch(
      createTaskAction({
        parentTaskId: parentTaskSelect.value,
        name: nameInput.value,
        description: descriptionInput.value,
        tags: tagInput.tagList,
      })
    );
  };

  const renderButtons = () => (
    <React.Fragment>
      <Button
        isPrimary
        isLoading={isCreatingTask}
        onClick={onCreate}
        isDisabled={!nameInput.hasValue}
      >
        Create
      </Button>
      <Button onClick={close}>Cancel</Button>
    </React.Fragment>
  );

  const parentTasks = parentTaskList?.content as ParentTask[];

  return (
    <Modal onClose={close} title="Create a new task" buttons={renderButtons()}>
      {hasCreatingTaskFailed && (
        <Notification
          type="danger"
          onClose={() => dispatch(dismissCreateTaskFailedAction)}
        >
          Operation failed. Retry now or try again later.
        </Notification>
      )}
      <Dropdown
        name="Parent task"
        select={parentTaskSelect}
        placeholder="Select parent task"
        icon="chess-king"
        isDisabled={isCreatingTask}
        isLoading={isLoadingTasks}
        options={parentTasks}
      />
      <TextInput
        name="Name"
        disabled={isCreatingTask}
        placeholder="Name between 5 and 100 characters"
        textInput={nameInput}
        isInputInvalid={
          nameInput.value.length < 5 || nameInput.value.length > 100
        }
        icon="trophy"
      />
      <TextArea
        name="Description"
        disabled={isCreatingTask}
        placeholder="Description"
        textInput={descriptionInput}
        isInputInvalid={nameInput.value.length > 500}
      />
      <TagEditor
        name="Tags"
        placeholder="Enter tags separated by space"
        isDisabled={isCreatingTask}
        tagInput={tagInput}
        icon="trophy"
        isInputInvalid={false}
        autoComplete={tagList?.content || []}
        isLoading={isLoadingTags}
      />
      <NextActionDiv className="py-3">
        <RadioGroup name="Once created" radioInput={nextActionRadio}>
          <RadioButton
            name={nextActionRadioName}
            checkedByDefault
            value={NextAction.NONE}
          >
            Do nothing
          </RadioButton>
          <RadioButton
            name={nextActionRadioName}
            value={NextAction.CREATE_SUBTASK}
          >
            Create subtask
          </RadioButton>
          <RadioButton
            name={nextActionRadioName}
            value={NextAction.CREATE_SIBLING}
          >
            Create sibling
          </RadioButton>
        </RadioGroup>
      </NextActionDiv>
    </Modal>
  );
};

export default CreateTaskModal;
