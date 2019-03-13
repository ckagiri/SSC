import React, { useState } from 'react';
import { commitMutation } from 'react-relay';
import { withFormik } from 'formik';

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
  mapPropsToValues: mapProps,
  ...mutationProps
} = {}) => Component => props => {
  const handleSubmit = (values, { setErrors, setSubmitting }) =>
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

  const mapPropsToValues = props => (mapProps ? mapProps(props) : (props && props.value) || {});
  const ComponentForm = withFormik({ handleSubmit, mapPropsToValues, ...mutationProps })(
    formProps => (
      <form
        onSubmit={e => {
          e.preventDefault();
          formProps.handleSubmit(e);
        }}
        style={{ height: '100%', width: '100%' }}
        noValidate
      >
        <Component form={formProps} {...props} />
      </form>
    ),
  );
  return <ComponentForm {...props} />;
};
