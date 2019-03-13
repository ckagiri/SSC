import React from 'react';
import {
  Input,
  NumberInput,
  WeightFieldInput,
  HeightFieldInput,
  LossFieldInput,
  GenderInput,
  Field,
  useField,
  // Debug,
} from '@ssc/core';
import { makeStyles } from '@material-ui/styles';

import PrefixFieldInput from '../../inputs/PrefixFieldInput';
import ProgramFieldInput from '../../inputs/ProgramFieldInput';

const useStyles = makeStyles(theme => ({
  root: {},
  info: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridColumnGap: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(6, 1fr) ',
    },
  },
  detail: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr ',
    gridColumnGap: theme.spacing(1),
    gridAutoFlow: 'row',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr ',
    },
  },
  prefixField: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 2',
    },
  },
  nameField: {
    gridColumn: 'span 2',
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 4',
    },
  },
  genderField: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 2',
    },
  },
  ageField: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 2',
    },
  },
  heightField: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 2',
    },
  },
  weightField: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 3',
    },
  },
  lossField: {
    [theme.breakpoints.down('sm')]: {
      gridColumn: 'span 3',
    },
  },
}));

const PersonTeleInput = ({ name, ...props }) => {
  const { form } = useField({ name, ...props });
  const { getFieldValue } = form;
  const classes = useStyles(props);
  return (
    <div>
      <div className={classes.info}>
        <PrefixFieldInput name="prefix" parent={name} className={classes.prefixField} />
        <Field
          Component={Input}
          label="Tên"
          name="name"
          className={classes.nameField}
          parent={name}
        />
        <Field
          Component={GenderInput}
          name="gender"
          parent={name}
          className={classes.genderField}
        />
        <Field
          Component={NumberInput}
          label="Tuổi"
          name="age"
          parent={name}
          className={classes.ageField}
        />
        <HeightFieldInput name="height" parent={name} className={classes.heightField} />
        <WeightFieldInput
          name="weight"
          height={getFieldValue('height')}
          parent={name}
          className={classes.weightField}
        />
        <LossFieldInput
          label="Cần giảm"
          name="loss"
          parent={name}
          height={getFieldValue('height')}
          weight={getFieldValue('weight')}
          className={classes.lossField}
        />
      </div>
      <div className={classes.detail}>
        <div>
          <Field
            Component={Input}
            label="Tình trạng sức khoẻ"
            name="condition"
            multiline
            parent={name}
            placeholder="Cần lưu ý"
          />
          <Field
            Component={Input}
            label="Yêu cầu/Mong muốn"
            name="request"
            multiline
            parent={name}
            placeholder="Yêu cầu của khách hàng"
          />
        </div>
        <div>
          <ProgramFieldInput label="Chương trình" name="program" brand="CWP" parent={name} />
          <Field
            Component={Input}
            label="Tư vấn"
            name="advice"
            multiline
            parent={name}
            placeholder="Nội dung đã tư vấn cho khách hàng"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonTeleInput;
