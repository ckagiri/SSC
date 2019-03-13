import React from 'react';
import { Route, makeRouteConfig, hotRouteConfig } from 'found';

import App from '../App';
import RootRoute from './Root.route';
import ConsultantRoute from './Consultant.route';
import ConsultantLayout from '../domain/Consultant/ConsultantLayout';
import ContactRoute from './Contact.route';
import ContactPage from '../domain/Contact/ContactPage';
import Consultation from '../domain/Consultation/Consultation';
import CustomerNewPage from '../domain/Customer/CustomerNewPage';

const routeConfig = makeRouteConfig(
  <RootRoute path="/" Component={App}>
    <ConsultantRoute Component={ConsultantLayout}>
      <Route path="new" Component={CustomerNewPage} />
      <Route path="search" Component={() => 'search'} />
      <Route path="inbox" Component={() => 'inbox'} />
      <Route path="today" Component={() => 'today'} />
      <Route path="call" Component={() => 'call'} />
      <Route path="schedule" Component={() => 'schedule'} />
      <Route path="favorite" Component={() => 'favorite'} />
      <Route path="outbox" Component={() => 'outbox'} />
      <Route path="customers" Component={() => 'customers'} />
      <ContactRoute path=":phone" Component={ContactPage}>
        {{
          Customer: [
            <Route path="/" Component={Consultation} />,
            <Route path="appointment" Component={() => 'appointment'} />,
          ],
        }}
      </ContactRoute>
    </ConsultantRoute>
  </RootRoute>,
);

export default hotRouteConfig(routeConfig);
