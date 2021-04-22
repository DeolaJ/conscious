import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Pagination from './partials/pagination';

function PaginatedList({ items, resultsPerPage, ListComponent, type }) {
  const [currentList, setCurrentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    function updatePageList(pageNumber) {
      const recentResultsEndIndex = pageNumber * resultsPerPage;
      const firstResultIndex = recentResultsEndIndex - resultsPerPage;
      const currentPageItems = items.slice(firstResultIndex, recentResultsEndIndex);

      return currentPageItems;
    }

    const newPageList = updatePageList(currentPage);
    setCurrentList(newPageList);
  }, [items, currentPage, resultsPerPage]);

  if (type === 'contributors') {
    return (
      <section>
        {!isEmpty(currentList) ? (
          <>
            <ListComponent contributors={currentList} />
            {items.length > resultsPerPage && (
              <Pagination
                items={items}
                resultsPerPage={resultsPerPage}
                changeResultPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </>
        ) : (
          <ListComponent contributors={Array(8).fill({})} />
        )}
      </section>
    );
  }

  if (type === 'repositories') {
    return (
      <section>
        {!isEmpty(currentList) ? (
          <>
            <ListComponent repositories={currentList} />
            {items.length > resultsPerPage && (
              <Pagination
                items={items}
                resultsPerPage={resultsPerPage}
                changeResultPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </>
        ) : (
          <ListComponent repositories={Array(8).fill({})} />
        )}
      </section>
    );
  }
}

PaginatedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  ListComponent: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default PaginatedList;
