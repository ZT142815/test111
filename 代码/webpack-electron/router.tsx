import * as React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ROUTER from './common/constants/router';
import Login from './container/login';
import Home from './container/home';
import Task from './container/task';
import WebView from './container/webview';

const RouterWang = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path={ROUTER.login} component={Login} exact />
        <Route path={ROUTER.home} component={Home} exact />
        <Route path={ROUTER.task} component={Task} exact />
        <Route path={ROUTER.webview} component={WebView} exact />
      </Switch>
      <Redirect to="/" />
    </HashRouter>
  );
};

export default RouterWang;
