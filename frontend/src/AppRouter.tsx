import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { appRoutes } from './routes';
import { BANK_ROUTE } from './Utils/RouteNames';

const AppRouter: React.FC = () => {
  return (
    <Switch>
      {appRoutes.map(({path, Component})=>
        <Route key={path} path={path} component={Component} exact/>
      )}
      <Redirect to={BANK_ROUTE}/>
    </Switch>
  );
};

export default AppRouter;