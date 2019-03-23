function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { ListItem, ListItemText, ListItemIcon, ListItemAvatar, Divider, ListSubheader } from '@material-ui/core';

var BaseItem = function BaseItem(_ref) {
  var item = _ref.item,
      button = _ref.button,
      props = _objectWithoutProperties(_ref, ["item", "button"]);

  switch (item.variant) {
    case 'subheader':
      return React.createElement(ListSubheader, _extends({
        color: item.color
      }, props, {
        onClick: function onClick() {}
      }), item.primary);

    case 'divider':
      return React.createElement(Divider, null);

    default:
      return React.createElement(ListItem, _extends({
        button: button,
        onClick: props.onMouseDown
      }, props), item.icon && React.createElement(ListItemIcon, null, item.icon), item.avatar && React.createElement(ListItemAvatar, null, item.avatar), React.createElement(ListItemText, {
        primary: item.primary,
        secondary: item.secondary,
        primaryTypographyProps: {
          color: item.color
        }
      }));
  }
};

BaseItem.defaultProps = {
  button: true
};
export default BaseItem;