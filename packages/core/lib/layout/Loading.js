function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

var Loading = function Loading(_ref) {
  var classes = _ref.classes,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["classes", "className"]);

  return React.createElement(LinearProgress, _extends({
    classes: classes
  }, props));
};

var styles = function styles() {
  return {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 0,
      height: 2
    },
    colorPrimary: {}
  };
};

Loading.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string
};
export default withStyles(styles)(Loading);