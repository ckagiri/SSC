function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { commitMutation } from 'react-relay';
import { Formik, withFormik } from 'formik';
export var useMutation = function useMutation() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      environment = _ref.environment,
      payloadToValue = _ref.payloadToValue,
      valueToInput = _ref.valueToInput,
      mutation = _ref.mutation,
      optimisticResponse = _ref.optimisticResponse,
      optimisticUpdater = _ref.optimisticUpdater,
      updater = _ref.updater,
      updaterConfig = _ref.updaterConfig,
      onComplete = _ref.onComplete,
      _onError = _ref.onError,
      mutationProps = _objectWithoutProperties(_ref, ["environment", "payloadToValue", "valueToInput", "mutation", "optimisticResponse", "optimisticUpdater", "updater", "updaterConfig", "onComplete", "onError"]);

  return function (Component) {
    return function (_ref2) {
      var value = _ref2.value,
          props = _objectWithoutProperties(_ref2, ["value"]);

      var _useState = useState(false),
          _useState2 = _slicedToArray(_useState, 2),
          submitting = _useState2[0],
          setSubmitting = _useState2[1];

      var handleSubmit = function handleSubmit(values, _ref3) {
        var setErrors = _ref3.setErrors;

        if (mutation && environment) {
          setSubmitting(true);
          commitMutation(environment, {
            mutation: mutation,
            variables: {
              input: valueToInput ? valueToInput(values) : values
            },
            onError: function onError(e) {
              setSubmitting(false);
              setErrors(e && e[0]);
              if (_onError) _onError(e, props);
            },
            onCompleted: function onCompleted(v) {
              setErrors({});
              setSubmitting(false);
              if (onComplete) onComplete(payloadToValue ? payloadToValue(v) : v, props);
            },
            optimisticResponse: optimisticResponse,
            optimisticUpdater: optimisticUpdater,
            updater: updater,
            config: updaterConfig
          });
        } else if (onComplete) onComplete(values, props);
      };

      return React.createElement(Formik, _extends({
        onSubmit: handleSubmit,
        initialValues: value || {}
      }, mutationProps, props, {
        render: function render(formProps) {
          return React.createElement("form", {
            onSubmit: formProps.handleSubmit,
            noValidate: true
          }, React.createElement(Component, _extends({
            form: formProps,
            value: value,
            submitting: submitting
          }, props)));
        }
      }));
    };
  };
};