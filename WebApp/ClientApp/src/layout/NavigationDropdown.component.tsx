import React, { FunctionComponent, useState, useRef, useEffect } from "react";

type NavigationDropdownProps = Readonly<{
  name: string;
  children: React.ReactNode[] | React.ReactNode;
}>;

export const NavigationDropdown: FunctionComponent<NavigationDropdownProps> = ({
  name,
  children,
}) => {
  const node = useRef<HTMLAnchorElement>(null);
  const [isActive, setActive] = useState(false);

  const deactiveOnOutsideClick = (e: MouseEvent) => {
    const { current } = node;
    const targetNode = e.target as Node;
    if (current && current.isEqualNode(targetNode)) {
      return;
    }
    setTimeout(() => setActive(false), 100);
  };

  useEffect(() => {
    document.addEventListener("mousedown", deactiveOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", deactiveOnOutsideClick);
    };
  }, [isActive]);

  return (
    <div className={`navbar-item has-dropdown ${isActive ? "is-active" : ""}`}>
      <a
        ref={node}
        className="navbar-link"
        onClick={() => setActive(!isActive)}
      >
        {name}
      </a>

      <div className="navbar-dropdown">{children}</div>
    </div>
  );
};

export default NavigationDropdown;
