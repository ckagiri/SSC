import React from 'react';
import { Autocomplete, useField, useRefetch, useFilter } from '@ssc/core';
import { createRefetchContainer, createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { withPreload } from '../../contexts/PreloadContext';

const ConsultantFieldInput = ({ viewer, consultants, ...props }) => {
  const itemToString = c => c && (c.shortName || c.fullName);
  const { contactBy } = viewer || {};
  const { items, setFilter } = useFilter({ items: consultants, itemToString, ...props });
  const { error, loading, onRefetch } = useRefetch({ getFilter: phone => ({ phone }), ...props });

  const handleRefetch = (value, state) => {
    onRefetch(value, state);
    setFilter(value);
  };
  return (
    <Autocomplete
      items={contactBy && contactBy.category !== 'Customer' ? [contactBy, ...items] : items}
      itemToString={itemToString}
      itemToValue={i => i && i.id}
      label="Chuyên viên"
      onRefetch={handleRefetch}
      {...useField({ error, ...props, loading })}
    />
  );
};

const ConsultantFieldInputContainer = createRefetchContainer(
  ConsultantFieldInput,
  graphql`
    fragment ConsultantFieldInput_viewer on Contact
      @argumentDefinitions(phone: { type: "String" }) {
      contactBy(phone: $phone) {
        category
        fullName
        id
      }
    }
  `,
  graphql`
    query ConsultantFieldInputRefetchQuery($phone: String) {
      viewer {
        ...ConsultantFieldInput_viewer @arguments(phone: $phone)
      }
    }
  `,
);
export default withPreload(
  createFragmentContainer(
    ConsultantFieldInputContainer,
    graphql`
      fragment ConsultantFieldInput_consultants on Contact @relay(plural: true) {
        shortName
        fullName
        id
      }
    `,
  ),
  ['viewer.consultants', 'viewer'],
);
