import React, { FunctionComponent } from "react";

export type ModalProps = Readonly<{
  title: string;
  children: React.ReactNode | React.ReactNode[];
  buttons: React.ReactNode | React.ReactNode[];
  onClose: () => void;
}>;

export const Modal: FunctionComponent<ModalProps> = ({
  title,
  children,
  buttons,
  onClose,
}) => {
  return (
    <div className="`modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            onClick={() => onClose()}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">{buttons}</footer>
      </div>
    </div>
  );
};
