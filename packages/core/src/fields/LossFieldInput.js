import React from 'react';
import { weightValidation, bmi, getBmiLevel } from '@ssc/common';

import NumberInput from '../inputs/NumberInput';
import { useField } from '../form/Field';
import Typography from '../base/Typography';

const bmiText = (height, weight) => {
  const index = bmi(height, weight);
  return (
    index && (
      <Typography color={getBmiLevel(index).level} variant="inherit">
        BMI sau khi giảm: {index}
      </Typography>
    )
  );
};

const LossField = ({ height, weight, ...props }) => (
  <NumberInput
    {...useField({
      label: 'Nặng',
      endAdornment: 'kg',
      getHelperText: ({ value, helperText }) => bmiText(height, weight - value) || helperText,
      // getEndAdornment: ({ value, variant }) =>
      //   bmi(height, value) && (
      //     <InputAdornment position="end" variant={variant}>
      //       {bmi(height, value)}
      //     </InputAdornment>
      //   ),
      ...props,
    })}
  />
);

export default LossField;
