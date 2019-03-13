import React from 'react';
import { useFormikContext as useFormContext, getIn, setIn } from 'formik';
import { processValidationError } from '@ssc/common';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export const useField = ({
  name: fieldName,
  parent,
  onChange,
  onBlur,
  validate,
  validateSchema,
  disabled,
  value,
  ...rest
} = {}) => {
  const getFieldName = (name, parent) => (parent ? (name ? `${parent}.${name}` : parent) : name);
  const form = useFormContext(rest);
  const { submitCount } = form;
  const name = getFieldName(fieldName, parent);

  const getFieldValue = (fieldName, defaultValue) =>
    getIn(form.values, getFieldName(fieldName, name), defaultValue);

  const setFieldValue = (fieldName, value) =>
    form.setFieldValue(getFieldName(fieldName, name), value || undefined);
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
    if (name) {
      // sync value to the form values
      if (!form.dirty && value) form.setFieldValue(name, value);

      form.registerField(name, {
        validate: validator,
      });
      return () => {
        form.unregisterField(name);
      };
    }
    return () => {};
  }, [name, validate, validateSchema]);

  const formChange = val => {
    form.setFieldValue(name, val || undefined);
    form.setFieldTouched(name, true);
  };
  return {
    name,
    value: getFieldValue(null),
    disabled,
    onChange:
      name &&
      callAll(
        formChange,
        onChange,
        // validateOnChange && validator
      ),
    onBlur:
      name &&
      callAll(
        form.handleBlur,
        onBlur,
        // validateOnBlur && (() => validator(getFieldValue()))
      ),
    error:
      !disabled && name && getIn(form.touched, name, !!submitCount)
        ? getIn(form.errors, name)
        : null,
    // touched: form.touched[name],
    ...rest,
    form: {
      ...form,
      getFieldValue,
      setFieldValue,
      setFieldTouched: (fieldName, touched = true) =>
        form.setFieldTouched(getFieldName(fieldName, name), touched),
      setFieldError: (fieldName, error) => form.setFieldError(getFieldName(fieldName, name), error),
      getFieldName: fieldName => getFieldName(name, parent),
    },
  };
};

export const connect = Component => props => <Component {...useField(props)} />;

export const Field = ({ Component, ...props }) => <Component {...useField(props)} />;
