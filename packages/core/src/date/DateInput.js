import React from 'react';
import { DatePicker } from 'material-ui-pickers';

import Input from '../inputs/Input';

const DateInput = ({ value, onChange, ...props }) => {
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
  const handleChange = date => {
    if (onChange) onChange(date.toISODate());
  };
  return (
    <DatePicker
      TextFieldComponent={InputComp}
      showTodayButton
      autoOk
      clearLabel="Xóa"
      cancelLabel="Đóng"
      okLabel="Chọn"
      label="Ngày"
      resetable={false}
      onChange={handleChange}
      value={value || null}
      format="D"
      invalidDateMessage="Ngày không đúng"
      {...props}
    />
  );
};

export default DateInput;
