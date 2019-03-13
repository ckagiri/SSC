import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { get } from 'lodash';
import {
  Sidebar,
  SearchBar,
  // Debug,
} from '@ssc/core';

// import ContactSearch from "./ContactSearch";
import CustomerForm from '../Customer/CustomerForm';
import CustomerView from '../Customer/CustomerView';
// import MoreIcon from 'mdi-material-ui/DotsVertical';

const ContactSidebar = ({ contact, value, loading, ...props }) => (
  <Sidebar
    content={
      contact ? <CustomerView customer={contact} /> : <CustomerForm value={value} {...props} />
    }
  />
);

export default createFragmentContainer(
  ContactSidebar,
  graphql`
    fragment ContactSidebar_contact on Contact {
      ...CustomerView_customer
    }
  `,
);
