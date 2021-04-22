import parse from 'parse-link-header';
import { getFromLocalStorage } from './local-storage';
import { octokit, graphqlWithAuth } from '../octokit';

// FETCHING DIRECTLY FROM GITHUB
export async function defaultFetch(key, callback, callbackArgs) {
  const localData = getFromLocalStorage(key);

  if (localData) {
    return localData.data;
  }
  if (callbackArgs) {
    return callback(...callbackArgs);
  }
  return callback();
}

export async function fetchOrgRepos(org, page) {
  const response = await octokit.request('GET /orgs/{org}/repos', {
    org,
    type: 'all',
    page: page || 1,
    per_page: 100,
  });
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response;
}

export async function fetchRepoContributors(owner, repo, page) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
    owner,
    repo: repo.name,
    type: 'all',
    page: page || 1,
    per_page: 100,
  });
  if (response.status !== 200 && response.status !== 204) {
    throw new Error('Network response was not ok');
  }
  return response;
}

export async function fetchUserByLogin(login) {
  const response = await octokit.request('GET /users/{username}', {
    username: login,
  });
  if (response.status !== 200 && response.status !== 204) {
    throw new Error('Network response was not ok');
  }
  return response;
}

export async function fetchUser(query) {
  const response = await graphqlWithAuth(
    `
      {
        ${query}
      }
    `
  );
  return response;
}

// INITIAL GENERAL CONTRIBUTORS FETCH UTILITY FUNCTIONS
function generateRepoContributors(owner, repo) {
  let tempContributors = [];
  function fetchContributors(page) {
    return fetchRepoContributors(owner, repo, page).then(async (response) => {
      tempContributors = tempContributors.concat(response.data);
      if (response.headers.link) {
        const parsed = parse(response.headers.link);
        const nextPage = parsed.next;

        if (nextPage && nextPage.page) {
          return fetchContributors(nextPage.page);
        }
      }
      return { repo, tempContributors };
    });
  }
  return fetchContributors();
}

function generateContributorsCount(contributors) {
  const countedContributors = {};

  for (let i = 0; i < contributors.length; i += 1) {
    const contributor = contributors[i];
    if (
      contributor &&
      contributor.login !== 'dependabot[bot]' &&
      contributor.login !== 'renovate[bot]'
    ) {
      if (countedContributors[contributor.login]) {
        countedContributors[contributor.login].count += 1;
      } else {
        countedContributors[contributor.login] = {
          count: 1,
          details: contributor,
        };
      }
    }
  }

  return Object.values(countedContributors);
}

function generateContributorsArray(contributors) {
  if (contributors.length === 0) {
    return [];
  }
  return contributors.map((contributor) => {
    if (contributor && contributor.login) {
      return contributor.login;
    }
    return '';
  });
}

function generateRepoAndContributors(contributorsList) {
  let allContributors = [];
  const repoContributors = {};
  const contributorsLength = contributorsList.length;

  for (let i = 0; i < contributorsLength; i += 1) {
    const { repo, tempContributors } = contributorsList[i];
    repoContributors[repo.name] = {
      repo,
      contributors: tempContributors,
      contributorsLogin: generateContributorsArray(tempContributors),
    };
    allContributors = allContributors.concat(tempContributors);
  }
  return { allContributors, repoContributors };
}

export async function fetchAndGenerateContributors(owner, repos) {
  return Promise.all(repos.map((repo) => generateRepoContributors(owner, repo)))
    .then(async (results) => generateRepoAndContributors(results))
    .then((contributorsInfo) => {
      const { allContributors, repoContributors } = contributorsInfo;
      const contributors = generateContributorsCount(allContributors);
      return {
        contributors,
        repoContributors,
      };
    });
}

// INDIVIDUAL CONTRIBUTOR FETCH UTILITY FUNCTIONS
// async function updateContributorUserInformation(contributor) {
//   return fetchUserByLogin(contributor.details.login).then((response) => {
//     console.log({ response });
//     const updatedContributor = {
//       count: contributor.count,
//       details: {
//         ...contributor.details,
//         name: response.name,
//         public_gists: response.public_gists,
//         public_repos: response.public_repos,
//         followers: response.followers,
//         bio: response.bio,
//       },
//     };
//     return updatedContributor;
//   });
// }

// export async function fetchIndividualContributorsInfo(contributors) {
//   return Promise.all(
//     contributors.map((contributor) => updateContributorUserInformation(contributor))
//   ).then((updatedContributors) => updatedContributors);
// }

function generateContributorsGroup(contributors, divisor) {
  const contributorsLength = contributors.length;
  const contributorsGroup = [];

  for (let i = 0; i < contributorsLength; i += divisor) {
    const groupContributors = contributors.slice(i, i + divisor);
    contributorsGroup.push(groupContributors);
  }

  return contributorsGroup;
}

function generateUsersQuery(contributors) {
  let query = '';

  for (let i = 0; i < contributors.length; i += 1) {
    const contributor = contributors[i];
    if (
      contributor.details.login !== 'dependabot[bot]' &&
      contributor.details.login !== 'renovate[bot]'
    ) {
      query += `
        contributor${contributor.details.id}: user(login: "${contributor.details.login}") {
          name
          repositories(privacy: PUBLIC) {
            totalCount
          }
          gists(privacy: PUBLIC) {
            totalCount
          }
          followers {
            totalCount
          }
        }
      `;
    }
  }

  return query;
}

export async function fetchIndividualContributorsInfo(contributors) {
  const contributorsGroup = generateContributorsGroup(contributors, 250);
  return Promise.all(
    contributorsGroup.map(function getContributorUserDetails(group) {
      const query = generateUsersQuery(group);
      return fetchUser(query);
    })
  ).then((allResults) => {
    const allResultsLength = allResults.length;
    let contributorsUserDetails = {};

    for (let i = 0; i < allResultsLength; i += 1) {
      const userInfo = allResults[i];
      contributorsUserDetails = {
        ...contributorsUserDetails,
        ...userInfo,
      };
    }
    return contributorsUserDetails;
  });
}

export default {
  defaultFetch,
  fetchOrgRepos,
  fetchRepoContributors,
  fetchAndGenerateContributors,
  fetchUserByLogin,
  fetchIndividualContributorsInfo,
};
