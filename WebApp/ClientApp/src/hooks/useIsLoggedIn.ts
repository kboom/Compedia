import { useSelector } from "react-redux";
import { AccountStatusEnum } from "../store/account";

import type { RootState } from "../store";

const useIsLoggedIn = (): boolean => {
  return useSelector<RootState, boolean>(
    (state) => state.account.status === AccountStatusEnum.SIGNED_IN
  );
};

export default useIsLoggedIn;
