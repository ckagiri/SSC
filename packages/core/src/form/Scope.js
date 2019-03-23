import React, { useCallback } from 'react';
import { useFormikContext as useFormContext } from 'formik';
import { processValidationError } from '@ssc/common';
import { get } from 'lodash';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export const useScope = ({ name, parent, ...rest } = {}) => {
  const getName = parent => name => (parent ? (name ? `${parent}.${name}` : parent) : name);
  const getFieldName = getName(getName(parent)(name));
  const {
    setFieldError,
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormContext();
  return {
    name: getName(parent)(name),
    setFieldValue: (field, value, shouldValidate) =>
      setFieldValue(getFieldName(field), value, shouldValidate),
    setFieldTouched: (field, touched, shouldValidate) =>
      setFieldTouched(getFieldName(field), touched, shouldValidate),
    setFieldError: (field, error) => setFieldError(getFieldName(field), error),
    getFieldValue: field => get(values, getFieldName(field)),
    getFieldError: field => get(errors, getFieldName(field)),
    getFieldTouched: field => get(touched, getFieldName(field)),

    ...rest,
  };
};

// export const withField = Component => props => <Component {...useField(props)} />;

// export const Field = ({ Component, ...props }) => <Component {...useField(props)} />;
