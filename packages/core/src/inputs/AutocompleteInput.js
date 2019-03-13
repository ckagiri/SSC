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

const Autocomplete = ({
  // Autocomplete
  items: itemsProp,
  itemToString,
  itemToValue,
  valueToString,
  getRootProps,
  onClear,
  loading,
  onRefetch,
  onChange,
  onSelect,
  className,

  // Menu
  select,
  loadMoreRows,
  totalCount,
  rowHeight,
  menuHeight,
  menuItemCount,
  renderItem,
  getItemKey,

  // Paper
  square,
  elevation,

  // Input
  value,
  inputRef,
  onFocus,
  onInputValueChange,
  inputValue,
  ...props
}) => {
  const inputNode = useRef(null);
  const { setFilter, items: filteredItems } = useFilter({
    items: itemsProp,
    itemToString,
    inputValue,
  });

  const items = onRefetch ? itemsProp : filteredItems;

  const handleInputValueChange = (v, state) => {
    if (onRefetch) {
      onRefetch(v, state);
    } else {
      setFilter(v);
    }

    // if (onInputValueChange) onInputValueChange(value);
  };
  return (
    <Downshift
      initialInputValue={valueToString ? valueToString(value) : itemToString(value) || ''}
      inputValue={inputValue}
      itemCount={items && items.length} // Needed for windowing
      itemToString={itemToString}
      onInputValueChange={handleInputValueChange}
      onChange={i => onChange && onChange(itemToValue(i))}
      onSelect={onSelect}
      initialIsOpen={false}
    >
      {downshiftProps => (
        <div {...getRootProps && getRootProps()} className={className}>
          <Input
            {...downshiftProps.getInputProps()}
            onFocus={e => {
              downshiftProps.openMenu();
              if (onFocus) onFocus(e);
            }}
            onClear={() => {
              if (onClear) onClear();
              downshiftProps.clearSelection();
              // handleInputValueChange(null);
              downshiftProps.openMenu();
            }}
            loading={loading}
            onValueChange={onInputValueChange}
            // value={downshiftProps.inputValue || ''}
            inputRef={node => {
              inputNode.current = node && node.parentNode;
              if (inputRef && typeof inputRef === 'function') {
                inputRef(node);
              }
            }}
            isOpen={downshiftProps.isOpen}
            openMenu={downshiftProps.openMenu}
            closeMenu={downshiftProps.closeMenu}
            select={select || (items && !!items.length)}
            {...props}
          />
          {downshiftProps.isOpen && inputNode.current ? (
            <Popper
              open
              anchorEl={inputNode.current}
              placement="bottom-start"
              style={{ zIndex: zIndex.modal }}
              modifiers={{
                preventOverflow: { enabled: false },
                hide: { enabled: false },
              }}
            >
              {({ placement }) => (
                <Paper
                  style={{
                    minWidth: inputNode.current && inputNode.current.clientWidth,
                    borderTopRightRadius: placement === 'bottom-start' ? 0 : null,
                    borderTopLeftRadius: placement === 'bottom-start' ? 0 : null,
                    bottom: placement === 'top-start' ? 8 : null,
                  }}
                  {...downshiftProps.getMenuProps({}, { suppressRefError: true })}
                  square={square}
                  elevation={elevation}
                >
                  <VirtualList
                    onClick={() => console.log('here')}
                    width={inputNode.current && inputNode.current.clientWidth}
                    menuItemCount={menuItemCount}
                    rowHeight={rowHeight}
                    rowCount={(items && items.length) || 0}
                    totalCount={totalCount}
                    loadMoreRows={loadMoreRows}
                    loading={loading}
                    menuHeight={menuHeight}
                    getItem={({ index, ...rest }) =>
                      items &&
                      items[index] &&
                      renderItem({ item: items[index], index, ...rest, ...downshiftProps })
                    }
                    getItemKey={getItemKey}
                    {...props}
                  />
                </Paper>
              )}
            </Popper>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};

const renderItem = ({ item, index, itemToString, getItemProps }) => (
  <BaseItem item={{ ...item, primary: itemToString(item) }} {...getItemProps({ item, index })} />
);

Autocomplete.defaultProps = {
  itemToString: item =>
    item
      ? typeof item === 'string'
        ? item
        : item.name || item.title || item.description || item.value
      : '',
  itemToValue: item => (item ? item.value || item : null),
  renderItem,
  onChange: () => {},
  items: [],
  menuItemCount: 5,
  inputRef: undefined,
  focusOnClear: true,
  select: true,
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
  valueToString: PropTypes.func,
};

export const stateChangeTypes = Downshift.stateChangeTypes;
export const resetIdCounter = Downshift.resetIdCounter;
export default Autocomplete;
