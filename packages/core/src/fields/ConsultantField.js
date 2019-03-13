import React from 'react';

import TextField from './TextField';

const ConsultantField = ({ value, ...props }) => (
  <TextField value={(value && value.shortName) || '-'} {...props} />
);

export default ConsultantField;
