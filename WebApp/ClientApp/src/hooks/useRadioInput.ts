import { useState, useCallback } from "react";
import type { ChangeEvent } from "react";

type Dictionary<T> = { [key: string]: T };
type Key = string | number;

/**
 * Radio buttons are uncontrolled components so react cannot influece their value.
 * Instead, we ask the components to provide updates once they update their state.
 * @param initialSelection
 * @returns
 */
const useRadioInput = (initialSelection: Key) => {
  const [value, setValue] = useState<Dictionary<boolean>>({
    [initialSelection]: true,
  });
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue({ [e.target.value]: true });
  }, []);

  return {
    value,
    bindToContainer: {
      onChange,
    },
  };
};

export default useRadioInput;
