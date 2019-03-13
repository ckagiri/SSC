import React from 'react';

import ViewField from './BaseField';

const CurrencyField = ({ value, ...props }) => (
  <ViewField
    value={Number(value).toLocaleString('vi-VI', {
      style: 'currency',
      currency: 'VND',
    })}
    {...props}
  />
);

export default CurrencyField;
