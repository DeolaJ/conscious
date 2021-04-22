import {
  FETCH_ALL_CONTRIBUTORS_START,
  FETCH_ALL_CONTRIBUTORS_SUCCESS,
  FETCH_ALL_CONTRIBUTORS_FAILURE,
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_FAILURE,
  FETCH_CONTRIBUTORS_USER_DETAILS_START,
  FETCH_CONTRIBUTORS_USER_DETAILS_SUCCESS,
  FETCH_CONTRIBUTORS_USER_DETAILS_FAILURE,
  SET_FILTER,
} from '../actions/types';

export const defaultState = {
  repos: [],
  contributors: [],
  isFetchingContributorsList: false,
  repoContributors: {},
  filterValue: 'all',
  contributorsUserDetails: {},
  isFetchingContributorsDetails: false,
};

export default function angularRankReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_CONTRIBUTORS_START:
    case FETCH_ALL_CONTRIBUTORS_SUCCESS:
    case FETCH_ALL_CONTRIBUTORS_FAILURE:
    case FETCH_REPOSITORY_START:
    case FETCH_REPOSITORY_SUCCESS:
    case FETCH_REPOSITORY_FAILURE:
    case FETCH_CONTRIBUTORS_USER_DETAILS_START:
    case FETCH_CONTRIBUTORS_USER_DETAILS_SUCCESS:
    case FETCH_CONTRIBUTORS_USER_DETAILS_FAILURE:
    case SET_FILTER: {
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      return state;
    }
  }
}
