import React from 'react';

import InputBase from './InputBase';

const Input = ({ onChange, ...props }) => <InputBase onValueChange={onChange} {...props} />;

Input.defaultProps = {
  onChange: () => {},
};
export default Input;
