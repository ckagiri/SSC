import React from 'react';

import TextField from './TextField';

const ContactField = ({ value, ...props }) => (
  <div>
    <TextField value={value && value.fullName} {...props} />
  </div>
);

export default ContactField;
