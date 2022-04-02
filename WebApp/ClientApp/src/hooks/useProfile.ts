import { Profile } from "oidc-client";
import { useSelector } from "react-redux";

import type { RootState } from "../store";

const useProfile = (): Profile | undefined => {
	return useSelector<RootState, Profile | undefined>(
		(state) => state.oidc.user?.profile
	);
};

export default useProfile;
