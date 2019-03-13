import React from 'react';
import { heightValidation } from '@ssc/common';

import { useField } from '../form/Field';
import NumberInput from '../inputs/NumberInput';

const HeightFieldInput = props => (
  <NumberInput
    {...useField({
      label: 'Cao',
      validateSchema: heightValidation,
      endAdornment: 'cm',
      ...props,
    })}
  />
);
export default HeightFieldInput;
