import { useRef, useState } from 'react';
import { get } from 'lodash';

const usePagination = ({
  relay: { hasMore, isLoading, loadMore, refetchConnection: refetch },
  getFilter,
  retry,
  error: queryError,
  menuItemCount = 5,
  items = {},
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(queryError);
  const fetcher = useRef(null);
  const loadedCount = get(items, 'edges', []).length;
  const totalCount = get(items, 'totalCount') || 0;

  const startLoading = fetch => {
    setLoading(true);
    if (fetcher.current) fetcher.current.dispose();
    fetcher.current = fetch;
  };

  const finishLoading = err => {
    setLoading(isLoading());
    setError(err);
    if (fetcher.current) fetcher.current.dispose();
  };

  const onRefetch = value => startLoading(refetch(menuItemCount, finishLoading, getFilter(value)));

  const loadMoreRows = ({ stopIndex }) =>
    hasMore() && stopIndex >= loadedCount && startLoading(loadMore(menuItemCount, finishLoading));

  return {
    ...props,
    menuItemCount,
    loadMoreRows: index => loadMoreRows(index),
    totalCount,
    items: items && items.edges,
    itemToValue: item => item.node,
    error: errors && errors[0],
    getItemKey: index => get(items, `edges.${index}.cursor`, `${index}_loader`),
    onRefetch,
    loading,
  };
};

export default usePagination;
