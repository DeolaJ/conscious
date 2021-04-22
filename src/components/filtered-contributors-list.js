import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import ContributorsGallery from './partials/contributors-gallery';
import Pagination from './partials/pagination';

import selectors from '../selectors';

function FilteredContributorsList() {
  const [currentContributorsList, setCurrentContributorsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredContributors = useSelector(selectors.selectFilteredContributors, isEqual);
  const filterValue = useSelector(selectors.selectFilterValue);
  const fetchingContributors = useSelector(selectors.selectIsFetchingContributors);

  const resultsPerPage = 120;

  useEffect(() => {
    function updatePageContributors(pageNumber) {
      const recentResultsEndIndex = pageNumber * resultsPerPage;
      const firstResultIndex = recentResultsEndIndex - resultsPerPage;
      const currentPageContributors = filteredContributors.slice(
        firstResultIndex,
        recentResultsEndIndex
      );

      return currentPageContributors;
    }

    const newPageContributors = updatePageContributors(currentPage);
    setCurrentContributorsList(newPageContributors);
  }, [filteredContributors, currentPage, filterValue]);

  return (
    <section>
      <ContributorsGallery contributors={currentContributorsList} />

      {!fetchingContributors && (
        <Pagination
          items={filteredContributors}
          resultsPerPage={resultsPerPage}
          changeResultPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

export default FilteredContributorsList;
