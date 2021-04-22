/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import utils from '../utils';
import { doFetchRepository } from './repository';
import doFetchContributorInfo from './contributor';

import {
  FETCH_ALL_CONTRIBUTORS_START,
  FETCH_ALL_CONTRIBUTORS_SUCCESS,
  FETCH_ALL_CONTRIBUTORS_FAILURE,
} from './types';

const fetchAllContributorsStart = (payload) => ({
  type: FETCH_ALL_CONTRIBUTORS_START,
  payload,
});

const fetchAllContributorsSuccess = (payload) => ({
  type: FETCH_ALL_CONTRIBUTORS_SUCCESS,
  payload,
});

const fetchAllContributorsFailure = (payload) => ({
  type: FETCH_ALL_CONTRIBUTORS_FAILURE,
  payload,
});

const doFetchAllContributors = (org) => async (dispatch) => {
  dispatch(
    fetchAllContributorsStart({
      isFetchingContributorsList: true,
    })
  );

  // Fetch all Repositories
  const repositoryData = await dispatch(doFetchRepository(org));

  if (repositoryData.error) {
    dispatch(fetchAllContributorsFailure());
  }

  return utils
    .fetchAndGenerateContributors(org, repositoryData.repos)
    .then((contributorsInfo) => {
      const { contributors, repoContributors } = contributorsInfo;
      dispatch(
        fetchAllContributorsSuccess({
          contributors,
          repoContributors,
          isFetchingContributorsList: false,
        })
      );
      dispatch(doFetchContributorInfo(contributors));
    })
    .catch((error) => {
      dispatch(
        fetchAllContributorsFailure({
          isFetchingContributorsList: false,
        })
      );
      toast.error(`Error: ${error.message}. Please reload the page`);
    });
};

export default doFetchAllContributors;
