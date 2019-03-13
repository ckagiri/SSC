import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { PercentageField, NumberField } from '@ssc/core';

// import NumberField from '@ssc/core/fields/NumberField';
// import Sidebar from '@ssc/core/layout/Sidebar';

const CustomerHeader = ({ customer, className, classes = {} }) => (
  <React.Fragment>
    <PercentageField label="Chiết khấu" value={customer.discount} variant="h5" />
    <NumberField label="Ví điện tử" value={customer.wallet} variant="h5" />
    <NumberField label="Doanh số" value={customer.revenue} variant="h6" />
    <NumberField label="Nhóm" value={customer.groupRevenue} variant="h6" />
  </React.Fragment>
);

export default createFragmentContainer(
  CustomerHeader,
  graphql`
    fragment CustomerHeader_customer on Contact {
      fullName
      phone
      discount
      wallet
      revenue
      groupRevenue
    }
  `,
);
