function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.2s ease-in-out'
    },
    top: {
      width: '100%' // padding: theme.spacing(1),

    },
    content: {
      flex: 1,
      overflowY: 'scroll',
      overflowX: 'hidden'
    },
    bottom: {
      width: '100%'
    }
  };
}); // import PropTypes from 'prop-types';

var Sidebar = function Sidebar(_ref) {
  var top = _ref.top,
      header = _ref.header,
      content = _ref.content,
      bottom = _ref.bottom,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["top", "header", "content", "bottom", "className"]);

  var classes = useStyles();
  return React.createElement(Paper, _extends({
    className: classNames(classes.root, className),
    square: true
  }, props), !!top && React.createElement("div", {
    className: classes.top
  }, " ", React.cloneElement(top, props)), React.createElement("div", {
    className: classes.content
  }, !!content && React.cloneElement(content, props)), !!bottom && React.createElement("div", {
    className: classes.bottom
  }, React.cloneElement(bottom, props)));
};

Sidebar.propTypes = {
  children: PropTypes.node
};
export default Sidebar;