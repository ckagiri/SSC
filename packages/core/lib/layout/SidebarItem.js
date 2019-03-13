function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react'; // import PropTypes from 'prop-types';

import classnames from 'classnames';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '../base';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      minWidth: 200
    },
    icon: {},
    badge: {
      marginTop: 2,
      fontWeight: 500
    },
    listIcon: {// marginRight: 8,
    },
    secondaryIcon: {
      marginRight: -8
    },
    mini: {
      minWidth: 56
    }
  };
});

var SidebarItem = function SidebarItem(_ref) {
  var Icon = _ref.Icon,
      SecondaryIcon = _ref.SecondaryIcon,
      title = _ref.title,
      badge = _ref.badge,
      disabled = _ref.disabled,
      className = _ref.className,
      variant = _ref.variant,
      props = _objectWithoutProperties(_ref, ["Icon", "SecondaryIcon", "title", "badge", "disabled", "className", "variant"]);

  var classes = useStyles(props);
  var icon = Icon && React.createElement(ListItemIcon, {
    className: classes.listIcon
  }, React.createElement(Icon, {
    className: disabled ? null : classes.icon
  }));
  return React.createElement(ListItem, {
    disabled: disabled,
    className: classnames(classes.root, className, _defineProperty({}, classes.mini, variant === 'mini'))
  }, variant === 'mini' ? React.createElement(Tooltip, {
    title: title
  }, badge ? React.createElement(Badge, {
    badgeContent: badge,
    className: classes.badge
  }, icon) : icon) : React.createElement(React.Fragment, null, !!icon && icon, React.createElement(ListItemText, {
    primary: title,
    classes: {
      primary: classes.title
    }
  }), !!badge && React.createElement(Typography, {
    className: classes.badge,
    variant: "subtitle1"
  }, badge), SecondaryIcon && React.createElement(ListItemIcon, {
    className: classes.secondaryIcon
  }, React.createElement(SecondaryIcon, null))));
};

export default SidebarItem;