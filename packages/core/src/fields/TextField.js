import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/styles';

import Typography from '../base/Typography';

const useStyles = makeStyles({
  text: {
    marginTop: 16,
    textAlign: 'left',
  },
});
const Text = ({ value, label, children, ...props }) => {
  const classes = useStyles();
  return (
    <FormControl>
      <InputLabel shrink>{label}</InputLabel>
      <Typography className={classes.text} {...props}>
        {value || children}
      </Typography>
    </FormControl>
  );
};

export default Text;
