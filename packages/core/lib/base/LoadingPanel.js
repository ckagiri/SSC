function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { makeStyles } from '@material-ui/styles';
var useStyles = makeStyles(function (theme) {
  return {
    loader: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };
});

var LoadingPanel = function LoadingPanel(props) {
  return React.createElement("div", {
    style: {
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center',
      height: '40%',
      width: '100%'
    }
  }, React.createElement(ScaleLoader, _extends({
    color: "gray"
  }, props)));
};

export default LoadingPanel;