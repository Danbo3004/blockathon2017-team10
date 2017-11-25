import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import Loadable from 'react-loadable';

import stores from './stores';
import localeStore from 'stores/LocaleStore';

useStrict(true);

function Loading(args) {
  if (args.error) {
    return <div>(Loadable) Error!</div>;
  } else if (args.pastDelay) {
    return <div>(Loadable) Loading...</div>;
  }
  return null;
}

import Container from 'pages/Container';

const AsyncHomePage = Loadable({
  loader: () => import(/* webpackChunkName: "HomePage" */ 'pages/HomePage'),
  loading: Loading,
  delay: 300,
});

const AsyncGenKeyPage = Loadable({
  loader: () => import(/* webpackChunkName: "GenKeyPage" */ 'pages/GenKeyPage'),
  loading: Loading,
  delay: 300,
});

const AsyncFileStorePage = Loadable({
  loader: () => import(/* webpackChunkName: "FileStorePage" */ 'pages/FileStorePage'),
  loading: Loading,
  delay: 300,
});

const AsyncFileRetrievePage = Loadable({
  loader: () => import(/* webpackChunkName: "FileRetrievePage" */ 'pages/FileRetrievePage'),
  loading: Loading,
  delay: 300,
});

const routes = (
  <Provider {...stores}>
    <IntlProvider locale={localeStore.language} messages={localeStore.messages}>
      <Router history={browserHistory}>
        <Route component={Container}>
          <IndexRoute component={Container} />
          <Route path="/" component={AsyncHomePage}>
            <IndexRoute component={AsyncGenKeyPage} />
            <Route path="/keys" component={AsyncGenKeyPage} />
            <Route path="/record/store" component={AsyncFileStorePage} />
            <Route path="/record/retrieve" component={AsyncFileRetrievePage} />
          </Route>
        </Route>
      </Router>
    </IntlProvider>
  </Provider>
);

export default routes;
