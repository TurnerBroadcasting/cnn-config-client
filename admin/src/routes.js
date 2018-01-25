import React from 'react';
import { Route,IndexRoute } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Health from './components/Health';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import require_auth from './common/require_auth';

export default (
    <Route  path="/" component={App}>
      <IndexRoute component={require_auth(Main)}/>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/hc" component={Health}/>
      <Route path="*" component={NotFound} />
    </Route>
  );
  