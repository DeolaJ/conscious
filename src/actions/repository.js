/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import parse from 'parse-link-header';
import utils from '../utils';

import {
  FETCH_REPOSITORY_START,
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_FAILURE,
} from './types';

const fetchRepositoryStart = (payload) => ({
  type: FETCH_REPOSITORY_START,
  payload,
});

const fetchRepositorySuccess = (payload) => ({
  type: FETCH_REPOSITORY_SUCCESS,
  payload,
});

const fetchRepositoryFailure = (payload) => ({
  type: FETCH_REPOSITORY_FAILURE,
  payload,
});

export const doFetchRepository = (org) => async (dispatch) => {
  dispatch(
    fetchRepositoryStart({
      isFetchingRepositories: true,
    })
  );

  let repos = [];

  function fetchRepository(page) {
    return utils.fetchOrgRepos(org, page).then(async (response) => {
      const parsed = parse(response.headers.link);
      repos = repos.concat(response.data);
      const nextPage = parsed.next;

      if (nextPage && nextPage.page) {
        return fetchRepository(nextPage.page);
      }
      utils.storeInLocalStorage('repos', repos);
      return repos;
    });
  }

  return utils
    .defaultFetch('repos', fetchRepository, undefined)
    .then((response) => {
      dispatch(
        fetchRepositorySuccess({
          repos: response,
          isFetchingRepositories: false,
        })
      );
      return { repos: response };
    })
    .catch((error) => {
      dispatch(
        fetchRepositoryFailure({
          isFetchingRepositories: false,
        })
      );
      toast.error(`Error: ${error.message}. Please reload the page`);
      return { error };
    });
};

export default doFetchRepository;
