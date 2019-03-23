function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Formik } from 'formik';
import { commitMutation } from 'react-relay';
import * as _ from 'lodash';
import Debug from './Debug'; // const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

export var withForm = function withForm(_ref) {
  var debug = _ref.debug,
      mapPropsToValues = _ref.mapPropsToValues,
      onSubmit = _ref.onSubmit,
      onReset = _ref.onReset,
      config = _objectWithoutProperties(_ref, ["debug", "mapPropsToValues", "onSubmit", "onReset"]);

  return function (Component) {
    return function (_ref2) {
      var value = _ref2.value,
          error = _ref2.error,
          props = _objectWithoutProperties(_ref2, ["value", "error"]);

      var Form = React.memo(Component);
      return React.createElement(Formik, _extends({
        initialValues: mapPropsToValues ? mapPropsToValues(props) : value || {},
        onSubmit: onSubmit || function () {},
        onReset: onReset || function () {},
        render: function render(_ref3) {
          var handleSubmit = _ref3.handleSubmit,
              handleReset = _ref3.handleReset,
              dirty = _ref3.dirty,
              isSubmitting = _ref3.isSubmitting,
              isValid = _ref3.isValid,
              submitCount = _ref3.submitCount,
              errors = _ref3.errors,
              initialValues = _ref3.initialValues,
              values = _ref3.values,
              touched = _ref3.touched,
              isValidating = _ref3.isValidating,
              validateOnBlur = _ref3.validateOnBlur,
              validateOnChange = _ref3.validateOnChange,
              getFieldProps = _ref3.getFieldProps,
              handleBlur = _ref3.handleBlur,
              handleChange = _ref3.handleChange,
              registerField = _ref3.registerField,
              resetForm = _ref3.resetForm,
              setErrors = _ref3.setErrors,
              setFieldTouched = _ref3.setFieldTouched,
              setFieldValue = _ref3.setFieldValue,
              setStatus = _ref3.setStatus,
              setSubmitting = _ref3.setSubmitting,
              submitForm = _ref3.submitForm,
              setFieldError = _ref3.setFieldError,
              setFormikState = _ref3.setFormikState,
              setTouched = _ref3.setTouched,
              setValues = _ref3.setValues,
              unregisterField = _ref3.unregisterField,
              validateField = _ref3.validateField,
              validateForm = _ref3.validateForm,
              formProps = _objectWithoutProperties(_ref3, ["handleSubmit", "handleReset", "dirty", "isSubmitting", "isValid", "submitCount", "errors", "initialValues", "values", "touched", "isValidating", "validateOnBlur", "validateOnChange", "getFieldProps", "handleBlur", "handleChange", "registerField", "resetForm", "setErrors", "setFieldTouched", "setFieldValue", "setStatus", "setSubmitting", "submitForm", "setFieldError", "setFormikState", "setTouched", "setValues", "unregisterField", "validateField", "validateForm"]);

          return React.createElement("form", {
            onSubmit: handleSubmit,
            onReset: handleReset,
            autoComplete: "off",
            noValidate: true
          }, React.createElement(Form, _extends({
            dirty: dirty,
            isSubmitting: isSubmitting,
            isValid: isValid,
            submitCount: submitCount,
            error: typeof errors === 'string' && errors || error
          }, formProps, props)), debug && React.createElement(Debug, null));
        }
      }, config));
    };
  };
};
export var withMutation = function withMutation() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      environment = _ref4.environment,
      payloadToValue = _ref4.payloadToValue,
      valueToInput = _ref4.valueToInput,
      mutation = _ref4.mutation,
      optimisticResponse = _ref4.optimisticResponse,
      optimisticUpdater = _ref4.optimisticUpdater,
      updater = _ref4.updater,
      updaterConfig = _ref4.updaterConfig,
      onComplete = _ref4.onComplete,
      _onError = _ref4.onError,
      mutationProps = _objectWithoutProperties(_ref4, ["environment", "payloadToValue", "valueToInput", "mutation", "optimisticResponse", "optimisticUpdater", "updater", "updaterConfig", "onComplete", "onError"]);

  return function (Component) {
    return function (props) {
      var onSubmit = function onSubmit(values, _ref5) {
        var setErrors = _ref5.setErrors;
        return new Promise(function (resolve, reject) {
          if (mutation && environment) {
            commitMutation(environment, {
              mutation: mutation,
              variables: {
                input: valueToInput ? valueToInput(values) : values
              },
              onError: function onError(e) {
                setErrors(e && e[0]);
                if (_onError) _onError(e, props);
                reject(e);
              },
              onCompleted: function onCompleted(v) {
                setErrors({});
                if (onComplete) onComplete(payloadToValue ? payloadToValue(v) : v, props);
                resolve(v);
              },
              optimisticResponse: optimisticResponse,
              optimisticUpdater: optimisticUpdater,
              updater: updater,
              config: updaterConfig
            });
          } else if (onComplete) onComplete(values, props);
        });
      };

      return withForm(_objectSpread({
        onSubmit: onSubmit
      }, mutationProps))(Component)(props);
    };
  };
};