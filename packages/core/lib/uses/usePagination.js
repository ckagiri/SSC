function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useRef, useState } from 'react';
import { get } from 'lodash';

var usePagination = function usePagination(_ref) {
  var _ref$relay = _ref.relay,
      hasMore = _ref$relay.hasMore,
      isLoading = _ref$relay.isLoading,
      loadMore = _ref$relay.loadMore,
      refetch = _ref$relay.refetchConnection,
      getFilter = _ref.getFilter,
      retry = _ref.retry,
      queryError = _ref.error,
      _ref$menuItemCount = _ref.menuItemCount,
      menuItemCount = _ref$menuItemCount === void 0 ? 5 : _ref$menuItemCount,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? {} : _ref$items,
      props = _objectWithoutProperties(_ref, ["relay", "getFilter", "retry", "error", "menuItemCount", "items"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState(queryError),
      _useState4 = _slicedToArray(_useState3, 2),
      errors = _useState4[0],
      setError = _useState4[1];

  var fetcher = useRef(null);
  var loadedCount = get(items, 'edges', []).length;
  var totalCount = get(items, 'totalCount') || 0;

  var startLoading = function startLoading(fetch) {
    setLoading(true);
    if (fetcher.current) fetcher.current.dispose();
    fetcher.current = fetch;
  };

  var finishLoading = function finishLoading(err) {
    setLoading(isLoading());
    setError(err);
    if (fetcher.current) fetcher.current.dispose();
  };

  var onRefetch = function onRefetch(value) {
    return startLoading(refetch(menuItemCount, finishLoading, getFilter(value)));
  };

  var _loadMoreRows = function loadMoreRows(_ref2) {
    var stopIndex = _ref2.stopIndex;
    return hasMore() && stopIndex >= loadedCount && startLoading(loadMore(menuItemCount, finishLoading));
  };

  return _objectSpread({}, props, {
    menuItemCount: menuItemCount,
    loadMoreRows: function loadMoreRows(index) {
      return _loadMoreRows(index);
    },
    totalCount: totalCount,
    items: items && items.edges,
    itemToValue: function itemToValue(item) {
      return item.node;
    },
    error: errors && errors[0],
    getItemKey: function getItemKey(index) {
      return get(items, "edges.".concat(index, ".cursor"), "".concat(index, "_loader"));
    },
    onRefetch: onRefetch,
    loading: loading
  });
};

export default usePagination;