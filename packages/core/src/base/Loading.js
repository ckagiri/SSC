import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/styles';

// import MenuDownIcon from 'mdi-material-ui/MenuDown';
// import MenuUpIcon from 'mdi-material-ui/MenuUp';

// Input status: loading, error, resetable, isOpen, select

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: 2,
    marginTop: -2,
    width: '100%',
  },
  top: {
    position: 'absolute',
    top: 0,
    marginTop: 0,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    marginTop: 0,
  },
  color: {
    backgroundColor: theme.palette.grey['200'],
  },
  barColor: {
    backgroundColor: theme.palette.action.disabled,
  },
}));
const LoadingBar = ({ position, color, ...props }) => {
  const classes = useStyles(props);
  return (
    <LinearProgress
      color={color || 'primary'}
      classes={{
        root: classNames(classes.root, position && classes[position], !color && classes.color),
        barColorPrimary: !color && classes.barColor,
      }}
    />
  );
};

LoadingBar.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.oneOf(['primary', 'secondary']),
  position: PropTypes.oneOf(['top', 'bottom']),
};
export default LoadingBar;
