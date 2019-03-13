import React from 'react';
import PropTypes from 'prop-types';

import BaseField from './BaseField';

const PercentageField = ({ value, defaultValue, ...props }) => (
  <BaseField
    value={(Number(value) || defaultValue).toLocaleString('vi-VI', {
      style: 'percent',
    })}
    {...props}
  />
);

PercentageField.defaultProps = {
  defaultValue: 0,
};

export default PercentageField;
