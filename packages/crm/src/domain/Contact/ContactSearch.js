import React from 'react';
import { QueryRenderer, createPaginationContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { usePagination } from '@ssc/core';
import { get } from 'lodash';

import environment from '../../environment';
import ContactListItem from './ContactListItem';

const ContactSearch = ({ Autocomplete, ...props }) => {
  const items = get(props, 'viewer.contacts');
  const valueToString = item => get(item, 'fullName', '');
  const itemToString = item => get(item, 'node.fullName', '');
  const getFilter = value => ({ text: value });
  const renderItem = ({ item, index, getItemProps }) => (
    <ContactListItem contact={(item && item.node) || ''} {...getItemProps({ item, index })} />
  );
  return (
    <Autocomplete
      {...usePagination({
        rowHeight: 66,
        renderItem,
        items,
        itemToString,
        valueToString,
        getFilter,
        ...props,
      })}
    />
  );
};

const ContactSearchContainer = createPaginationContainer(
  ContactSearch,
  {
    viewer: graphql`
      fragment ContactSearch_viewer on Staff
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
          filter: { type: "ContactFilter" }
          text: { type: "String" }
        ) {
        contacts(first: $count, after: $after, filter: $filter, text: $text)
          @connection(key: "ContactSearch_contacts", filters: ["text"]) {
          totalCount
          edges {
            node {
              category
              fullName
              phone
              addresses {
                city
                town
              }
              ... on Staff {
                shortName
                position {
                  title
                }
              }
              ... on Customer {
                consultant {
                  shortName
                  position {
                    title
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.contacts;
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        after: cursor,
      };
    },
    query: graphql`
      query ContactSearchPaginationQuery(
        $count: Int!
        $after: String
        $filter: ContactFilter
        $text: String
      ) {
        viewer: viewer {
          ...ContactSearch_viewer
            @arguments(count: $count, after: $after, filter: $filter, text: $text)
        }
      }
    `,
  },
);

export default compProps => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query ContactSearchQuery {
        viewer {
          ... on Staff {
            ...ContactSearch_viewer
          }
        }
      }
    `}
    render={({ props, ...renderProps }) => (
      <ContactSearchContainer viewer={null} {...props} {...renderProps} {...compProps} />
    )}
  />
);
