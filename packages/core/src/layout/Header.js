import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';

import Typography from '../base/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 64,
    alignItems: 'flex-start',
    justifyContent: 'center',

    marginRight: theme.spacing(2),
  },
  title: {
    flex: 1,
    display: 'flex',
    minHeight: 64,
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
  },
  subheader: {
    marginTop: -5,
  },
  action: {
    alignItems: 'center',
    display: 'flex',

    marginRight: -theme.spacing(1),
    height: '100%',
    justifyContent: 'center',
  },
  icon: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  content: {
    display: 'flex',
    marginBottom: 0,
    alignItems: 'flex-start',
  },
}));

const Header = ({ icon, action, title, subheader, className, titleColor, ...props }) => {
  const classes = useStyles(props);
  return (
    <header className={classNames(classes.root, className)} {...props}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <div className={classes.title}>
        {title &&
          (typeof title === 'string' ? (
            <Typography variant="h6" color={titleColor}>
              {title}
            </Typography>
          ) : (
            title
          ))}
        {subheader && typeof subheader === 'string' ? (
          <Typography color="textSecondary" className={classes.subheader}>
            {subheader}
          </Typography>
        ) : (
          subheader
        )}
      </div>
      {!!action && <div className={classes.action}>{action}</div>}
    </header>
  );
};

export default Header;
