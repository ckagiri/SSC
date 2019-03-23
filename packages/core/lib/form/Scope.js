function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback } from 'react';
import { useFormikContext as useFormContext } from 'formik';
import { processValidationError } from '@ssc/common';
import { get } from 'lodash';

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

export var useScope = function useScope() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      parent = _ref.parent,
      rest = _objectWithoutProperties(_ref, ["name", "parent"]);

  var getName = function getName(parent) {
    return function (name) {
      return parent ? name ? "".concat(parent, ".").concat(name) : parent : name;
    };
  };

  var getFieldName = getName(getName(parent)(name));

  var _useFormContext = useFormContext(),
      _setFieldError = _useFormContext.setFieldError,
      _setFieldTouched = _useFormContext.setFieldTouched,
      _setFieldValue = _useFormContext.setFieldValue,
      values = _useFormContext.values,
      errors = _useFormContext.errors,
      touched = _useFormContext.touched;

  return _objectSpread({
    name: getName(parent)(name),
    setFieldValue: function setFieldValue(field, value, shouldValidate) {
      return _setFieldValue(getFieldName(field), value, shouldValidate);
    },
    setFieldTouched: function setFieldTouched(field, touched, shouldValidate) {
      return _setFieldTouched(getFieldName(field), touched, shouldValidate);
    },
    setFieldError: function setFieldError(field, error) {
      return _setFieldError(getFieldName(field), error);
    },
    getFieldValue: function getFieldValue(field) {
      return get(values, getFieldName(field));
    },
    getFieldError: function getFieldError(field) {
      return get(errors, getFieldName(field));
    },
    getFieldTouched: function getFieldTouched(field) {
      return get(touched, getFieldName(field));
    }
  }, rest);
}; // export const withField = Component => props => <Component {...useField(props)} />;
// export const Field = ({ Component, ...props }) => <Component {...useField(props)} />;