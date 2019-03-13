import React from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';

import { Typography } from '../base';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 200,
  },
  icon: {},
  badge: {
    marginTop: 2,
    fontWeight: 500,
  },
  listIcon: {
    // marginRight: 8,
  },
  secondaryIcon: {
    marginRight: -8,
  },
  mini: {
    minWidth: 56,
  },
}));

const SidebarItem = ({
  Icon,
  SecondaryIcon,
  title,
  badge,
  disabled,
  className,
  variant,
  ...props
}) => {
  const classes = useStyles(props);
  const icon = Icon && (
    <ListItemIcon className={classes.listIcon}>
      <Icon className={disabled ? null : classes.icon} />
    </ListItemIcon>
  );

  return (
    <ListItem
      disabled={disabled}
      className={classnames(classes.root, className, { [classes.mini]: variant === 'mini' })}
    >
      {variant === 'mini' ? (
        <Tooltip title={title}>
          {badge ? (
            <Badge badgeContent={badge} className={classes.badge}>
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </Tooltip>
      ) : (
        <React.Fragment>
          {!!icon && icon}
          <ListItemText primary={title} classes={{ primary: classes.title }} />
          {!!badge && (
            <Typography className={classes.badge} variant="subtitle1">
              {badge}
            </Typography>
          )}
          {SecondaryIcon && (
            <ListItemIcon className={classes.secondaryIcon}>{<SecondaryIcon />}</ListItemIcon>
          )}
        </React.Fragment>
      )}
    </ListItem>
  );
};

export default SidebarItem;
