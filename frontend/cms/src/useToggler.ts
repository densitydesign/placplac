import { useState } from "react";

export function useToggler() {
  const [value, setValue] = useState(false);

  const toggle = () => {
    setValue(!value);
  };
  const setFalse = () => {
    setValue(false);
  };
  const setTrue = () => {
    setValue(true);
  };
  return { toggle, value, setFalse, setTrue };
}
