import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';

export const RouterApp = () => {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <PrivateRoute
              path='/'
              component={DashboardRoutes}
              isAuthenticated={true}
            />

            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    </>
  );
};
