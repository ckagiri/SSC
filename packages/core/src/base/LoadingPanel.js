import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
const LoadingPanel = props => (
  <div
    style={{
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center',
      height: '40%',
      width: '100%',
    }}
  >
    <ScaleLoader color="gray" {...props} />
  </div>
);

export default LoadingPanel;
