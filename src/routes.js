import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/App';
import FrontPage from './components/FrontPage/FrontPage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={FrontPage} />
  </Route>
);
