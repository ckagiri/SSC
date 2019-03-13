import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import defaultTheme from './defaultTheme';

// Create a JSS instance with the default preset of plugins.
// It's optional.

// The standard class name generator.
// It's optional.

// Apply some reset
// const styles = theme => ({
//   '@global': {
//     html: {
//       WebkitFontSmoothing: 'antialiased', // Antialiasing.
//       MozOsxFontSmoothing: 'grayscale', // Antialiasing.
//       // Change from `box-sizing: content-box` so that `width`
//       // is not affected by `padding` or `border`.
//       boxSizing: 'border-box',
//     },
//     '*, *::before, *::after': {
//       boxSizing: 'inherit',
//     },
//     body: {
//       margin: 0, // Remove the margin in all browsers.
//       backgroundColor: theme.palette.background.default,
//       '@media print': {
//         // Save printer ink.
//         backgroundColor: theme.palette.common.white,
//       },
//     },
//   },
// });

// const BaseCss = withStyles(styles)(CssBaseline);

const withRoot = theme => Component => props => (
  <ThemeProvider theme={createMuiTheme(theme || defaultTheme)}>
    <React.Fragment>
      <CssBaseline />
      <Component {...props} />
    </React.Fragment>
  </ThemeProvider>
);

export default withRoot;
