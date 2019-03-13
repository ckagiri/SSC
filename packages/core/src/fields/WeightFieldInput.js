import React from 'react';
import { weightValidation, bmi, getBmiLevel, toLose } from '@ssc/common';

import NumberInput from '../inputs/NumberInput';
import { useField } from '../form/Field';
import Typography from '../base/Typography';

const bmiText = (height, weight) => {
  const index = bmi(height, weight);
  const kgToLose = toLose(height, weight);
  return (
    index && (
      <Typography color={getBmiLevel(index).level} variant="inherit">
        BMI: {index}
        {kgToLose && `, giảm: ${kgToLose}kg`}
      </Typography>
    )
  );
};

const WeightField = ({ height, ...props }) => (
  <NumberInput
    {...useField({
      label: 'Nặng',
      validateSchema: weightValidation,
      endAdornment: 'kg',
      getHelperText: ({ value, helperText }) => bmiText(height, value) || helperText,
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

export default WeightField;
