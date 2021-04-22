import { getFromLocalStorage, localStorageAvailable, storeInLocalStorage } from './local-storage';
import { generateUpdatedAtText } from './shared';
import {
  defaultFetch,
  fetchOrgRepos,
  fetchRepoContributors,
  fetchAndGenerateContributors,
  fetchUserByLogin,
  fetchIndividualContributorsInfo,
} from './fetch';

export default {
  defaultFetch,
  getFromLocalStorage,
  storeInLocalStorage,
  localStorageAvailable,
  fetchOrgRepos,
  fetchRepoContributors,
  fetchAndGenerateContributors,
  fetchUserByLogin,
  fetchIndividualContributorsInfo,
  generateUpdatedAtText,
};
