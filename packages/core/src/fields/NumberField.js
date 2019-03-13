import React from 'react';

import BaseField from './BaseField';

const NumberField = ({ value, defaultValue, ...props }) => (
  <BaseField
    value={(Number(value) || defaultValue).toLocaleString('vi-VI', {
      style: 'decimal',
    })}
    {...props}
  />
);

NumberField.defaultProps = {
  defaultValue: '-',
};

export default NumberField;
