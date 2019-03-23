import { useRef, useState } from 'react';

const useRefecth = ({ relay, getFilter, retry, error: queryError, ...props }) => {
  // console.log(props);
  const { refetch } = relay;
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(queryError);
  const fetcher = useRef(null);

  const startLoading = fetch => {
    setLoading(true);
    if (fetcher.current) fetcher.current.dispose();
    fetcher.current = fetch;
  };

  const finishLoading = err => {
    setLoading(false);
    setError(err);
    fetcher.current = null;
  };

  const onRefetch = value => startLoading(refetch(getFilter(value), null, finishLoading));

  return {
    ...props,
    error: errors && errors[0],
    onRefetch,
    loading,
  };
};

export default useRefecth;
