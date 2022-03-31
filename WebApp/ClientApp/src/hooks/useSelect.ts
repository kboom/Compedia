import { useState, useCallback, useMemo } from "react";

import type { ChangeEvent } from "react";

const useTextInput = (initial: string = "") => {
  const [value, setValue] = useState<string>(initial);
  const [isPristine, setPristine] = useState<boolean>(true);
  const clear = useCallback(() => setValue(""), []);
  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.currentTarget.value);
    setPristine(false);
  }, []);

  return useMemo(
    () => ({
      value,
      clear,
      hasValue: !!value?.trim(),
      isPristine,
      bindToInput: {
        value,
        onChange,
      },
    }),
    [value, onChange, clear]
  );
};

export default useTextInput;
