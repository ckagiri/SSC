function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { makeStyles } from '@material-ui/styles';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      padding: theme.spacing(2),
      overflow: 'scroll'
    }
  };
});

var Content = function Content(props) {
  return React.createElement("div", _extends({
    className: useStyles(props).root
  }, props));
};

Content.defaultProps = {
  elevation: 0
};
export default Content;