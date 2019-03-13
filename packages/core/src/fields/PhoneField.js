import React from 'react';

import BaseField from './BaseField';

const PhoneField = ({ value, ...props }) => (
  <a href={`tel:${value}`}>
    <BaseField value={value} {...props} />
  </a>
);

export default PhoneField;
