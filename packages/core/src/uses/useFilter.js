import { useState } from 'react';
import { remove } from 'diacritics';
import useControlProp from './useControlProp';
const useFilter = ({ items = [], inputValue, itemToString, ...props }) => {
  const [filter, setFilter] = useControlProp(inputValue);

  const getItems = (items, value) => {
    const filteredValue = remove((value || '').trim()).toLowerCase();
    const inputLength = filteredValue.length;
    const regex = new RegExp(filteredValue.replace(/./g, c => `${c}+.*`), 'gi');
    return inputLength === 0
      ? items
      : items.filter(
          item =>
            !item.disabled && itemToString(item) && remove(itemToString(item)).search(regex) !== -1,
        );
  };

  return {
    ...props,
    setFilter,
    items: getItems(items, filter),
  };
};

export default useFilter;
