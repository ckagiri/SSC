import React from 'react';
import { Formik } from 'formik';
import { commitMutation } from 'react-relay';
import * as _ from 'lodash';

import Debug from './Debug';

// const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export const withForm = ({
  debug,
  mapPropsToValues,
  onSubmit,
  onReset,
  ...config
}) => Component => ({ value, error, ...props }) => {
  const Form = React.memo(Component);
  return (
    <Formik
      initialValues={mapPropsToValues ? mapPropsToValues(props) : value || {}}
      onSubmit={onSubmit || (() => {})}
      onReset={onReset || (() => {})}
      render={({
        handleSubmit,
        handleReset,
        dirty,
        isSubmitting,
        isValid,
        submitCount,
        errors,

        // form values
        initialValues,

        values,
        touched,

        // form validation
        isValidating,
        validateOnBlur,
        validateOnChange,

        // form actions
        getFieldProps,
        handleBlur,
        handleChange,
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
        unregisterField,
        validateField,
        validateForm,
        ...formProps
      }) => (
        <form onSubmit={handleSubmit} onReset={handleReset} autoComplete="off" noValidate>
          <Form
            dirty={dirty}
            isSubmitting={isSubmitting}
            isValid={isValid}
            submitCount={submitCount}
            error={(typeof errors === 'string' && errors) || error}
            {...formProps}
            {...props}
          />
          {debug && <Debug />}
        </form>
      )}
      {...config}
    />
  );
};

export const withMutation = ({
  environment,
  payloadToValue,
  valueToInput,
  mutation,
  optimisticResponse,
  optimisticUpdater,
  updater,
  updaterConfig,
  onComplete,
  onError,
  ...mutationProps
} = {}) => Component => props => {
  const onSubmit = (values, { setErrors }) =>
    new Promise((resolve, reject) => {
      if (mutation && environment) {
        commitMutation(environment, {
          mutation,
          variables: { input: valueToInput ? valueToInput(values) : values },
          onError: e => {
            setErrors(e && e[0]);
            if (onError) onError(e, props);
            reject(e);
          },
          onCompleted: v => {
            setErrors({});
            if (onComplete) onComplete(payloadToValue ? payloadToValue(v) : v, props);
            resolve(v);
          },
          optimisticResponse,
          optimisticUpdater,
          updater,
          config: updaterConfig,
        });
      } else if (onComplete) onComplete(values, props);
    });

  return withForm({ onSubmit, ...mutationProps })(Component)(props);
};
