import React from 'react';
import { Autocomplete, useField } from '@ssc/core';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { withPreload } from '../contexts/PreloadContext';

const PrefixFieldInput = ({ prefixes, ...props }) => (
  <Autocomplete
    label="Gọi"
    items={prefixes}
    itemToValue={item => item && item.value}
    rowHeight={48}
    {...useField(props)}
  />
);

export default withPreload(
  createFragmentContainer(
    PrefixFieldInput,
    graphql`
      fragment PrefixFieldInput_prefixes on StringValues @relay(plural: true) {
        value
        title
      }
    `,
  ),
  ['prefixes'],
);
