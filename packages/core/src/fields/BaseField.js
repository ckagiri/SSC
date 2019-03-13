import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/styles';

import Typography from '../base/Typography';

const useStyles = makeStyles({
  text: {
    marginTop: 16,
  },
});
const Field = ({ value, label, variant }) => {
  const classes = useStyles();
  return (
    <FormControl margin="dense">
      <InputLabel shrink>{label}</InputLabel>
      <Typography variant={variant} className={classes.text}>
        {value}
      </Typography>
    </FormControl>
  );
};

export default Field;
