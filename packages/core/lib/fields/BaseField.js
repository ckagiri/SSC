import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/styles';
import Typography from '../base/Typography';
var useStyles = makeStyles({
  text: {
    marginTop: 16
  }
});

var Field = function Field(_ref) {
  var value = _ref.value,
      label = _ref.label,
      variant = _ref.variant;
  var classes = useStyles();
  return React.createElement(FormControl, {
    margin: "dense"
  }, React.createElement(InputLabel, {
    shrink: true
  }, label), React.createElement(Typography, {
    variant: variant,
    className: classes.text
  }, value));
};

export default Field;