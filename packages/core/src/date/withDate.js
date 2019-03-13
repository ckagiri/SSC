import React from 'react';
import { Settings } from 'luxon';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

Settings.defaultLocale = 'vi';

const withDate = Component => props => (
  <MuiPickersUtilsProvider utils={LuxonUtils} locale="vi">
    <Component {...props} />
  </MuiPickersUtilsProvider>
);

export default withDate;
