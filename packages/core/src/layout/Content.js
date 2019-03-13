import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    overflow: 'scroll',
  },
}));

const Content = props => <div className={useStyles(props).root} {...props} />;

Content.defaultProps = {
  elevation: 0,
};

export default Content;
