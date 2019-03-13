import React from 'react';
import { get } from 'lodash';

const PreloadContext = React.createContext('loading');
export default PreloadContext;

export const loadPreload = ({ value, children }) => (
  <PreloadContext.Provider value={value}>{children}</PreloadContext.Provider>
);
export const PreloadProvider = PreloadContext.Provider;
export const withPreload = (Component, list) => props => (
  <PreloadContext.Consumer>
    {value => {
      const data = !list
        ? value
        : list.reduce(
            (obj, path) => ({ ...obj, [path.split('.').pop()]: get(value, path, null) }),
            {},
          );

      return <Component {...props} {...data} />;
    }}
  </PreloadContext.Consumer>
);
