import React from 'react';

import { TextField } from '@ssc/core';

const ContactField = ({ contact, ...props }) => (
  <TextField value={(contact && contact.fullName) || '-'} {...props} />
);

export default ContactField;
