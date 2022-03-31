import { useState, useCallback, useMemo } from "react";

import type { ChangeEvent } from "react";

const useTextInput = (
  initial: string = "",
  type: "text" | "password" = "text"
) => {
  const [value, setValue] = useState<string>(initial);
  const [isPristine, setPristine] = useState<boolean>(true);
  const clear = useCallback(() => {
    setValue("");
    setPristine(true);
  }, []);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.currentTarget.value);
      setPristine(false);
    },
    []
  );

  return useMemo(
    () => ({
      value,
      clear,
      hasValue: !!value?.trim(),
      isPristine,
      bindToInput: {
        type,
        value,
        onChange,
      },
    }),
    [value, type, onChange, clear, isPristine]
  );
};

export default useTextInput;
