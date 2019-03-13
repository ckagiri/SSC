import React from 'react';
import { TimePicker } from 'material-ui-pickers';

import Input from '../inputs/Input';

const TimeInput = ({ value, ...props }) => {
  const InputComp = ({ error, helperText, value: inputValue, ...rest }) => {
    const isError = typeof error === 'boolean' || inputValue === 'Unknown';
    const errorMsg = isError ? helperText : error;
    const helperTextMsg = isError ? undefined : helperText;
    return (
      <Input
        helperText={helperTextMsg}
        error={errorMsg}
        value={inputValue === 'Unknown' ? value : inputValue}
        {...rest}
      />
    );
  };

  return (
    <TimePicker
      TextFieldComponent={InputComp}
      ampm={false}
      autoOk
      minutesStep={5}
      clearLabel="Xóa"
      cancelLabel="Đóng"
      okLabel="Chọn"
      label="Giờ"
      format="T"
      resetable={false}
      value={value || null}
      {...props}
    />
  );
};

export default TimeInput;
