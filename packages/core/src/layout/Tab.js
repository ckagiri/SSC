import React, { useState } from 'react';
import { Tabs, Tab as MuiTab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    alignItems: 'flex-start',
  },
  labelContainer: {
    textAlign: 'left',
    padding: 0,
  },
  label: {
    textTransform: 'capitalize',
  },
}));
const Tab = props => {
  const classes = useStyles(props);
  return <MuiTab classes={classes} {...props} />;
};

export default Tab;
