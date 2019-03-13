import React from 'react';
import { Input, DateTimeInput, Field } from '@ssc/core';
import { makeStyles } from '@material-ui/styles';

import LocationFieldInput from '../../inputs/LocationFieldInput';
import ConsultantFieldInput from '../Consultant/ConsultantFieldInput';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
}));
const AppointmentTeleInput = ({ name, ...props }) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Field Component={Input} label="Hẹn" name="action" multiline parent={name} />
      <Field Component={DateTimeInput} name="date" parent={name} />
      <LocationFieldInput label="Tại" parent={name} />
      <ConsultantFieldInput parent={name} />
    </div>
  );
};

export default AppointmentTeleInput;
