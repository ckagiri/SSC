import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import Loading from './Loading';
import LoadingIcon from './LoadingIcon';
storiesOf('Loading', module).addDecorator(function (story) {
  return React.createElement("div", {
    style: {
      margin: 8,
      position: 'relative',
      border: '#ccc 1px solid'
    }
  }, story());
}).add('bar', function () {
  return React.createElement("div", {
    style: {
      height: 32
    }
  }, React.createElement(Loading, {
    color: select('color', {
      default: null,
      primary: 'primary',
      secondary: 'secondary'
    }),
    position: select('position', {
      default: null,
      top: 'top',
      bottom: 'bottom'
    })
  }));
}).add('icon', function () {
  return React.createElement(LoadingIcon, {
    color: select('color', {
      default: null,
      primary: 'primary',
      secondary: 'secondary'
    }),
    size: number('size')
  });
});