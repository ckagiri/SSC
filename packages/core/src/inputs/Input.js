import React from 'react';

import InputBase from './InputBase';

const Input = ({ onChange, ...props }) => <InputBase onChange={onChange} {...props} />;

Input.defaultProps = {
  onChange: () => {},
};
export default Input;
