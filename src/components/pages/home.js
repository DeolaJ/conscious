import React from 'react';

import Layout from '../partials/layout';
import ErrorBoundary from '../partials/error-boundary';
import FilteredContributorsList from '../filtered-contributors-list';
import Filters from '../filters';

import Background from '../../assets/images/background.svg';

function Home() {
  return (
    <Layout className="min-h-visibleScreen" style={{ backgroundImage: `url(${Background})` }}>
      <section className="p-6 home md:p-10">
        <h1 className="pt-20 text-4xl text-center pb-14">Angular Contributors</h1>

        <ErrorBoundary>
          <Filters />
          <FilteredContributorsList />
        </ErrorBoundary>
      </section>
    </Layout>
  );
}

export default Home;
