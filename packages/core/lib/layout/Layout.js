function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { createElement, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme, withTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LayoutContext from './LayoutContext';
export var useLayout = function useLayout() {
  return useContext(LayoutContext);
};
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      height: '100vh',
      overflow: 'hidden'
    },
    appFrame: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gridTemplateRows: 'auto auto 1fr',
      flexDirection: 'column',
      zIndex: 1,
      height: '100%',
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      minWidth: 'fit-content' // width: '100%',

    },
    appBar: {
      gridColumnStart: 'span 3'
    },
    sidebar: {
      gridRowStart: 'span 2',
      height: '100%',
      // width: 'auto',
      backgroundColor: theme.palette.background.sidebar
    },
    topbar: {
      gridColumnStart: 'span 2'
    },
    wrapper: {
      minHeight: '100%',
      overflow: 'scroll',
      backgroundColor: theme.palette.background.content
    },
    content: {
      minHeight: '100%',
      overflow: 'hidden' // minHeight: 'fit-content',

    },
    supplement: {}
  };
});

var Layout = function Layout(_ref) {
  var theme = _ref.theme,
      appBar = _ref.appBar,
      topBar = _ref.topBar,
      children = _ref.children,
      supplement = _ref.supplement,
      sidebar = _ref.sidebar,
      className = _ref.className,
      notification = _ref.notification,
      title = _ref.title,
      hiddenAt = _ref.hiddenAt,
      miniSidebar = _ref.miniSidebar,
      props = _objectWithoutProperties(_ref, ["theme", "appBar", "topBar", "children", "supplement", "sidebar", "className", "notification", "title", "hiddenAt", "miniSidebar"]);

  var classes = useStyles(props); // const theme = useTheme(props);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      sidebarOpen = _useState2[0],
      setSidebarOpen = _useState2[1];

  var _useState3 = useState(miniSidebar),
      _useState4 = _slicedToArray(_useState3, 2),
      sidebarMini = _useState4[0],
      setSidebarMini = _useState4[1];

  var openSidebar = function openSidebar() {
    return setSidebarOpen(true);
  };

  var closeSidebar = function closeSidebar() {
    return setSidebarOpen(false);
  };

  var xlUp = useMediaQuery(theme.breakpoints.up('xl'));
  var lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  var mdUp = useMediaQuery(theme.breakpoints.up('md'));
  var smUp = useMediaQuery(theme.breakpoints.up('sm'));
  var width = xlUp ? 'xl' : lgUp ? 'lg' : mdUp ? 'md' : smUp ? 'sm' : 'xs';
  var state = {
    // Sidebar
    sidebarOpen: sidebarOpen,
    openSidebar: openSidebar,
    closeSidebar: closeSidebar,
    collapse: function collapse() {
      return setSidebarMini(true);
    },
    expand: function expand() {
      return setSidebarMini(false);
    },
    sidebarMini: sidebarMini,
    theme: theme,
    xlUp: xlUp,
    lgUp: lgUp,
    mdUp: mdUp,
    smUp: smUp,
    width: width
  };
  return React.createElement(LayoutContext.Provider, {
    value: state
  }, React.createElement("div", {
    className: classnames(classes.root, className)
  }, React.createElement("div", {
    className: classes.appFrame
  }, React.createElement("header", {
    className: classes.appBar
  }, appBar && appBar), React.createElement("nav", {
    className: classes.sidebar
  }, sidebar && React.createElement(Hidden, hiddenAt && _defineProperty({}, hiddenAt, true), React.cloneElement(sidebar, {
    variant: sidebarMini ? 'mini' : undefined
  }))), React.createElement("div", {
    className: classes.topbar
  }, topBar && topBar), React.createElement("div", {
    className: classes.content
  }, children), React.createElement("div", {
    className: classes.supplement
  }, supplement && supplement)), sidebar && React.createElement(Drawer // container={this.props.container}
  , {
    variant: "temporary",
    open: sidebarOpen,
    onClose: closeSidebar
  }, sidebar)));
};

var componentPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.node]);
Layout.propTypes = {
  appBar: componentPropType,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  classes: PropTypes.object,
  className: PropTypes.string,
  error: componentPropType,
  notification: componentPropType,
  sidebar: componentPropType,
  supplement: componentPropType,
  title: PropTypes.string,
  topBar: componentPropType
};
Layout.defaultProps = {// appBar: AppBar,
  // error: Error,
  // menu: Menu,
  // notification: Notification,
  // sidebar: Sidebar,
};
export default withTheme(Layout);