function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
var styles = {
  loader: {
    margin: 14
  }
};

var LoadingIndicator = function LoadingIndicator(_ref) {
  var classes = _ref.classes,
      className = _ref.className,
      isLoading = _ref.isLoading,
      rest = _objectWithoutProperties(_ref, ["classes", "className", "isLoading"]);

  return isLoading ? React.createElement(CircularProgress, _extends({
    className: classNames('app-loader', classes.loader, className),
    color: "inherit",
    size: 18,
    thickness: 5
  }, rest)) : null;
};

LoadingIndicator.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  width: PropTypes.string
};
export default withStyles(styles)(LoadingIndicator);