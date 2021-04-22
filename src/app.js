import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Notifications from './components/partials/notifications';
import ErrorBoundary from './components/partials/error-boundary';
import LoadingFallback from './components/partials/loading-fallback';

import actions from './actions';

const HomePage = lazy(() => import('./components/pages/home'));
const RepositoryPage = lazy(() => import('./components/pages/repository'));
const ContributorPage = lazy(() => import('./components/pages/contributor'));
const ErrorPage = lazy(() => import('./components/pages/404'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetchAllContributors('angular'));
  }, [dispatch]);

  return (
    <>
      <Notifications />
      <ErrorBoundary>
        <Router basename="/">
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/repository/:repositoryName" component={RepositoryPage} />
              <Route path="/contributor/:contributorLogin" component={ContributorPage} />
              <Route component={ErrorPage} />
            </Switch>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;
