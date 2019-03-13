import lightGreen from '@material-ui/core/colors/lightGreen';
import pink from '@material-ui/core/colors/pink';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

export default {
  palette: {
    colors: {
      info: '#9E9E9E',
      notice: '#607D8B',
      low: '#2196F3',
      normal: '#8BC34A',
      medium: '#FFC107',
      high: '#FF9800',
      extreme: '#F44336',
    },
    primary: {
      // ...lightGreen,
      light: '#d2ea8e',
      main: '#76bc21',
      dark: '#638c1c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: pink[500],
      contrastText: '#ffffff',
    },
    background: {
      default: grey[200],
      content: '#fafafa',
    },
  },
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 960,
      xl: 1280,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media(min-width: 400px)': {
        minHeight: 64,
      },
      '@media(min-width: 0px) and (orientation: landscape)': {
        minHeight: 48,
      },
    },
  },
  sidebar: {
    width: 240,
    background: lightGreen[100],
  },
  miniSidebar: {
    width: 56,
    background: blueGrey[800],
  },
  typography: {
    useNextVariants: true,
    title: {
      fontWeight: 400,
    },
  },
  props: {
    MuiMenuItem: {
      selected: {
        backgroundColor: lightGreen['300'],
      },
    },
    MuiFormControl: {
      margin: 'dense',
      fullWidth: true,
    },
  },
  zIndex: {
    sidebar: 1000,
  },
};
