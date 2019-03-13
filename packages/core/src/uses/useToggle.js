import { useState, useRef } from 'react';

const useToggle = (toggleProp, on, off, initialValue) => {
  const [toggleState, setToggle] = useState(initialValue);
  const onFunc = e => {
    setToggle(true);
    if (on) on(e);
  };

  const offFunc = e => {
    setToggle(false);
    if (off) off(e);
  };
  return [
    toggleProp === null || typeof toggleProp === 'undefined' ? toggleState : toggleProp,
    e => (toggleState ? offFunc(e) : onFunc(e)),
    onFunc,
    offFunc,
  ];
};

export default useToggle;
