import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s ease-in-out',
  },
  top: {
    width: '100%',
    // padding: theme.spacing(1),
  },
  content: {
    flex: 1,
    overflowY: 'scroll',
    overflowX: 'hidden',
  },

  bottom: {
    width: '100%',
  },
}));
// import PropTypes from 'prop-types';

const Sidebar = ({ top, header, content, bottom, className, ...props }) => {
  const classes = useStyles();
  return (
    <Paper className={classNames(classes.root, className)} square {...props}>
      {!!top && <div className={classes.top}> {React.cloneElement(top, props)}</div>}
      <div className={classes.content}>{!!content && React.cloneElement(content, props)}</div>
      {!!bottom && <div className={classes.bottom}>{React.cloneElement(bottom, props)}</div>}
    </Paper>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
};

export default Sidebar;
