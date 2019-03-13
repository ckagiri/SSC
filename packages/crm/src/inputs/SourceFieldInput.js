import React, { useState } from 'react';
import classNames from 'classnames';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Autocomplete, Input, Field, useField } from '@ssc/core';
import { makeStyles } from '@material-ui/styles';
import { sourceValidation } from '@ssc/common';

import { withPreload } from '../contexts/PreloadContext';
import LocationFieldInput from './LocationFieldInput';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    gridColumnGap: theme.spacing(1),
  },
  full: {
    gridColumn: 'span 2',
  },
}));
const SourceFieldInput = ({ touchpoints, className, name, required, onSelect, ...props }) => {
  const {
    form: { setFieldValue },
  } = useField({ name, validateSchema: sourceValidation, ...props });
  const classes = useStyles(props);

  const [point, setPoint] = useState();
  const { fields, list } = point || {};
  const handleSelect = item => {
    if (item !== point) {
      setFieldValue('page', undefined);
      setFieldValue('link', undefined);
      setFieldValue('location', undefined);
    }
    setPoint(item);
    if (onSelect) onSelect(item);
  };
  return (
    <div className={classNames(classes.root, className)}>
      <Field
        className={
          !fields || (fields.indexOf('link') > -1 && fields.indexOf('page') === -1)
            ? classes.full
            : null
        }
        Component={Autocomplete}
        items={touchpoints}
        itemToValue={i => i && i.title}
        onSelect={handleSelect}
        label="Từ"
        name="from"
        parent={name}
        required={required}
        {...props}
      />
      {(fields || []).indexOf('page') > -1 && (
        <Field
          Component={Autocomplete}
          name="page"
          parent={name}
          label="Trang"
          items={list}
          required={required}
        />
      )}
      {(fields || []).indexOf('link') > -1 && (
        <Field Component={Input} name="link" parent={name} label="Link" className={classes.full} />
      )}
      {(fields || []).indexOf('location') > -1 && (
        <Field
          Component={LocationFieldInput}
          name="location"
          parent={name}
          label="Location"
          required={required}
          physical
        />
      )}
    </div>
  );
};

export default withPreload(
  createFragmentContainer(
    SourceFieldInput,
    graphql`
      fragment SourceFieldInput_touchpoints on Touchpoint @relay(plural: true) {
        title
        fields
        list
        state
      }
    `,
  ),
  ['touchpoints'],
);
