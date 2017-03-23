import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Workspace from './workspace';
import { Preview, QueryPreview } from './preview';

const router = (
  <Route path='/' component={App}>
    <IndexRoute component={Workspace} />
    <Route path='preview' component={Preview} />
    <Route path='queries/:id' component={QueryPreview} />
  </Route>
);

export default router;
