import React from 'react';
import { makeStyles } from '@material-ui/styles';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    wrapper: {
      flex: 1,
      overflow: 'scroll',
      backgroundColor: theme.palette.background.content
    },
    content: {
      minHeight: 'fit-content'
    },
    supplement: {}
  };
});

var Page = function Page(_ref) {
  var children = _ref.children,
      header = _ref.header,
      props = _ref.props;
  var classes = useStyles(props);
  return React.createElement("div", {
    className: classes.root
  }, !!header && header, React.createElement("main", {
    className: classes.wrapper
  }, React.createElement("div", {
    className: classes.content
  }, children)));
};

export default Page;