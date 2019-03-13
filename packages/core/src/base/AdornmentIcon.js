import React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  icon: {
    padding: 4,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  standard: {
    marginBottom: 4,
  },
  outlined: {
    // marginBottom: 0,
  },
  filled: {
    marginTop: 18,
  },
  end: {
    marginRight: -theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  start: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const AdornmentIcon = ({ className, size, variant, icon: Icon, position, ...props }) => {
  const classes = useStyles();
  return (
    <InputAdornment
      position={position}
      className={(classNames(classes[variant]), classes[position])}
    >
      <IconButton className={classes.icon} {...props}>
        <Icon color="action" fontSize={size} />
      </IconButton>
    </InputAdornment>
  );
};

AdornmentIcon.defaultProps = {
  size: 'small',
  variant: 'standard',
};

export default AdornmentIcon;
