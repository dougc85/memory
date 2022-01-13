import { useState } from 'react';

function useToggle(defaultVal = true) {
  const [state, setState] = useState(defaultVal);

  const toggleState = (val) => {
    setState((prevState) => !prevState);
  }

  return [state, toggleState];
}

export default useToggle;