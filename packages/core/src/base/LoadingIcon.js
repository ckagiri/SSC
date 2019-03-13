import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';

// import classNames from 'classnames';

const LoadingIcon = ({ classes, className, color, size }) => (
  <div className={classNames(classes.root, className)}>
    <CircularProgress color={!color ? 'inherit' : color} size={size} />
  </div>
);

LoadingIcon.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.number,
};

LoadingIcon.defaultProps = {
  size: 24,
};
const styles = theme => ({
  root: {
    position: 'relative',
    color: theme.palette.action.disabled,
    marginBottom: -4,
  },
});
export default withStyles(styles)(LoadingIcon);
