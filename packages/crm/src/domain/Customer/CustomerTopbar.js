import React from 'react';
import classNames from 'classnames';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Header } from '@ssc/core';
import { IconButton } from '@material-ui/core';
import SearchIcon from 'mdi-material-ui/Magnify';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  tabsbar: {
    display: 'flex',
    width: '100%',
    paddingRight: theme.spacing(1),
  },
  tabs: {
    flex: 1,
  },
  search: {
    transition: 'width 0.5s ease-in-out',
  },
  searchBar: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  searchIcon: {
    width: 64,
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing(1),
  },
  header: {
    flex: 1,
    width: 'auto',
    transition: 'appear 5s ease-in-out',
  },
  heading: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(0.5),
    padding: theme.spacing(0.5),
  },
}));

//
const CustomerTopbar = ({ customer = {}, className, router, ...props }) => {
  const classes = useStyles(props);
  const handleSearch = e => {
    e.preventDefault();
    router.push('/search');
  };
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.heading}>
        <Header
          title={customer && customer.fullName}
          subheader={customer && customer.phone}
          action={
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          }
        />
      </div>
    </div>
  );
};

export default createFragmentContainer(
  CustomerTopbar,
  graphql`
    fragment CustomerTopbar_customer on Contact {
      fullName
      phone
      ...CustomerView_customer
    }
  `,
);
