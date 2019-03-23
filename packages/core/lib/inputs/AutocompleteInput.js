function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import zIndex from '@material-ui/core/styles/zIndex';
import Input from './InputBase';
import VirtualList from '../layout/VirtualList';
import useFilter from '../uses/useFilter';
import BaseItem from '../base/BaseItem';

var Autocomplete = function Autocomplete(_ref) {
  var itemsProp = _ref.items,
      itemToString = _ref.itemToString,
      itemToValue = _ref.itemToValue,
      valueToString = _ref.valueToString,
      getRootProps = _ref.getRootProps,
      onClear = _ref.onClear,
      loading = _ref.loading,
      onRefetch = _ref.onRefetch,
      onValueChange = _ref.onValueChange,
      onChange = _ref.onChange,
      onSelect = _ref.onSelect,
      className = _ref.className,
      select = _ref.select,
      loadMoreRows = _ref.loadMoreRows,
      totalCount = _ref.totalCount,
      rowHeight = _ref.rowHeight,
      menuHeight = _ref.menuHeight,
      menuItemCount = _ref.menuItemCount,
      renderItem = _ref.renderItem,
      getItemKey = _ref.getItemKey,
      square = _ref.square,
      elevation = _ref.elevation,
      value = _ref.value,
      _inputRef = _ref.inputRef,
      _onFocus = _ref.onFocus,
      onInputValueChange = _ref.onInputValueChange,
      inputValue = _ref.inputValue,
      props = _objectWithoutProperties(_ref, ["items", "itemToString", "itemToValue", "valueToString", "getRootProps", "onClear", "loading", "onRefetch", "onValueChange", "onChange", "onSelect", "className", "select", "loadMoreRows", "totalCount", "rowHeight", "menuHeight", "menuItemCount", "renderItem", "getItemKey", "square", "elevation", "value", "inputRef", "onFocus", "onInputValueChange", "inputValue"]);

  var inputNode = useRef(null);

  var _useFilter = useFilter({
    items: itemsProp,
    itemToString: itemToString,
    inputValue: inputValue
  }),
      setFilter = _useFilter.setFilter,
      filteredItems = _useFilter.items;

  var items = onRefetch ? itemsProp : filteredItems;

  var handleInputValueChange = function handleInputValueChange(v, state) {
    if (onRefetch) {
      onRefetch(v, state);
    } else {
      setFilter(v);
    } // if (onInputValueChange) onInputValueChange(value);

  };

  return React.createElement(Downshift, {
    initialInputValue: valueToString ? valueToString(value) : itemToString(value) || '',
    inputValue: inputValue,
    itemCount: items && items.length // Needed for windowing
    ,
    itemToString: itemToString,
    onInputValueChange: handleInputValueChange,
    onChange: function onChange(i) {
      return onValueChange && onValueChange(itemToValue(i));
    },
    onSelect: onSelect,
    initialIsOpen: false
  }, function (downshiftProps) {
    return React.createElement("div", _extends({}, getRootProps && getRootProps(), {
      className: className
    }), React.createElement(Input, _extends({}, downshiftProps.getInputProps(), {
      onFocus: function onFocus(e) {
        downshiftProps.openMenu();
        if (_onFocus) _onFocus(e);
      },
      onClear: function onClear() {
        downshiftProps.clearSelection(); // if (onClear) onClear();
        // handleInputValueChange(null);

        downshiftProps.openMenu();
      },
      loading: loading,
      onValueChange: onInputValueChange // value={downshiftProps.inputValue || ''}
      ,
      inputRef: function inputRef(node) {
        inputNode.current = node && node.parentNode;

        if (_inputRef && typeof _inputRef === 'function') {
          _inputRef(node);
        }
      },
      isOpen: downshiftProps.isOpen,
      openMenu: downshiftProps.openMenu,
      closeMenu: downshiftProps.closeMenu,
      select: select || items && !!items.length
    }, props)), downshiftProps.isOpen && inputNode.current ? React.createElement(Popper, {
      open: true,
      anchorEl: inputNode.current,
      placement: "bottom-start",
      style: {
        zIndex: zIndex.modal
      },
      modifiers: {
        preventOverflow: {
          enabled: false
        },
        hide: {
          enabled: false
        }
      }
    }, function (_ref2) {
      var placement = _ref2.placement;
      return React.createElement(Paper, _extends({
        style: {
          minWidth: inputNode.current && inputNode.current.clientWidth,
          borderTopRightRadius: placement === 'bottom-start' ? 0 : null,
          borderTopLeftRadius: placement === 'bottom-start' ? 0 : null,
          bottom: placement === 'top-start' ? 8 : null
        }
      }, downshiftProps.getMenuProps({}, {
        suppressRefError: true
      }), {
        square: square,
        elevation: elevation
      }), React.createElement(VirtualList, _extends({
        width: inputNode.current && inputNode.current.clientWidth,
        menuItemCount: menuItemCount,
        rowHeight: rowHeight,
        rowCount: items && items.length || 0,
        totalCount: totalCount,
        loadMoreRows: loadMoreRows,
        loading: loading,
        menuHeight: menuHeight,
        getItem: function getItem(_ref3) {
          var index = _ref3.index,
              rest = _objectWithoutProperties(_ref3, ["index"]);

          return items && items[index] && renderItem(_objectSpread({
            item: items[index],
            index: index
          }, rest, downshiftProps));
        },
        getItemKey: getItemKey
      }, props)));
    }) : null);
  });
};

var renderItem = function renderItem(_ref4) {
  var item = _ref4.item,
      index = _ref4.index,
      itemToString = _ref4.itemToString,
      getItemProps = _ref4.getItemProps;
  return React.createElement(BaseItem, _extends({
    item: _objectSpread({}, item, {
      primary: itemToString(item)
    })
  }, getItemProps({
    item: item,
    index: index
  })));
};

Autocomplete.defaultProps = {
  itemToString: function itemToString(item) {
    return item ? typeof item === 'string' ? item : item.name || item.title || item.description || item.value : '';
  },
  itemToValue: function itemToValue(item) {
    return item ? item.value || item : null;
  },
  renderItem: renderItem,
  onChange: function onChange() {},
  items: [],
  menuItemCount: 5,
  inputRef: undefined,
  focusOnClear: true,
  select: true
};
Autocomplete.propTypes = {
  elevation: PropTypes.number,
  focusOnClear: PropTypes.bool,
  getInfiniteLoaderProps: PropTypes.func,
  getInputProps: PropTypes.func,
  getItems: PropTypes.func,
  getListItem: PropTypes.func,
  getListItemKey: PropTypes.func,
  getRootProps: PropTypes.func,
  getVirtualListProps: PropTypes.func,
  includeFooter: PropTypes.bool,
  inputRef: PropTypes.func,
  inputValueChange: PropTypes.func,
  items: PropTypes.array,
  itemToString: PropTypes.func,
  itemToValue: PropTypes.func,
  loading: PropTypes.bool,
  loadMoreRows: PropTypes.func,
  menuHeight: PropTypes.number,
  menuItemCount: PropTypes.number,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  onRefetch: PropTypes.func,
  onSelect: PropTypes.func,
  renderItem: PropTypes.func,
  rowHeight: PropTypes.number,
  select: PropTypes.bool,
  selectedItem: PropTypes.object,
  showEmpty: PropTypes.bool,
  square: PropTypes.bool,
  totalCount: PropTypes.number,
  valueToString: PropTypes.func
};
export var stateChangeTypes = Downshift.stateChangeTypes;
export var resetIdCounter = Downshift.resetIdCounter;
export default React.memo(Autocomplete);