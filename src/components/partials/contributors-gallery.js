import React from 'react';
import PropTypes from 'prop-types';

import ContributorsCard from './contributors-card';
import ErrorBoundary from './error-boundary';

const ContributorsGallery = ({ contributors }) => (
  <ErrorBoundary>
    <ul className="grid gap-8 p-0 m-0 list-none place-content-evenly sm:place-content-between sm:gap-7 md:gap-10 grid-cols-grid md:grid-cols-gridMd lg:grid-cols-gridLg">
      {contributors.map((contributor, index) => {
        if (contributor.details) {
          return (
            <ContributorsCard
              contributor={contributor.details}
              key={contributor.details.id || `contributor-${index}`}
            />
          );
        }

        return (
          <ContributorsCard
            contributor={contributor}
            key={contributor.id || `contributor-${index}`}
          />
        );
      })}
    </ul>
  </ErrorBoundary>
);

ContributorsGallery.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContributorsGallery;
