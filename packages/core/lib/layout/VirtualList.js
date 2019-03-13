function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Component } from 'react';
import MuiListItem from '@material-ui/core/ListItem';
import { PulseLoader } from 'react-spinners';
import { makeStyles } from '@material-ui/styles';
import { InfiniteLoader, Grid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
var itemStyles = makeStyles(function (theme) {
  return {
    even: {
      backgroundColor: theme.palette.grey[100]
    }
  };
});

var ListItem = function ListItem(_ref) {
  var index = _ref.index,
      getListItem = _ref.getListItem,
      style = _ref.style,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["index", "getListItem", "style", "className"]);

  var classes = itemStyles();
  return React.createElement("div", {
    style: style,
    className: classes[(index + 1) % 2 ? 'odd' : 'even']
  }, getListItem(_objectSpread({
    index: index
  }, props)));
};

var VirtualList =
/*#__PURE__*/
function (_Component) {
  _inherits(VirtualList, _Component);

  function VirtualList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, VirtualList);

    for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VirtualList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "cache", new CellMeasurerCache({
      fixedHeight: !!_this.props.rowHeight,
      fixedWidth: !_this.props.rowHeight,
      defaultWidth: _this.props.width,
      minWidth: _this.props.width,
      defaultHeight: 48,
      keyMapper: function keyMapper(r, c) {
        return _this.props.getItemKey ? _this.props.getItemKey(r) : r;
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "startIndex", 0);

    _defineProperty(_assertThisInitialized(_this), "getMenuHeight", function (rowHeight, rowCount, menuItemCount, showEmpty) {
      if (rowCount) {
        var visibleCount = Math.min(rowCount, menuItemCount);
        var height = 0;

        for (var i = _this.startIndex; i < visibleCount + _this.startIndex; i++) {
          height += typeof rowHeight === 'function' ? rowHeight({
            index: i
          }) : rowHeight;
        }

        return height;
      }

      if (showEmpty) {
        return typeof rowHeight === 'function' ? rowHeight({
          index: 0
        }) : rowHeight;
      }

      return 0;
    });

    return _this;
  }

  _createClass(VirtualList, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.getItemKey !== nextProps.getItemKey) {
        // eslint-disable-next-line
        this.cache._keyMapper = function (r, c) {
          return nextProps.getItemKey ? nextProps.getItemKey(r) : r;
        };
      }

      if (this.props.totalCount !== nextProps.totalCount || this.props.width !== nextProps.width) {
        // Need to recalculate all heights since list is changed
        this.cache.clearAll(); // this.grid.forceUpdate();
        // this.list.recomputeRowHeights();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          menuItemCount = _this$props.menuItemCount,
          rowHeightProp = _this$props.rowHeight,
          rowCount = _this$props.rowCount,
          totalCount = _this$props.totalCount,
          loadMoreRows = _this$props.loadMoreRows,
          loading = _this$props.loading,
          getItem = _this$props.getItem,
          getItemKey = _this$props.getItemKey,
          menuHeight = _this$props.menuHeight,
          getEmpty = _this$props.getEmpty,
          getLoader = _this$props.getLoader,
          width = _this$props.width,
          props = _objectWithoutProperties(_this$props, ["menuItemCount", "rowHeight", "rowCount", "totalCount", "loadMoreRows", "loading", "getItem", "getItemKey", "menuHeight", "getEmpty", "getLoader", "width"]);

      var infiniteLoaderProps = {
        loadMoreRows: loadMoreRows,
        rowCount: totalCount,
        isRowLoaded: function isRowLoaded(index) {
          return index < rowCount;
        }
      };
      var fixedHeight = !!rowHeightProp;
      var rowHeight = rowHeightProp || this.cache.rowHeight;
      var listCount = loadMoreRows ? Math.min(totalCount, rowCount + 1) : rowCount;
      var height = menuHeight || this.getMenuHeight(rowHeight, listCount, menuItemCount, !!getEmpty);

      var cellRenderer = function cellRenderer(_ref2) {
        var rowIndex = _ref2.rowIndex,
            style = _ref2.style,
            parent = _ref2.parent,
            key = _ref2.key,
            rowProps = _objectWithoutProperties(_ref2, ["rowIndex", "style", "parent", "key"]);

        var getListItem = rowIndex < rowCount ? getItem : getLoader;

        var _key = getItemKey ? getItemKey(rowIndex) : key;

        return React.createElement(CellMeasurer, {
          cache: _this2.cache,
          columnIndex: 0,
          rowIndex: rowIndex,
          parent: parent,
          key: _key
        }, React.createElement(ListItem, _extends({
          style: _objectSpread({}, style, {
            whiteSpace: fixedHeight ? 'nowrap' : null
          }),
          key: _key,
          index: rowIndex,
          getListItem: getListItem
        }, rowProps)));
      };

      var listProps = _objectSpread({
        width: (fixedHeight ? this.cache.columnWidth(0) : width) || 100,
        columnWidth: (fixedHeight ? this.cache.columnWidth : width) || 100,
        height: height,
        cellRenderer: cellRenderer,
        noRowsRenderer: getEmpty,
        rowHeight: rowHeight,
        rowCount: listCount,
        columnCount: 1,
        overscanColumnCount: 0,
        overscanRowCount: 2,
        deferredMeasurementCache: this.cache
      }, props);

      return loadMoreRows ? React.createElement(InfiniteLoader, infiniteLoaderProps, function (_ref3) {
        var onRowsRendered = _ref3.onRowsRendered,
            registerChild = _ref3.registerChild;
        return React.createElement(Grid, _extends({
          onSectionRendered: function onSectionRendered(_ref4) {
            var rowStartIndex = _ref4.rowStartIndex,
                rowStopIndex = _ref4.rowStopIndex;

            _this2.forceUpdate();

            _this2.startIndex = rowStartIndex;
            if (onRowsRendered) onRowsRendered({
              startIndex: rowStartIndex,
              stopIndex: rowStopIndex
            });
          },
          ref: function ref(el) {
            _this2.grid = el;

            if (registerChild) {
              registerChild(el);
            }
          }
        }, listProps));
      }) : React.createElement(Grid, _extends({
        ref: function ref(el) {
          _this2.grid = el;
        }
      }, listProps));
    }
  }]);

  return VirtualList;
}(Component);

VirtualList.defaultProps = {
  menuItemCount: 5,
  getLoader: function getLoader() {
    return React.createElement(MuiListItem, {
      button: true,
      disabled: true
    }, React.createElement(PulseLoader, {
      size: 10,
      margin: "2px"
    }));
  }
};
export default VirtualList;