import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import fetchQuery from './fetchQuery';

// const { installRelayDevTools } = require('relay-devtools');
// installRelayDevTools();

const source = new RecordSource();
const store = new Store(source);
const network = () => Network.create(fetchQuery); // see note below
const handlerProvider = null;

const environment = new Environment({
  handlerProvider, // Can omit.
  network: network(),
  store,
});

export default environment;
