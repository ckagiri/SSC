import React from 'react';
import { BrowserProtocol, queryMiddleware } from 'farce';
import { hot } from 'react-hot-loader';
import {
  createFarceRouter,
  // createRender
} from 'found';
import { Resolver } from 'found-relay';
import { withRoot, withDate } from '@ssc/core';

import LoginPage from './authentication/LoginPage';
import routeConfig from './routes/routes';
import environment from './environment';

const BrowserRouter = hot(module)(
  createFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares: [queryMiddleware],
    routeConfig,
    // render: props => console.log(props),
    // renderReady: props => console.log('ready'),
    renderError: ({ error, ...props }) => {
      switch (error.status) {
        case 404:
          return <div>Not Found</div>;
        case 401:
          return <LoginPage {...props} />;
        default:
          return <div>Error</div>;
      }
    },
  }),
);

const Root = () => <BrowserRouter resolver={new Resolver(environment)} />;
export default withRoot()(withDate(Root));
