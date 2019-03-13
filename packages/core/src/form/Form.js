import React from 'react';
import { useFormikContext as useFormContext, getIn, withFormik } from 'formik';

// const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export const useForm = ({
  name,
  parent,
  onSubmit,
  onReset,
  validate,
  validateSchema,
  initialValues,
  values,
  ...rest
}) => {
  const form = useFormContext();
  form.getFieldValue = fieldName => getIn(form.values, fieldName);
  // const validateFunc =
  //   validate ||
  //   (validateSchema &&
  //     (val =>
  //       validateSchema
  //         .validate(val)
  //         .then(() => null)
  //         .catch(err => err.message))) ||
  //   (() => null);

  // const formChange = val => {
  //   form.setFieldValue(name, val);
  //   form.setTouched({ [name]: true });
  // };
  return {
    name: parent ? `${parent}.${name}` : name,
    value: (name && getIn(form.values, name, '')) || values,
    // onChange: name && callAll(formChange, onChange),
    // onBlur: name && callAll(form.handleBlur, onBlur),
    // error: name && getIn(form.touched, name) && getIn(form.errors, name),
    // touched: getIn(form.touched, name),
    form,
    ...rest,
  };
};

export const withForm = Component =>
  withFormik({
    mapPropsToValues: props =>
      props && (props.mapPropsToValues ? props.mapPropsToValues(props) : props.value || {}),
  })(
    ({
      dirty,
      errors,
      getFieldProps,
      handleBlur,
      handleChange,
      handleReset,
      handleSubmit,
      initialValues,
      isSubmitting,
      isValid,
      isValidating,
      registerField,
      resetForm,
      setErrors,
      setFieldTouched,
      setFieldValue,
      setStatus,
      setSubmitting,
      submitForm,
      setFieldError,
      setFormikState,
      setTouched,
      setValues,
      submitCount,
      touched,
      unregisterField,
      validateField,
      validateForm,
      validateOnBlur,
      validateOnChange,
      values,
      ...props
    }) => (
      <Component
        form={{
          dirty,
          errors,
          getFieldProps,
          handleBlur,
          handleChange,
          handleReset,
          handleSubmit,
          initialValues,
          isSubmitting,
          isValid,
          isValidating,
          registerField,
          resetForm,
          setErrors,
          setFieldError,
          setFieldTouched,
          setFieldValue,
          setStatus,
          setSubmitting,
          submitForm,
          setFormState: setFormikState,
          setTouched,
          setValues,
          submitCount,
          touched,
          unregisterField,
          validateField,
          validateForm,
          validateOnBlur,
          validateOnChange,
          values,
        }}
        {...props}
      />
    ),
  );
