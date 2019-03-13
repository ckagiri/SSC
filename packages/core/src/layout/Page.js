import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  wrapper: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.content,
  },
  content: {
    minHeight: 'fit-content',
  },
  supplement: {},
}));

const Page = ({ children, header, props }) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {!!header && header}
      <main className={classes.wrapper}>
        <div className={classes.content}>{children}</div>
      </main>
    </div>
  );
};

export default Page;
