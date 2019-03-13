import debug from 'debug';
import R from 'ramda';

export const log = (...arg) => {
  console.log('Log: ', ...arg);
  return R.last(arg);
}; //eslint-disable-line
export const makeDebug = msg => (...args) => {
  debug(msg)(...args);
  return R.last(args);
};
