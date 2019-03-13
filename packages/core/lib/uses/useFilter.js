function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useState } from 'react';
import { remove } from 'diacritics';
import useControlProp from './useControlProp';

var useFilter = function useFilter(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      inputValue = _ref.inputValue,
      itemToString = _ref.itemToString,
      props = _objectWithoutProperties(_ref, ["items", "inputValue", "itemToString"]);

  var _useControlProp = useControlProp(inputValue),
      _useControlProp2 = _slicedToArray(_useControlProp, 2),
      filter = _useControlProp2[0],
      setFilter = _useControlProp2[1];

  var getItems = function getItems(items, value) {
    var filteredValue = remove((value || '').trim()).toLowerCase();
    var inputLength = filteredValue.length;
    var regex = new RegExp(filteredValue.replace(/./g, function (c) {
      return "".concat(c, "+.*");
    }), 'gi');
    return inputLength === 0 ? items : items.filter(function (item) {
      return !item.disabled && itemToString(item) && remove(itemToString(item)).search(regex) !== -1;
    });
  };

  return _objectSpread({}, props, {
    setFilter: setFilter,
    items: getItems(items, filter)
  });
};

export default useFilter;