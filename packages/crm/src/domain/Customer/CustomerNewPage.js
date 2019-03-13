import React from 'react';
import {
  Input,
  PhoneInput,
  Field,
  withMutation,
  Header,
  // Debug,
  useField,
  LoadingButton,
  Typography,
  Page,
} from '@ssc/core';
import { CardContent, CardActions } from '@material-ui/core';
import { registerContactValidation } from '@ssc/common';
import graphql from 'babel-plugin-relay/macro';
import { get } from 'lodash';

import environment from '../../environment';
import PrefixFieldInput from '../../inputs/PrefixFieldInput';
import AddressFieldInput from '../../inputs/AddressFieldInput';
import SourceFieldInput from '../../inputs/SourceFieldInput';
import ConsultantFieldInput from '../Consultant/ConsultantFieldInput';
import ContactFieldInput from '../Contact/ContactFieldInput';
import ContactTopbar from '../Contact/ContactTopbar';

const NewContactForm = props => {
  const { form } = useField(props);
  const { getFieldValue, setFieldValue, errors, isValid, isSubmitting } = form;
  return (
    <Page header={<ContactTopbar title="Khách mới" />}>
      <CardContent>
        {typeof errors === 'string' && <Typography color="error">{errors}</Typography>}
        <SourceFieldInput
          name="source"
          required
          onSelect={i => (i ? setFieldValue('state', i.state) : setFieldValue('state', undefined))}
        />
        {getFieldValue('source.from') !== 'Vãng lai' && (
          <React.Fragment>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 5fr 5fr ', gridColumnGap: 8 }}>
              <PrefixFieldInput name="prefix" />
              <Field Component={Input} name="firstName" label="Họ" />
              <Field Component={Input} name="lastName" label="Tên" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
              <Field Component={PhoneInput} name="phone" required />
              <Field Component={Input} name="email" label="Email" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
              <ContactFieldInput
                label="Giới thiệu"
                name="introducedById"
                onSelect={contact => {
                  const { discount, category } = contact || {};
                  setFieldValue(
                    'discount',
                    contact ? (discount >= 0.05 && category === 'Customer' ? 0.05 : 0) : undefined,
                  );
                  if (!getFieldValue('teleconsultantId') && get(contact, 'consultant.id')) {
                    setFieldValue('teleconsultantId', get(contact, 'consultant.id'));
                  }
                }}
                helperText={
                  getFieldValue('discount') &&
                  `Chiếu khấu giới thiệu: ${getFieldValue('discount') * 100}%`
                }
              />
              <ConsultantFieldInput label="Sơ bộ" name="teleconsultantId" />
              <ConsultantFieldInput
                label="Tư vấn"
                name="preconsultantId"
                disabled={getFieldValue('state') !== 'consultation'}
              />
              <ConsultantFieldInput
                label="Chăm sóc"
                name="consultantId"
                disabled={getFieldValue('state') !== 'consultation'}
              />
            </div>
            <AddressFieldInput name="addresses.0" />
          </React.Fragment>
        )}
      </CardContent>
      <CardActions>
        <LoadingButton color="secondary" type="submit" disabled={!isValid} loading={isSubmitting}>
          Đăng ký
        </LoadingButton>
      </CardActions>
    </Page>
  );
};

const onComplete = ({ phone }, { router, match }) => {
  if (get(match, 'location.pathname') === `/customer/${phone}`) {
    window.location.href = `/customer/${phone}`;
  } else {
    router.push(`/customer/${phone}`);
  }
};

export default withMutation({
  environment,
  onComplete,
  valueToInput: v => ({ customer: v }),
  payloadToValue: p => get(p, 'customerMutation.register.customer'),
  mutation: graphql`
    mutation CustomerNewPageMutation($input: RegisterCustomerInput!) {
      customerMutation {
        register(input: $input) {
          customer {
            phone
            category
            state
          }
        }
      }
    }
  `,
  validationSchema: registerContactValidation,
})(NewContactForm);
