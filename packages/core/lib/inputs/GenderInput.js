function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { MenuItem } from '@material-ui/core';
import Autocomplete from './AutocompleteInput';

var GenderInput = function GenderInput(props) {
  return React.createElement(Autocomplete, _extends({
    items: [{
      value: 'F',
      title: 'Nữ'
    }, {
      value: 'M',
      title: 'Nam'
    }],
    label: "Gi\u1EDBi t\xEDnh"
  }, props));
};

export default GenderInput;