import React from 'react';
import { createFragmentContainer } from 'react-relay';
import { CardContent, IconButton, Tabs, Tab } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import { makeStyles } from '@material-ui/styles';
import { get } from 'lodash';
import PhoneIcon from 'mdi-material-ui/Phone';

import CustomerView from './CustomerView';

const stateLabels = {
  preconsultation: 'Sơ bộ',
  consultation: 'Tư vấn',
  care: 'Chăm sóc',
};
const useStyles = makeStyles(theme => ({
  tabsbar: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    width: '100%',
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    zIndex: 100,
  },
  tabs: {
    flex: 1,
  },
  heading: {
    backgroundColor: theme.palette.background.default,
  },
  closeIcon: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(0.5),
    padding: theme.spacing(0.5),
  },
}));
const CustomerPage = ({ customer, children, router, ...props }) => {
  const classes = useStyles(props);
  const pathname = get(props, 'match.location.pathname');
  const paths = pathname.slice(1).split('/');
  const handleChange = (e, v) => {
    e.preventDefault();
    router.push(`/${paths[0]}/${v}`);
  };
  return (
    <React.Fragment>
      <CardContent className={classes.heading}>
        <CustomerView customer={customer} />
      </CardContent>
      <div className={classes.tabsbar}>
        <Tabs
          value={paths[1] || ''}
          indicatorColor="primary"
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab value="" label={stateLabels[get(customer, 'state', 'preconsultation')]} />
          <Tab value="appointment" label="Đặt hẹn" />
        </Tabs>
        {customer && (
          <IconButton component="a" href={`tel: ${customer.phone}`}>
            <PhoneIcon color="primary" />
          </IconButton>
        )}
      </div>
      {children && React.cloneElement(children, { customer, router, ...props })}
    </React.Fragment>
  );
};

export default createFragmentContainer(
  CustomerPage,
  graphql`
    fragment CustomerPage_customer on Customer {
      phone
      state
      ...CustomerView_customer
      ...Consultation_customer
    }
  `,
);
