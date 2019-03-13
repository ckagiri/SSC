import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import Preconsultation from './Preconsultation';

const Consultation = ({ customer, ...props }) => {
  const { state } = customer || {};
  switch (state) {
    case 'consultation':
      return 'consultation';
    case 'care':
      return 'care';
    case 'preconsultation':
    default:
      return <Preconsultation customer={customer} {...props} />;
  }
};

export default createFragmentContainer(
  Consultation,
  graphql`
    fragment Consultation_customer on Customer {
      state
      ...Preconsultation_customer
    }
  `,
);
