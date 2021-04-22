/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import utils from '../utils';
import {
  FETCH_CONTRIBUTORS_USER_DETAILS_START,
  FETCH_CONTRIBUTORS_USER_DETAILS_SUCCESS,
  FETCH_CONTRIBUTORS_USER_DETAILS_FAILURE,
} from './types';

const fetchContributorStart = (payload) => ({
  type: FETCH_CONTRIBUTORS_USER_DETAILS_START,
  payload,
});

const fetchContributorSuccess = (payload) => ({
  type: FETCH_CONTRIBUTORS_USER_DETAILS_SUCCESS,
  payload,
});

const fetchContributorFailure = (payload) => ({
  type: FETCH_CONTRIBUTORS_USER_DETAILS_FAILURE,
  payload,
});

const doFetchContributorInfo = (contributors) => async (dispatch) => {
  dispatch(
    fetchContributorStart({
      isFetchingContributorsDetails: true,
    })
  );

  return utils
    .fetchIndividualContributorsInfo(contributors)
    .then((contributorsUserDetails) => {
      dispatch(
        fetchContributorSuccess({
          contributorsUserDetails,
          isFetchingContributorsDetails: false,
        })
      );
    })
    .catch((error) => {
      dispatch(
        fetchContributorFailure({
          isFetchingContributorsDetails: false,
        })
      );
      toast.error(`Error: ${error.message}. Please reload the page`);
    });
};

export default doFetchContributorInfo;
