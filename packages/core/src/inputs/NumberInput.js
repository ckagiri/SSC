import React from 'react';

import Input from './Input';

const NumberInput = ({ onChange, ...props }) => (
  <Input
    type="number"
    onChange={v => (!v && v !== 0 ? onChange(undefined) : onChange(v))}
    {...props}
  />
);

Input.defaultProps = {
  onChange: () => {},
};
export default NumberInput;
