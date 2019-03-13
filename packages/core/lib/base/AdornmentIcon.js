function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import { InputAdornment } from '@material-ui/core';
var useStyles = makeStyles(function (theme) {
  return {
    root: {},
    icon: {
      padding: 4,
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    standard: {
      marginBottom: 4
    },
    outlined: {// marginBottom: 0,
    },
    filled: {
      marginTop: 18
    },
    end: {
      marginRight: -theme.spacing(1),
      marginLeft: theme.spacing(1)
    },
    start: {
      marginLeft: -theme.spacing(1),
      marginRight: theme.spacing(1)
    }
  };
});

var AdornmentIcon = function AdornmentIcon(_ref) {
  var className = _ref.className,
      size = _ref.size,
      variant = _ref.variant,
      Icon = _ref.icon,
      position = _ref.position,
      props = _objectWithoutProperties(_ref, ["className", "size", "variant", "icon", "position"]);

  var classes = useStyles();
  return React.createElement(InputAdornment, {
    position: position,
    className: (classNames(classes[variant]), classes[position])
  }, React.createElement(IconButton, _extends({
    className: classes.icon
  }, props), React.createElement(Icon, {
    color: "action",
    fontSize: size
  })));
};

AdornmentIcon.defaultProps = {
  size: 'small',
  variant: 'standard'
};
export default AdornmentIcon;