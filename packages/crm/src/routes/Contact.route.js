import React from 'react';
import { Route, HttpError } from 'found';
import graphql from 'babel-plugin-relay/macro';
import { get } from 'lodash';
import { Loading } from '@ssc/core';

const query = graphql`
  query ContactRouteQuery($phone: String) {
    viewer {
      contactBy(phone: $phone) {
        ...ContactPage_contact
      }
    }
  }
`;

class ContactRoute extends Route {
  query = query;

  render({ Component, props, variables, resolving, ...rest }) {
    if (!props) return <Loading />;
    const { router, match } = props || {};
    const contact = get(props, 'viewer.contactBy');
    if (!contact) {
      throw new HttpError(404);
    }
    return (
      <Component
        loading={!props}
        contact={get(props, 'viewer.contactBy', null)}
        value={variables}
        router={router}
        match={match}
        {...rest}
      />
    );
  }
}

export default ContactRoute;
