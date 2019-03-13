function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { useFormikContext as useFormContext, getIn, setIn } from 'formik';
import { processValidationError } from '@ssc/common';

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
      fieldName = _ref.name,
      parent = _ref.parent,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      validate = _ref.validate,
      validateSchema = _ref.validateSchema,
      disabled = _ref.disabled,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ["name", "parent", "onChange", "onBlur", "validate", "validateSchema", "disabled", "value"]);

  var _getFieldName = function getFieldName(name, parent) {
    return parent ? name ? "".concat(parent, ".").concat(name) : parent : name;
  };

  var form = useFormContext(rest);
  var submitCount = form.submitCount;

  var name = _getFieldName(fieldName, parent);

  var getFieldValue = function getFieldValue(fieldName, defaultValue) {
    return getIn(form.values, _getFieldName(fieldName, name), defaultValue);
  };

  var setFieldValue = function setFieldValue(fieldName, value) {
    return form.setFieldValue(_getFieldName(fieldName, name), value || undefined);
  };

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
    if (name) {
      // sync value to the form values
      if (!form.dirty && value) form.setFieldValue(name, value);
      form.registerField(name, {
        validate: validator
      });
      return function () {
        form.unregisterField(name);
      };
    }

    return function () {};
  }, [name, validate, validateSchema]);

  var formChange = function formChange(val) {
    form.setFieldValue(name, val || undefined);
    form.setFieldTouched(name, true);
  };

  return _objectSpread({
    name: name,
    value: getFieldValue(null),
    disabled: disabled,
    onChange: name && callAll(formChange, onChange // validateOnChange && validator
    ),
    onBlur: name && callAll(form.handleBlur, onBlur // validateOnBlur && (() => validator(getFieldValue()))
    ),
    error: !disabled && name && getIn(form.touched, name, !!submitCount) ? getIn(form.errors, name) : null
  }, rest, {
    form: _objectSpread({}, form, {
      getFieldValue: getFieldValue,
      setFieldValue: setFieldValue,
      setFieldTouched: function setFieldTouched(fieldName) {
        var touched = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return form.setFieldTouched(_getFieldName(fieldName, name), touched);
      },
      setFieldError: function setFieldError(fieldName, error) {
        return form.setFieldError(_getFieldName(fieldName, name), error);
      },
      getFieldName: function getFieldName(fieldName) {
        return _getFieldName(name, parent);
      }
    })
  });
};
export var connect = function connect(Component) {
  return function (props) {
    return React.createElement(Component, useField(props));
  };
};
export var Field = function Field(_ref2) {
  var Component = _ref2.Component,
      props = _objectWithoutProperties(_ref2, ["Component"]);

  return React.createElement(Component, useField(props));
};