import { useEffect, memo } from "react";
import { AccountStatusEnum } from "../../../store/account";
import styled, { keyframes } from "styled-components";

type AuthenticatorProps = Readonly<{
  delay?: number;
  accountStatus: AccountStatusEnum;
  handleOnFail: (...args: any[]) => any;
  handleOnSuccess: (...args: any[]) => any;
}>;

const CHILD_DIV_COUNT = 9;

const ROTATE_KEYFRAMES = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const getChildDivBorderColor = (accountStatus: AccountStatusEnum): string => {
  switch (accountStatus) {
    case AccountStatusEnum.SIGN_IN_FAILED:
      return "#e93e60";
    case AccountStatusEnum.UNKNOWN:
      return "#FFA500";
    case AccountStatusEnum.SIGNED_IN:
      return "#09d3ac";
    default:
      return "rgba(9, 30, 66, 0.35)";
  }
};

const getChildDivCSS = (): string => {
  const childDivTemplate = (idx: number): string => `
    &:nth-child(${idx + 1}) {
      height: calc(96px / 9 + ${idx} * 96px / 9);
      width: calc(96px / 9 + ${idx} * 96px / 9);
      animation-delay: calc(50ms * ${idx + 1});
    }
  `;

  return [...Array(CHILD_DIV_COUNT).keys()]
    .map((key) => childDivTemplate(key))
    .join("");
};

const AuthenticatorWrapper = styled.div<
  Pick<AuthenticatorProps, "accountStatus">
>`
  width: 100px;
  height: 100px;
  padding: 2px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 1.25em auto auto auto;

  > div {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-top-color: ${({ accountStatus }) =>
      getChildDivBorderColor(accountStatus)};
    animation: ${ROTATE_KEYFRAMES} 1500ms cubic-bezier(0.68, -0.75, 0.265, 1.75)
      infinite forwards;

    ${getChildDivCSS()}
  }
`;

export const Authenticator = memo<AuthenticatorProps>(
  ({ accountStatus, handleOnFail, handleOnSuccess, delay = 2000 }) => {
    useEffect(() => {
      const authHandler = setTimeout(() => {
        switch (accountStatus) {
          case AccountStatusEnum.SIGN_IN_FAILED:
            return handleOnFail();
          case AccountStatusEnum.SIGNED_IN:
            return handleOnSuccess();
          default:
            return;
        }
      }, delay);

      return () => {
        clearTimeout(authHandler);
      };
    }, [accountStatus, delay, handleOnFail, handleOnSuccess]);

    if (
      accountStatus !== AccountStatusEnum.SIGNING_IN &&
      accountStatus !== AccountStatusEnum.UNKNOWN
    ) {
      return null;
    }

    return (
      <AuthenticatorWrapper accountStatus={accountStatus}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </AuthenticatorWrapper>
    );
  }
);

Authenticator.displayName = "Authenticator";

export default Authenticator;
