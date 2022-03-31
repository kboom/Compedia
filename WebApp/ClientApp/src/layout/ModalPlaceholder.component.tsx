import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";
import {} from "lodash";
import styled from "styled-components";
import CreateTaskModal from "src/modals/create-task";

export type ModalPlaceholderProps = Readonly<{}>;

const ModalPlaceholderDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  width: 100%;
  height: 100%;
`;

export const ModalPlaceholder: FunctionComponent<
  ModalPlaceholderProps
> = () => {
  const [searchParams] = useSearchParams();
  const selectedModal = searchParams.get("modal");
  if (selectedModal != null && selectedModal.trim()) {
    return (
      <ModalPlaceholderDiv>
        {selectedModal == "new-task" && <CreateTaskModal />}
      </ModalPlaceholderDiv>
    );
  } else {
    return null;
  }
};

export default ModalPlaceholder;
