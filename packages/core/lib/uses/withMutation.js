function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { commitMutation } from 'react-relay';
import { withFormik } from 'formik';
export var withMutation = function withMutation() {
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
      mapProps = _ref.mapPropsToValues,
      mutationProps = _objectWithoutProperties(_ref, ["environment", "payloadToValue", "valueToInput", "mutation", "optimisticResponse", "optimisticUpdater", "updater", "updaterConfig", "onComplete", "onError", "mapPropsToValues"]);

  return function (Component) {
    return function (props) {
      var handleSubmit = function handleSubmit(values, _ref2) {
        var setErrors = _ref2.setErrors,
            setSubmitting = _ref2.setSubmitting;
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

      var mapPropsToValues = function mapPropsToValues(props) {
        return mapProps ? mapProps(props) : props && props.value || {};
      };

      var ComponentForm = withFormik(_objectSpread({
        handleSubmit: handleSubmit,
        mapPropsToValues: mapPropsToValues
      }, mutationProps))(function (formProps) {
        return React.createElement("form", {
          onSubmit: function onSubmit(e) {
            e.preventDefault();
            formProps.handleSubmit(e);
          },
          style: {
            height: '100%',
            width: '100%'
          },
          noValidate: true
        }, React.createElement(Component, _extends({
          form: formProps
        }, props)));
      });
      return React.createElement(ComponentForm, props);
    };
  };
};