import React from 'react';
import PropTypes from 'prop-types';

import RepositoryListItem from './repository-list-item';
import ErrorBoundary from './error-boundary';

const RepositoryList = ({ repositories }) => (
  <ErrorBoundary>
    <ul className="m-0 list-none">
      {repositories.map((repository, index) => (
        <RepositoryListItem repository={repository} key={repository.id || `repository-${index}`} />
      ))}
    </ul>
  </ErrorBoundary>
);

RepositoryList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepositoryList;
