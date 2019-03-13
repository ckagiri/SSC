import { useState } from 'react';

const useControlProp = (valueProp, setValueProp, defaultValue) => {
  const [valueState, setValueState] = useState();
  const value =
    (typeof valueProp === 'undefined' || valueProp === null ? valueState : valueProp) ||
    defaultValue;
  return [
    value,
    v => {
      if (setValueProp) setValueProp(v);
      setValueState(v);
    },
  ];
};

export default useControlProp;
