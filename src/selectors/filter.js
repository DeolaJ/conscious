import { createSelector } from 'reselect';

import { selectAllContributorUserDetails } from './contributor-user-details';

export const selectIsFetchingContributors = (state) => state.angular.isFetchingContributorsList;

export const selectContributors = (state) => state.angular.contributors;

export const selectFilterValue = (state) => state.angular.filterValue;

export const selectFilteredContributors = createSelector(
  [
    selectIsFetchingContributors,
    selectContributors,
    selectFilterValue,
    selectAllContributorUserDetails,
  ],
  (isFetching, contributors, filter, contributorUserDetails) => {
    if (isFetching) {
      return Array(8).fill({});
    }
    if (filter === 'contributions') {
      const sortedContributors = contributors.sort(function sortByContributions(a, b) {
        return b.count - a.count;
      });
      return sortedContributors;
    }
    if (filter === 'followers') {
      const sortedContributors = contributors.sort(function sortByFollowers(a, b) {
        const aUserDetails = contributorUserDetails[`contributor${a.details.id}`];
        const bUserDetails = contributorUserDetails[`contributor${b.details.id}`];
        return bUserDetails.followers.totalCount - aUserDetails.followers.totalCount;
      });
      return sortedContributors;
    }
    if (filter === 'public-repos') {
      const sortedContributors = contributors.sort(function sortByPublicRepos(a, b) {
        const aUserDetails = contributorUserDetails[`contributor${a.details.id}`];
        const bUserDetails = contributorUserDetails[`contributor${b.details.id}`];
        return bUserDetails.repositories.totalCount - aUserDetails.repositories.totalCount;
      });
      return sortedContributors;
    }
    if (filter === 'gists-published') {
      const sortedContributors = contributors.sort(function sortByGistsPublished(a, b) {
        const aUserDetails = contributorUserDetails[`contributor${a.details.id}`];
        const bUserDetails = contributorUserDetails[`contributor${b.details.id}`];
        return bUserDetails.gists.totalCount - aUserDetails.gists.totalCount;
      });
      return sortedContributors;
    }
    return contributors;
  }
);
