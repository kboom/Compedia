import React, { FunctionComponent } from "react";

export type NotificationType = "success" | "danger" | "warning";

export type NotificationProps = Readonly<{
  children: React.ReactNode;
  type: NotificationType;
  onClose: () => void;
}>;

export const Notification: FunctionComponent<NotificationProps> = ({
  children,
  type,
  onClose,
}) => {
  return (
    <div className={`notification is-${type}`}>
      <button className="delete" onClick={onClose}></button>
      {children}
    </div>
  );
};
