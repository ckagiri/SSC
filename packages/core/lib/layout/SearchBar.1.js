function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import MenuIcon from 'mdi-material-ui/Menu';
import AddIcon from 'mdi-material-ui/Plus';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { omit } from 'lodash';
import AdornmentIcon from '../base/AdornmentIcon';
import AutoComplete from '../inputs/AutocompleteInput';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      paddingTop: 0,
      paddingBottom: 0,
      border: 'none',
      height: 40,
      margin: 0
    },
    notchedOutline: {
      border: 'none'
    },
    paper: {
      paddingTop: 4,
      paddingBottom: 4
    }
  };
});

var SearchBar = function SearchBar(_ref) {
  var onMenu = _ref.onMenu,
      onAdd = _ref.onAdd,
      props = _objectWithoutProperties(_ref, ["onMenu", "onAdd"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var classes = useStyles(props);
  return React.createElement("div", null, React.createElement(Paper, {
    className: classes.paper,
    elevation: focus ? 2 : 0,
    onMouseEnter: function onMouseEnter() {
      return setFocus(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setFocus(false);
    }
  }, React.createElement(AutoComplete, _extends({
    elevation: 1,
    variant: "outlined",
    margin: "none",
    placeholder: "Search",
    classes: omit(classes, 'paper'),
    select: false,
    startAdornment: React.createElement(AdornmentIcon, {
      position: "start",
      variant: "outlined",
      icon: MenuIcon,
      onClick: onMenu
    }),
    endAdornment: React.createElement(AdornmentIcon, {
      position: "end",
      variant: "outlined",
      icon: AddIcon,
      onClick: onAdd
    })
  }, props))));
};

export default SearchBar;