import React from 'react';
import { createRefetchContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { useRefetch, Autocomplete, useField } from '@ssc/core';
import { get } from 'lodash';

import { withPreload } from '../../contexts/PreloadContext';
import ContactListItem from './ContactListItem';

const ContactFieldInput = ({ viewer, ...props }) => {
  const items = get(viewer, 'contactBy') ? [get(viewer, 'contactBy')] : [];
  const getFilter = phone => ({ phone });

  return (
    <Autocomplete
      items={items}
      rowHeight={66}
      itemToString={item => get(item, 'fullName', '')}
      renderItem={({ item, index, getItemProps }) => (
        <ContactListItem contact={item || {}} button {...getItemProps({ item, index })} />
      )}
      valueToString={item => get(item, 'fullName', '')}
      itemToValue={i => i && i.id}
      {...useField(useRefetch({ getFilter, ...props }))}
    />
  );
};

export default withPreload(
  createRefetchContainer(
    ContactFieldInput,
    graphql`
      fragment ContactFieldInput_viewer on Contact @argumentDefinitions(phone: { type: "String" }) {
        contactBy(phone: $phone) {
          id
          category
          fullName
          phone
          discount
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
              id
              fullName
              shortName
              position {
                title
              }
            }
          }
        }
      }
    `,
    graphql`
      query ContactFieldInputRefetchQuery($phone: String) {
        viewer {
          ...ContactFieldInput_viewer @arguments(phone: $phone)
        }
      }
    `,
  ),
  ['viewer'],
);
