import React from 'react';
import { Route } from 'found';
import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  query ConsultantRouteQuery {
    viewer {
      ...ConsultantLayout_consultant
    }
  }
`;

class ConsultantRoute extends Route {
  query = query;

  render({ Component, props, variables, resolving, ...rest }) {
    const { viewer, ...compProps } = props || {};
    return <Component loading={!props} consultant={viewer || null} {...compProps} {...rest} />;
  }
}

export default ConsultantRoute;
