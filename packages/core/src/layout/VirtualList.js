import React, { Component } from 'react';
import MuiListItem from '@material-ui/core/ListItem';
import { PulseLoader } from 'react-spinners';
import { makeStyles } from '@material-ui/styles';
import { InfiniteLoader, Grid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const itemStyles = makeStyles(theme => ({
  even: {
    backgroundColor: theme.palette.grey[100],
  },
}));

const ListItem = ({ index, getListItem, style, className, ...props }) => {
  const classes = itemStyles();
  return (
    <div style={style} className={classes[(index + 1) % 2 ? 'odd' : 'even']}>
      {getListItem({
        index,
        ...props,
      })}
    </div>
  );
};
class VirtualList extends Component {
  cache = new CellMeasurerCache({
    fixedHeight: !!this.props.rowHeight,
    fixedWidth: !this.props.rowHeight,
    defaultWidth: this.props.width,
    minWidth: this.props.width,
    defaultHeight: 48,
    keyMapper: (r, c) => (this.props.getItemKey ? this.props.getItemKey(r) : r),
  });

  startIndex = 0;

  getMenuHeight = (rowHeight, rowCount, menuItemCount, showEmpty) => {
    if (rowCount) {
      const visibleCount = Math.min(rowCount, menuItemCount);
      let height = 0;
      for (let i = this.startIndex; i < visibleCount + this.startIndex; i++) {
        height += typeof rowHeight === 'function' ? rowHeight({ index: i }) : rowHeight;
      }
      return height;
    }
    if (showEmpty) {
      return typeof rowHeight === 'function' ? rowHeight({ index: 0 }) : rowHeight;
    }
    return 0;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.getItemKey !== nextProps.getItemKey) {
      // eslint-disable-next-line
      this.cache._keyMapper = (r, c) => (nextProps.getItemKey ? nextProps.getItemKey(r) : r);
    }

    if (this.props.totalCount !== nextProps.totalCount || this.props.width !== nextProps.width) {
      // Need to recalculate all heights since list is changed
      this.cache.clearAll();
      // this.grid.forceUpdate();
      // this.list.recomputeRowHeights();
    }
  }

  render() {
    const {
      menuItemCount,
      rowHeight: rowHeightProp,
      rowCount,
      totalCount,
      loadMoreRows,
      loading,
      getItem,
      getItemKey,
      menuHeight,
      getEmpty,
      getLoader,
      width,
      ...props
    } = this.props;

    const infiniteLoaderProps = {
      loadMoreRows,
      rowCount: totalCount,
      isRowLoaded: index => index < rowCount,
    };

    const fixedHeight = !!rowHeightProp;
    const rowHeight = rowHeightProp || this.cache.rowHeight;

    const listCount = loadMoreRows ? Math.min(totalCount, rowCount + 1) : rowCount;
    const height =
      menuHeight || this.getMenuHeight(rowHeight, listCount, menuItemCount, !!getEmpty);
    const cellRenderer = ({ rowIndex, style, parent, key, ...rowProps }) => {
      const getListItem = rowIndex < rowCount ? getItem : getLoader;
      const _key = getItemKey ? getItemKey(rowIndex) : key;

      return (
        <CellMeasurer
          cache={this.cache}
          columnIndex={0}
          rowIndex={rowIndex}
          parent={parent}
          key={_key}
        >
          <ListItem
            style={{
              ...style,
              whiteSpace: fixedHeight ? 'nowrap' : null,
            }}
            key={_key}
            index={rowIndex}
            getListItem={getListItem}
            {...rowProps}
          />
        </CellMeasurer>
      );
    };

    const listProps = {
      width: (fixedHeight ? this.cache.columnWidth(0) : width) || 100,
      columnWidth: (fixedHeight ? this.cache.columnWidth : width) || 100,
      height,
      cellRenderer,
      noRowsRenderer: getEmpty,
      rowHeight,
      rowCount: listCount,
      columnCount: 1,
      overscanColumnCount: 0,
      overscanRowCount: 2,
      deferredMeasurementCache: this.cache,
      ...props,
    };

    return loadMoreRows ? (
      <InfiniteLoader {...infiniteLoaderProps}>
        {({ onRowsRendered, registerChild }) => (
          <Grid
            onSectionRendered={({ rowStartIndex, rowStopIndex }) => {
              this.forceUpdate();
              this.startIndex = rowStartIndex;
              if (onRowsRendered)
                onRowsRendered({ startIndex: rowStartIndex, stopIndex: rowStopIndex });
            }}
            ref={el => {
              this.grid = el;
              if (registerChild) {
                registerChild(el);
              }
            }}
            {...listProps}
          />
        )}
      </InfiniteLoader>
    ) : (
      <Grid
        ref={el => {
          this.grid = el;
        }}
        {...listProps}
      />
    );
  }
}

VirtualList.defaultProps = {
  menuItemCount: 5,
  getLoader: () => (
    <MuiListItem button disabled>
      <PulseLoader size={10} margin="2px" />
    </MuiListItem>
  ),
};

export default VirtualList;
