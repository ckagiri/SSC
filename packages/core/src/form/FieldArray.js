import React from 'react';
import { FieldArray as FormikArray } from 'formik';

import { useField } from './Field';

export const connectArray = Component => ({ onChange, ...props }) => {
  const { name, ...fieldProps } = useField(props);
  return (
    <FormikArray
      name={name}
      render={arrayHelpers => (
        <Component arrayHelpers={arrayHelpers} {...fieldProps} onChange={onChange} />
      )}
    />
  );
};
