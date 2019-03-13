import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import Loading from './Loading';
import LoadingIcon from './LoadingIcon';

storiesOf('Loading', module)
  .addDecorator(story => (
    <div style={{ margin: 8, position: 'relative', border: '#ccc 1px solid' }}>{story()}</div>
  ))
  .add('bar', () => (
    <div style={{ height: 32 }}>
      <Loading
        color={select('color', { default: null, primary: 'primary', secondary: 'secondary' })}
        position={select('position', { default: null, top: 'top', bottom: 'bottom' })}
      />
    </div>
  ))
  .add('icon', () => (
    <LoadingIcon
      color={select('color', { default: null, primary: 'primary', secondary: 'secondary' })}
      size={number('size')}
    />
  ));
