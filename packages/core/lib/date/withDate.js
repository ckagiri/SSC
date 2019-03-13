import React from 'react';
import { Settings } from 'luxon';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
Settings.defaultLocale = 'vi';

var withDate = function withDate(Component) {
  return function (props) {
    return React.createElement(MuiPickersUtilsProvider, {
      utils: LuxonUtils,
      locale: "vi"
    }, React.createElement(Component, props));
  };
};

export default withDate;