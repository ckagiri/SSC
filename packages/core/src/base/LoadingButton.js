import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PulseLoader } from 'react-spinners';

import LoadingIcon from './LoadingIcon';

const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    marginTop: -12,

    // marginLeft: -12,
  },
});
const LoadingButton = ({ loading, disabled, children, color, ...props }) => {
  const classes = useStyles(props);
  return (
    <Button color={color} disabled={disabled || loading} {...props}>
      {!disabled && loading && <LoadingIcon className={classes.loader} color={color} />}
      {children}
    </Button>
  );
};

export default LoadingButton;
