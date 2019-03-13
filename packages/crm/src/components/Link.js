import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'found';
import { ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    justifyContent: 'left',
    transition: 'all 0.3s ease-in',
  },
  active: {
    backgroundColor: theme.palette.primary.light,
  },
}));
const Link = ({
  children,
  disabled,
  className,
  to,
  router,
  match,
  onClick: handleClick,
  ...props
}) => {
  const classes = useStyles(props);
  const active = router.isActive(match, { pathname: to }, { exact: true });
  return (
    <ButtonBase
      disabled={disabled || active}
      className={classNames(classes.root, className, {
        [classes.active]: active,
      })}
      onClick={e => {
        router.push(to);
        if (handleClick) handleClick(e);
      }}
    >
      {React.cloneElement(children, { disabled, ...props })}
    </ButtonBase>
  );
};

export default withRouter(Link);
