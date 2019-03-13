function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DateTime } from 'luxon';
import classNames from 'classnames';
import DateInput from './DateInput';
import TimeInput from './TimeInput';
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      display: 'grid',
      gridTemplateColumns: '2fr 3fr' // gridColumnGap: theme.spacing(1),

    }
  };
});

var DateTimeInput = function DateTimeInput(_ref) {
  var onChange = _ref.onChange,
      value = _ref.value,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["onChange", "value", "className"]);

  var date = value && value.toISODate();
  var time = value && value.toFormat('T') === '00:00' ? null : value;
  var classes = useStyles(props);

  var formatValue = function formatValue(date, time) {
    if (date && time) {
      return DateTime.fromISO("".concat(date, "T").concat(time.toFormat('T')));
    }

    if (time) return time;
    if (date) return DateTime.fromISO(date);
    return undefined;
  };

  var handleTimeChange = function handleTimeChange(time) {
    if (onChange) onChange(formatValue(date, time));
  };

  var handleDateChange = function handleDateChange(date) {
    if (onChange) onChange(formatValue(date, time));
  };

  return React.createElement("div", {
    className: classNames(classes.root, className)
  }, React.createElement(TimeInput, {
    onChange: handleTimeChange,
    value: time
  }), React.createElement(DateInput, {
    onChange: handleDateChange,
    value: date
  }));
};

export default DateTimeInput;