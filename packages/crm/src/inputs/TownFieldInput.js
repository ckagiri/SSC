import React from 'react';
import { Autocomplete, useField } from '@ssc/core';
import { createFragmentContainer, QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { get } from 'dot-prop';

import environment from '../environment';

const TownFieldInput = ({ towns, error, ...props }) => (
  <Autocomplete items={towns} label="Quận/Huyện" error={error} {...useField(props)} />
);

const TownFieldInputContainer = createFragmentContainer(
  TownFieldInput,
  graphql`
    fragment TownFieldInput_towns on Town @relay(plural: true) {
      name
    }
  `,
);

export default ({ cityName, ...comProps }) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query TownFieldInputRefetchQuery($filter: CityFilter) {
        cities(filter: $filter) {
          towns {
            ...TownFieldInput_towns
          }
        }
      }
    `}
    variables={{
      filter: { name: cityName || '#' },
    }}
    render={({ error, props }) => (
      <TownFieldInputContainer
        error={error && error[0]}
        loading={!props}
        towns={get(props, 'cities.0.towns', [])}
        {...props}
        {...comProps}
      />
    )}
  />
);
