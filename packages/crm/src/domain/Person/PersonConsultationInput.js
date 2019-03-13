import React from 'react';
import { Input, NumberInput, WeightFieldInput, HeightFieldInput, Field, useField } from '@ssc/core';
import { Card, CardContent, CardActions, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PrefixFieldInput from '../../inputs/PrefixFieldInput';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: theme.spacing(2),
  },
  info: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridColumnGap: theme.spacing(1),
  },
  detail: {
    display: 'grid',
    // gridTemplateColumns: '1fr 1fr ',
    // gridColumnGap: theme.spacing(1),
    gridAutoFlow: 'row',
  },
  nameField: {
    gridColumn: 'span 2',
  },
}));

const PersonConsultationInput = ({ name, ...props }) => {
  const { form } = useField({ name, ...props });
  const { getFieldValue } = form;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <PrefixFieldInput name="prefix" parent={name} />
        <Field
          Component={Input}
          label="Tên"
          name="name"
          className={classes.nameField}
          parent={name}
        />
        <Field Component={Input} label="Giới tính" name="gender" parent={name} />
        <Field Component={NumberInput} label="Tuổi" name="age" parent={name} />
        <HeightFieldInput name="height" parent={name} />
      </div>
      <div className={classes.detail}>
        <div>
          <Field
            Component={Input}
            label="Tình trạng sức khoẻ"
            name="condition"
            multiline
            parent={name}
          />
          <Field
            Component={Input}
            label="Yêu cầu/Mong muốn"
            name="request"
            multiline
            parent={name}
          />
        </div>
        <div>
          <Field Component={Input} label="Tư vấn ban đầu" name="advice" multiline parent={name} />
        </div>
      </div>
    </div>
  );
};

export default PersonConsultationInput;
