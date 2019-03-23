import React, { useCallback } from 'react';
import { useFormikContext as useFormContext, getIn } from 'formik';
import { processValidationError } from '@ssc/common';
import * as _ from 'lodash';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export const useField = ({
  name,
  parent,
  onChange,
  onValueChange,
  onBlur,
  onClear,
  validate,
  validateSchema,
  disabled,
  error,
  value,
  ...rest
} = {}) => {
  const fieldName = parent ? (name ? `${parent}.${name}` : parent) : name;
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    dirty,
    registerField,
    unregisterField,
    setFieldValue,
    setFieldTouched,
  } = useFormContext();

  const validator =
    validate ||
    (validateSchema &&
      (v =>
        new Promise((resolve, reject) => {
          validateSchema
            .validate(v, { abortEarly: false })
            .then(v => {
              resolve(undefined);
            })
            .catch(e => {
              reject(processValidationError(e));
            });
        })));

  React.useEffect(() => {
    if (fieldName) {
      // sync value to the form values
      if (!dirty && value) setFieldValue(fieldName, value);

      registerField(name, {
        validate: validator,
      });
      return () => {
        unregisterField(name);
      };
    }
    return () => {};
  }, [name, parent, validate, validateSchema]);

  const handleValueChange = v => {
    setFieldValue(fieldName, v === null ? undefined : v);
    setFieldTouched(fieldName, true);
  };

  return {
    ...rest,
    disabled,
    name: fieldName,
    value: getIn(values, fieldName),
    error: !disabled && (error || (getIn(touched, fieldName) && getIn(errors, fieldName))),
    onChange: useCallback(callAll(handleChange(fieldName), onChange), [fieldName]),
    onValueChange: useCallback(callAll(handleValueChange), onValueChange),
    onBlur: useCallback(callAll(handleBlur(fieldName), onChange), [fieldName]),
    onClear: useCallback(callAll(() => setFieldValue(fieldName, undefined), onClear), [fieldName]),
  };
};

export const withField = Component => props => <Component {...useField(props)} />;

export const Field = ({ Component, ...props }) => <Component {...useField(props)} />;
