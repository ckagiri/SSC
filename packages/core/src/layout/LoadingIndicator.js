import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';

const styles = {
  loader: {
    margin: 14,
  },
};

const LoadingIndicator = ({ classes, className, isLoading, ...rest }) =>
  isLoading ? (
    <CircularProgress
      className={classNames('app-loader', classes.loader, className)}
      color="inherit"
      size={18}
      thickness={5}
      {...rest}
    />
  ) : null;

LoadingIndicator.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  width: PropTypes.string,
};

export default withStyles(styles)(LoadingIndicator);
