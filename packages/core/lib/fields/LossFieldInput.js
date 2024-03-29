function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { weightValidation, bmi, getBmiLevel } from '@ssc/common';
import NumberInput from '../inputs/NumberInput';
import { useField } from '../form/Field';
import Typography from '../base/Typography';

var bmiText = function bmiText(height, weight) {
  var index = bmi(height, weight);
  return index && React.createElement(Typography, {
    color: getBmiLevel(index).level,
    variant: "inherit"
  }, "BMI sau khi gi\u1EA3m: ", index);
};

var LossField = function LossField(_ref) {
  var height = _ref.height,
      weight = _ref.weight,
      props = _objectWithoutProperties(_ref, ["height", "weight"]);

  return React.createElement(NumberInput, useField(_objectSpread({
    label: 'Nặng',
    endAdornment: 'kg',
    getHelperText: function getHelperText(_ref2) {
      var value = _ref2.value,
          helperText = _ref2.helperText;
      return bmiText(height, weight - value) || helperText;
    }
  }, props)));
};

export default LossField;