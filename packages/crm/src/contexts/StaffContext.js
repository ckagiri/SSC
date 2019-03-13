import React from 'react';
import { pick } from 'lodash';

const StaffContext = React.createContext('loading');
export default StaffContext;

export const loadPublic = ({ value, children }) => (
  <StaffContext.Provider value={value}>{children}</StaffContext.Provider>
);
export const StaffProvider = StaffContext.Provider;
export const withStaff = (Component, list) => props => (
  <StaffContext.Consumer>
    {value => {
      const data = list ? pick(value, list) : value;
      console.log(value);
      return <Component {...props} {...data} />;
    }}
  </StaffContext.Consumer>
);
