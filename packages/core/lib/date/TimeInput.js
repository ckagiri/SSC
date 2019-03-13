function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { TimePicker } from 'material-ui-pickers';
import Input from '../inputs/Input';

var TimeInput = function TimeInput(_ref) {
  var value = _ref.value,
      props = _objectWithoutProperties(_ref, ["value"]);

  var InputComp = function InputComp(_ref2) {
    var error = _ref2.error,
        helperText = _ref2.helperText,
        inputValue = _ref2.value,
        rest = _objectWithoutProperties(_ref2, ["error", "helperText", "value"]);

    var isError = typeof error === 'boolean' || inputValue === 'Unknown';
    var errorMsg = isError ? helperText : error;
    var helperTextMsg = isError ? undefined : helperText;
    return React.createElement(Input, _extends({
      helperText: helperTextMsg,
      error: errorMsg,
      value: inputValue === 'Unknown' ? value : inputValue
    }, rest));
  };

  return React.createElement(TimePicker, _extends({
    TextFieldComponent: InputComp,
    ampm: false,
    autoOk: true,
    minutesStep: 5,
    clearLabel: "X\xF3a",
    cancelLabel: "\u0110\xF3ng",
    okLabel: "Ch\u1ECDn",
    label: "Gi\u1EDD",
    format: "T",
    resetable: false,
    value: value || null
  }, props));
};

export default TimeInput;