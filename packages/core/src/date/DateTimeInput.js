import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DateTime } from 'luxon';
import classNames from 'classnames';

import DateInput from './DateInput';
import TimeInput from './TimeInput';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    // gridColumnGap: theme.spacing(1),
  },
}));

const DateTimeInput = ({ onChange, value, className, ...props }) => {
  const date = value && value.toISODate();
  const time = value && value.toFormat('T') === '00:00' ? null : value;
  const classes = useStyles(props);
  const formatValue = (date, time) => {
    if (date && time) {
      return DateTime.fromISO(`${date}T${time.toFormat('T')}`);
    }
    if (time) return time;
    if (date) return DateTime.fromISO(date);

    return undefined;
  };
  const handleTimeChange = time => {
    if (onChange) onChange(formatValue(date, time));
  };
  const handleDateChange = date => {
    if (onChange) onChange(formatValue(date, time));
  };
  return (
    <div className={classNames(classes.root, className)}>
      <TimeInput onChange={handleTimeChange} value={time} />
      <DateInput onChange={handleDateChange} value={date} />
    </div>
  );
};

export default DateTimeInput;
