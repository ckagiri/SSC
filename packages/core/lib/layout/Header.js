function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Typography from '../base/Typography';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
      minHeight: 64,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginRight: theme.spacing(2)
    },
    title: {
      flex: 1,
      display: 'flex',
      minHeight: 64,
      justifyContent: 'center',
      flexDirection: 'column',
      marginLeft: theme.spacing(2)
    },
    subheader: {
      marginTop: -5
    },
    action: {
      alignItems: 'center',
      display: 'flex',
      marginRight: -theme.spacing(1),
      height: '100%',
      justifyContent: 'center'
    },
    icon: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(1)
    },
    content: {
      display: 'flex',
      marginBottom: 0,
      alignItems: 'flex-start'
    }
  };
});

var Header = function Header(_ref) {
  var icon = _ref.icon,
      action = _ref.action,
      title = _ref.title,
      subheader = _ref.subheader,
      className = _ref.className,
      titleColor = _ref.titleColor,
      props = _objectWithoutProperties(_ref, ["icon", "action", "title", "subheader", "className", "titleColor"]);

  var classes = useStyles(props);
  return React.createElement("header", _extends({
    className: classNames(classes.root, className)
  }, props), icon && React.createElement("div", {
    className: classes.icon
  }, icon), React.createElement("div", {
    className: classes.title
  }, title && (typeof title === 'string' ? React.createElement(Typography, {
    variant: "h6",
    color: titleColor
  }, title) : title), subheader && typeof subheader === 'string' ? React.createElement(Typography, {
    color: "textSecondary",
    className: classes.subheader
  }, subheader) : subheader), !!action && React.createElement("div", {
    className: classes.action
  }, action));
};

export default Header;