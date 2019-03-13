import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Field, Autocomplete } from '@ssc/core';

import { withPreload } from '../contexts/PreloadContext';

const LocationFieldInput = ({ areas, physical, ...props }) => {
  const items =
    areas &&
    areas.reduce((list, area) => {
      const locations =
        (area && area.locations && area.locations.filter(l => !physical || l.physical)) || [];
      if (locations.length > 0) {
        list.push({
          name: area.name,
          color: 'primary',
          variant: 'subheader',
        });

        return list.concat(locations);
      }
      return list;
    }, []);
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
    LocationFieldInput,
    graphql`
      fragment LocationFieldInput_areas on Area @relay(plural: true) {
        name
        locations {
          name
          code
          physical
        }
      }
    `,
  ),
  ['areas'],
);
