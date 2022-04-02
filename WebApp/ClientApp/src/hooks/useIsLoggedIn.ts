import { useSelector } from "react-redux";

import type { RootState } from "../store";

const useIsLoggedIn = (): boolean => {
	return useSelector<RootState, boolean>(
		(state) => !!state.oidc.user && !state.oidc.user?.expired
	);
};

export default useIsLoggedIn;
