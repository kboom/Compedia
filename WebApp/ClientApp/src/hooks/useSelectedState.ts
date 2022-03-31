import { useSelector } from "react-redux";

import type { RootState } from "../store";

function useSelectedState<T>(selector: (r: RootState) => T): T {
  return useSelector<RootState, T>(selector);
}

export default useSelectedState;
