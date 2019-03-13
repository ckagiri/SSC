import React, { useState } from 'react';
import MaskedInput from 'react-text-mask';

import Input from './Input';

const PhoneMask = ({ inputRef, ...props }) => (
  <MaskedInput
    {...props}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={[/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
    placeholderChar={'\u2000'}
    showMask={false}
  />
);
const PhoneInput = ({ onChange, ...props }) => (
  <Input
    resetable={false}
    label="Điện thoại"
    type="tel"
    onChange={v => onChange && onChange((v || '').replace(/\s/g, ''))}
    {...props}
    inputComponent={PhoneMask}
  />
);

export default PhoneInput;
