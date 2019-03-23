function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback } from 'react';
import { useFormikContext as useFormContext, getIn } from 'formik';
import { processValidationError } from '@ssc/common';
import * as _ from 'lodash';

var callAll = function callAll() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.forEach(function (fn) {
      return fn && fn.apply(void 0, args);
    });
  };
};

export var useField = function useField() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      parent = _ref.parent,
      onChange = _ref.onChange,
      onValueChange = _ref.onValueChange,
      onBlur = _ref.onBlur,
      onClear = _ref.onClear,
      validate = _ref.validate,
      validateSchema = _ref.validateSchema,
      disabled = _ref.disabled,
      error = _ref.error,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ["name", "parent", "onChange", "onValueChange", "onBlur", "onClear", "validate", "validateSchema", "disabled", "error", "value"]);

  var fieldName = parent ? name ? "".concat(parent, ".").concat(name) : parent : name;

  var _useFormContext = useFormContext(),
      values = _useFormContext.values,
      errors = _useFormContext.errors,
      touched = _useFormContext.touched,
      handleChange = _useFormContext.handleChange,
      handleBlur = _useFormContext.handleBlur,
      dirty = _useFormContext.dirty,
      registerField = _useFormContext.registerField,
      unregisterField = _useFormContext.unregisterField,
      setFieldValue = _useFormContext.setFieldValue,
      setFieldTouched = _useFormContext.setFieldTouched;

  var validator = validate || validateSchema && function (v) {
    return new Promise(function (resolve, reject) {
      validateSchema.validate(v, {
        abortEarly: false
      }).then(function (v) {
        resolve(undefined);
      }).catch(function (e) {
        reject(processValidationError(e));
      });
    });
  };

  React.useEffect(function () {
    if (fieldName) {
      // sync value to the form values
      if (!dirty && value) setFieldValue(fieldName, value);
      registerField(name, {
        validate: validator
      });
      return function () {
        unregisterField(name);
      };
    }

    return function () {};
  }, [name, parent, validate, validateSchema]);

  var handleValueChange = function handleValueChange(v) {
    setFieldValue(fieldName, v === null ? undefined : v);
    setFieldTouched(fieldName, true);
  };

  return _objectSpread({}, rest, {
    disabled: disabled,
    name: fieldName,
    value: getIn(values, fieldName),
    error: !disabled && (error || getIn(touched, fieldName) && getIn(errors, fieldName)),
    onChange: useCallback(callAll(handleChange(fieldName), onChange), [fieldName]),
    onValueChange: useCallback(callAll(handleValueChange), onValueChange),
    onBlur: useCallback(callAll(handleBlur(fieldName), onChange), [fieldName]),
    onClear: useCallback(callAll(function () {
      return setFieldValue(fieldName, undefined);
    }, onClear), [fieldName])
  });
};
export var withField = function withField(Component) {
  return function (props) {
    return React.createElement(Component, useField(props));
  };
};
export var Field = function Field(_ref2) {
  var Component = _ref2.Component,
      props = _objectWithoutProperties(_ref2, ["Component"]);

  return React.createElement(Component, useField(props));
};