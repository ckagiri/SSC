import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Layout } from '@ssc/core';

import ConsultantSidebar from './ConsultantSidebar';

const ConsultantLayout = ({ consultant, hiddenSidebar: Hidden, children, ...props }) => (
  <Layout
    hiddenAt="mdDown"
    miniSidebar
    sidebar={<ConsultantSidebar consultant={consultant} {...props} />}
  >
    {children && React.cloneElement(children, { consultant })}
  </Layout>
);

export default createFragmentContainer(
  ConsultantLayout,
  graphql`
    fragment ConsultantLayout_consultant on Contact {
      ...ConsultantSidebar_consultant
    }
  `,
);
