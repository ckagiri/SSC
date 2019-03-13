import React from 'react';
import { storiesOf } from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';
import Typography from './Typography';

var Text = function Text(props) {
  return React.createElement(Typography, props);
};

storiesOf('Text', module).add('Text', withPropsCombinations(Text, {
  children: ['Text testing'],
  color: ['info', 'notice', 'low', 'normal', 'medium', 'high', 'extreme']
}));