import { useCallback, useState, useRef } from "react";
import { PageLinks } from "../../config";
import { toast } from "react-toastify";
import { useTextInput } from "../../hooks";
import { UserNameInput, PasswordInput } from "src/components";
import LoginControls from "./components/LoginControls.component";
import ErrorControls from "./components/ErrorControls.component";
import Authenticator from "./components/Authenticator.component";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accountActionCreators, AccountStatusEnum } from "../../store/account";
import BasedGhostLogoPNG from "../../assets/image/based-ghost-main.png";

import type { RootState } from "../../store";
import type { FunctionComponent } from "react";
import type { ICredentials } from "../../store/account";

export const LoginPage: FunctionComponent = () => {
  const toastIdRef = useRef<string | number>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isInputInvalid, setIsInputInvalid] = useState<boolean>(false);

  const userNameInput = useTextInput("");
  const passwordInput = useTextInput("", showPassword ? "text" : "password");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector<RootState, AccountStatusEnum>(
    (state) => state.account.status
  );

  const clear = () => {
    dispatch(accountActionCreators.resetState());
    userNameInput.clear();
    passwordInput.clear();
  };

  const onFailedAuth = useCallback(clear, [
    dispatch,
    userNameInput,
    passwordInput,
  ]);
  const onResetFailure = useCallback(clear, [
    dispatch,
    userNameInput,
    passwordInput,
  ]);

  const onSuccessfulAuth = useCallback((): void => {
    navigate(PageLinks.mainPage);
  }, [navigate]);

  const onToggleShowPassword = useCallback(
    (): void => setShowPassword((prevShow: boolean) => !prevShow),
    []
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!userNameInput.hasValue || !passwordInput.hasValue) {
      setIsInputInvalid(true);
      if (!toast.isActive(toastIdRef.current)) {
        toastIdRef.current = toast.error("Enter user name/password");
      }
    } else {
      toast.dismiss();
      setIsInputInvalid(false);

      const credentials: ICredentials = {
        username: userNameInput.value,
        password: passwordInput.value,
      };

      dispatch(accountActionCreators.login(credentials));
    }
  };

  if (status === AccountStatusEnum.UNKNOWN) {
    dispatch(accountActionCreators.tryLoginFromRefresh());
  }

  const isDisabled = status !== AccountStatusEnum.SIGNED_OUT;

  return (
    <section className="section section-login">
      <div className="container has-text-centered">
        <div className="column is-4 is-offset-4">
          <h3 className="title">Login</h3>
          <p className="subtitle">Please login to proceed</p>
          <div className="box login-box">
            <ErrorControls
              error={status === AccountStatusEnum.UNAVAILABLE}
              onReset={onResetFailure}
            >
              <img
                width="170"
                aria-hidden
                id="login-img"
                alt="based-ghost-logo"
                src={BasedGhostLogoPNG}
              />
              <form onSubmit={handleLogin}>
                <UserNameInput
                  disabled={isDisabled}
                  textInput={userNameInput}
                  isInputInvalid={isInputInvalid}
                />
                <PasswordInput
                  disabled={isDisabled}
                  textInput={passwordInput}
                  showPassword={showPassword}
                  isInputInvalid={isInputInvalid}
                  toggleShowPassword={onToggleShowPassword}
                />
                <LoginControls disabled={isDisabled} />
              </form>
              <Authenticator
                accountStatus={status}
                handleOnFail={onFailedAuth}
                handleOnSuccess={onSuccessfulAuth}
              />
            </ErrorControls>
          </div>
        </div>
      </div>
    </section>
  );
};
