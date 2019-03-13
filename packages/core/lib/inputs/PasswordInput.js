function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import VisibleIconOff from 'mdi-material-ui/EyeOff';
import VisibleIconOn from 'mdi-material-ui/Eye';
import { IconButton, InputAdornment } from '@material-ui/core';
import Input from './Input';
import AdornmentIcon from '../base/AdornmentIcon';

var PasswordInput = function PasswordInput(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visibility = _useState2[0],
      setVisibilty = _useState2[1];

  var VisibleIcon = function VisibleIcon() {
    return React.createElement(AdornmentIcon, {
      onMouseDown: function onMouseDown() {
        return setVisibilty(!visibility);
      },
      icon: visibility ? VisibleIconOff : VisibleIconOn,
      size: "default"
    });
  };

  return React.createElement(Input, _extends({
    label: "M\u1EADt kh\u1EA9u",
    type: visibility ? 'text' : 'password',
    endAdornment: React.createElement(VisibleIcon, null)
  }, props));
};

export default PasswordInput;