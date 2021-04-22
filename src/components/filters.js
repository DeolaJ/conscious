import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import Dropdown from './partials/dropdown';

import actions from '../actions';
import selectors from '../selectors';
import Loader from './partials/loader';

const FilterWrapper = styled.section`
  > * + * {
    margin-left: 1rem;
  }

  h2 span {
    font-size: 0.7rem;
  }
`;

const filterOptions = [
  {
    key: 'all',
    text: 'All',
    value: 'all',
  },
  {
    key: 'contributions',
    text: 'Contributions',
    value: 'contributions',
  },
  {
    key: 'followers',
    text: 'Followers',
    value: 'followers',
  },
  {
    key: 'public-repos',
    text: 'Public Repos',
    value: 'public-repos',
  },
  {
    key: 'gists-published',
    text: 'Gists Published',
    value: 'gists-published',
  },
];

function Filters() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectors.selectFilterValue);
  const fetchingContributors = useSelector(selectors.selectIsFetchingContributors);
  const fetchingContributorsDetails = useSelector(selectors.selectIsFetchingContributorsDetails);

  const setFilterOption = useRef((value) => {
    dispatch(actions.doSetFilterOption(value));
  });

  return (
    <FilterWrapper className="flex items-center justify-between w-full mt-6 mb-10">
      <h2 className="text-2xl">
        List of Contributors{' '}
        {filterValue !== 'all' && (
          <span className="px-3 py-2 ml-3 align-middle rounded-md bg-rose-100 text-rose-700">
            Active filter
          </span>
        )}
      </h2>
      <article className="flex items-center">
        {(fetchingContributors || fetchingContributorsDetails) && <Loader />}
        <Dropdown
          filterValue={filterValue}
          options={filterOptions}
          disabled={fetchingContributors || fetchingContributorsDetails}
          setFilterOption={setFilterOption.current}
        />
      </article>
    </FilterWrapper>
  );
}

export default Filters;
