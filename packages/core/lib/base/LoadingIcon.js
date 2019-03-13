import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles'; // import classNames from 'classnames';

var LoadingIcon = function LoadingIcon(_ref) {
  var classes = _ref.classes,
      className = _ref.className,
      color = _ref.color,
      size = _ref.size;
  return React.createElement("div", {
    className: classNames(classes.root, className)
  }, React.createElement(CircularProgress, {
    color: !color ? 'inherit' : color,
    size: size
  }));
};

LoadingIcon.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.number
};
LoadingIcon.defaultProps = {
  size: 24
};

var styles = function styles(theme) {
  return {
    root: {
      position: 'relative',
      color: theme.palette.action.disabled,
      marginBottom: -4
    }
  };
};

export default withStyles(styles)(LoadingIcon);