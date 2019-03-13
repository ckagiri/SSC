import React, { useState } from 'react';
import { commitMutation } from 'react-relay';
import { Formik, withFormik } from 'formik';

export const useMutation = ({
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
} = {}) => Component => ({ value, ...props }) => {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (values, { setErrors }) => {
    if (mutation && environment) {
      setSubmitting(true);
      commitMutation(environment, {
        mutation,
        variables: { input: valueToInput ? valueToInput(values) : values },
        onError: e => {
          setSubmitting(false);
          setErrors(e && e[0]);
          if (onError) onError(e, props);
        },
        onCompleted: v => {
          setErrors({});
          setSubmitting(false);
          if (onComplete) onComplete(payloadToValue ? payloadToValue(v) : v, props);
        },
        optimisticResponse,
        optimisticUpdater,
        updater,
        config: updaterConfig,
      });
    } else if (onComplete) onComplete(values, props);
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={value || {}}
      {...mutationProps}
      {...props}
      render={formProps => (
        <form onSubmit={formProps.handleSubmit} noValidate>
          <Component form={formProps} value={value} submitting={submitting} {...props} />
        </form>
      )}
    />
  );
};
