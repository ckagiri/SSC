import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Autocomplete, useField } from '@ssc/core';

import { withPreload } from '../contexts/PreloadContext';

const CityFieldInput = ({ cities, ...props }) => (
  <Autocomplete
    items={cities}
    itemToString={city => city && city.name}
    label="Tỉnh/Thành phố"
    rowHeight={48}
    {...useField(props)}
  />
);

export default withPreload(
  createFragmentContainer(
    CityFieldInput,
    graphql`
      fragment CityFieldInput_cities on City @relay(plural: true) {
        id
        name
        prefix
      }
    `,
  ),
  ['cities'],
);
