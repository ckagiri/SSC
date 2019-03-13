import React from 'react';
import { Input, Field, useField } from '@ssc/core';
import { addressValidation } from '@ssc/common';

import LocalFieldInput from './LocalFieldInput';

const AddressFieldInput = ({ name, required }) => {
  const {
    form: { getFieldValue },
  } = useField({ name, validateSchema: addressValidation });
  return (
    <React.Fragment>
      <Field Component={Input} name="street" parent={name} label="Địa chỉ" required={required} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
        <LocalFieldInput name={name} required={!!getFieldValue('street')} />
      </div>
    </React.Fragment>
  );
};

export default AddressFieldInput;
