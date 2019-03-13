import React from 'react';
import { MenuItem } from '@material-ui/core';

import Autocomplete from './AutocompleteInput';

const GenderInput = props => (
  <Autocomplete
    items={[
      {
        value: 'F',
        title: 'Nữ',
      },
      {
        value: 'M',
        title: 'Nam',
      },
    ]}
    label="Giới tính"
    {...props}
  />
);

export default GenderInput;
