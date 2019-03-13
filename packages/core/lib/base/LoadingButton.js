function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PulseLoader } from 'react-spinners';
import LoadingIcon from './LoadingIcon';
var useStyles = makeStyles({
  loader: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    marginTop: -12 // marginLeft: -12,

  }
});

var LoadingButton = function LoadingButton(_ref) {
  var loading = _ref.loading,
      disabled = _ref.disabled,
      children = _ref.children,
      color = _ref.color,
      props = _objectWithoutProperties(_ref, ["loading", "disabled", "children", "color"]);

  var classes = useStyles(props);
  return React.createElement(Button, _extends({
    color: color,
    disabled: disabled || loading
  }, props), !disabled && loading && React.createElement(LoadingIcon, {
    className: classes.loader,
    color: color
  }), children);
};

export default LoadingButton;