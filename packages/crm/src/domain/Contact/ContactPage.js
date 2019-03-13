import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Page } from '@ssc/core';

import CustomerPage from '../Customer/CustomerPage';
import ContactTopbar from './ContactTopbar';

const Components = {
  Customer: CustomerPage,
};

const ContactPage = ({
  Customer,
  Distributor,
  Staff,
  contact,
  tabs,
  appBar,
  loading,
  ...props
}) => {
  const contents = { Customer, Distributor, Staff };
  const category = (contact && contact.category) || 'Customer';
  const Component = Components[category];
  const data = { [category.toLowerCase()]: contact };
  return (
    <Page header={<ContactTopbar contact={contact} {...props} />}>
      <Component {...data} {...props}>
        {React.cloneElement(contents[category], data)}
      </Component>
    </Page>
  );
};

export default createFragmentContainer(
  ContactPage,
  graphql`
    fragment ContactPage_contact on Contact {
      fullName
      category
      ...ContactTopbar_contact
      ... on Customer {
        ...CustomerPage_customer
      }
    }
  `,
);
