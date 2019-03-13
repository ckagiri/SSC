function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { FieldArray as FormikArray } from 'formik';
import { useField } from './Field';
export var connectArray = function connectArray(Component) {
  return function (_ref) {
    var onChange = _ref.onChange,
        props = _objectWithoutProperties(_ref, ["onChange"]);

    var _useField = useField(props),
        name = _useField.name,
        fieldProps = _objectWithoutProperties(_useField, ["name"]);

    return React.createElement(FormikArray, {
      name: name,
      render: function render(arrayHelpers) {
        return React.createElement(Component, _extends({
          arrayHelpers: arrayHelpers
        }, fieldProps, {
          onChange: onChange
        }));
      }
    });
  };
};