import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

const Loading = ({ classes, className, ...props }) => (
  <LinearProgress classes={classes} {...props} />
);

const styles = () => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    height: 2,
  },
  colorPrimary: {},
});

Loading.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};
export default withStyles(styles)(Loading);
