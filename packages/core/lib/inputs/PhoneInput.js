function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import MaskedInput from 'react-text-mask';
import Input from './Input';

var PhoneMask = function PhoneMask(_ref) {
  var inputRef = _ref.inputRef,
      props = _objectWithoutProperties(_ref, ["inputRef"]);

  return React.createElement(MaskedInput, _extends({}, props, {
    ref: function ref(_ref2) {
      inputRef(_ref2 ? _ref2.inputElement : null);
    },
    mask: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/],
    placeholderChar: "\u2000",
    showMask: false
  }));
};

var PhoneInput = function PhoneInput(_ref3) {
  var _onChange = _ref3.onChange,
      props = _objectWithoutProperties(_ref3, ["onChange"]);

  return React.createElement(Input, _extends({
    resetable: false,
    label: "\u0110i\u1EC7n tho\u1EA1i",
    type: "tel",
    onChange: function onChange(v) {
      return _onChange && _onChange((v || '').replace(/\s/g, ''));
    }
  }, props, {
    inputComponent: PhoneMask
  }));
};

export default PhoneInput;