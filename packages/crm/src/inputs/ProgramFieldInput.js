import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Field, Autocomplete } from '@ssc/core';

import { withPreload } from '../contexts/PreloadContext';

const ProgramFieldInput = ({ programs, brand, ...props }) => {
  const items = !brand ? programs : programs.filter(p => p && p.brand === brand);
  return (
    <Field
      Component={Autocomplete}
      items={items}
      itemToValue={i => i && i.code}
      rowHeight={46}
      label="Trung tâm"
      {...props}
    />
  );
};
export default withPreload(
  createFragmentContainer(
    ProgramFieldInput,
    graphql`
      fragment ProgramFieldInput_programs on Program @relay(plural: true) {
        brand
        code
        name
        id
      }
    `,
  ),
  ['programs'],
);
