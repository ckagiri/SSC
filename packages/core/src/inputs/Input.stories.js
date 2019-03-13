import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import Input from './Input';

storiesOf('Input', module).add('Input', () => (
  <Input
    label='Label'
    variant={select('variant', {
      standard: 'standard',
      outlined: 'outlined',
      filled: 'filled',
    })}
    loading={boolean('loading', false)}
    resetable={boolean('resetable', false)}
    endAdornment={text('end', '')}
    value={text('value', '')}
  />
));
