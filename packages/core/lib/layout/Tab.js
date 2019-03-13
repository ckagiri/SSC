function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Tabs, Tab as MuiTab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
var useStyles = makeStyles(function (theme) {
  return {
    wrapper: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      alignItems: 'flex-start'
    },
    labelContainer: {
      textAlign: 'left',
      padding: 0
    },
    label: {
      textTransform: 'capitalize'
    }
  };
});

var Tab = function Tab(props) {
  var classes = useStyles(props);
  return React.createElement(MuiTab, _extends({
    classes: classes
  }, props));
};

export default Tab;