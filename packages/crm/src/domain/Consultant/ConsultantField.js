import React from 'react';
import { TextField } from '@ssc/core';

const ConsultantField = ({ consultant, ...props }) => (
  <TextField value={(consultant && consultant.shortName) || '-'} {...props} />
);

export default ConsultantField;
