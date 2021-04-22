import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import utils from '../../utils';

const TopRepositoryContent = styled.div`
  h3 > * + * {
    margin-left: 1rem;
  }
`;

const BottomRepositoryContent = styled.div`
  > * + * {
    margin-left: 1rem;
  }

  svg {
    display: inline-block;
    vertical-align: text-bottom;
    fill: #586069;
  }
`;

const RepoHeaderLabel = styled.label`
  line-height: 1.0625rem;
  border: 1px solid #e1e4e8;
  color: #586069;
  margin: 0 0 0.25rem 0.5rem;
`;

function RepositoryListItem({ repository }) {
  const history = useHistory();

  const viewRepositoryDetails = (repositoryName) => {
    history.push(`/repository/${repositoryName}`);
  };

  return (
    <li className="relative w-full max-w-lg p-4 mx-auto mb-6 border border-black border-solid rounded-md min-h-repoloader">
      {repository.id ? (
        <>
          <div>
            <TopRepositoryContent>
              <h3>
                <button
                  type="button"
                  onClick={() => viewRepositoryDetails(repository.name)}
                  className="text-lg text-blue-800 hover:underline">
                  {repository.name}
                </button>
                <a
                  href={repository.git_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-700 underline hover:text-gray-900">
                  Github
                </a>
                {repository.private && (
                  <RepoHeaderLabel className="inline-block px-2 py-0 ml-2 text-xs font-medium capitalize align-middle bg-transparent rounded-3xl">
                    Private
                  </RepoHeaderLabel>
                )}
                {repository.archived && (
                  <RepoHeaderLabel className="inline-block px-2 py-0 ml-2 text-xs font-medium capitalize align-middle bg-transparent rounded-3xl">
                    Archived
                  </RepoHeaderLabel>
                )}
              </h3>
            </TopRepositoryContent>

            {repository.description && (
              <p className="mt-2 mb-4 text-sm text-gray-600">{repository.description}</p>
            )}

            <BottomRepositoryContent className="flex mt-2 text-xs">
              {repository.stargazers_count && (
                <div className="flex items-center stargazer-count">
                  <div className="flex mr-1">
                    <svg
                      aria-label="star"
                      viewBox="0 0 18 18"
                      version="1.1"
                      width="18"
                      height="18"
                      role="img">
                      <path
                        fillRule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                      />
                    </svg>
                  </div>
                  <p className="m-0 text-xs">{repository.stargazers_count}</p>
                </div>
              )}

              {repository.forks_count && (
                <div className="flex items-center fork-count">
                  <div className="flex mr-1">
                    <svg
                      aria-label="fork"
                      viewBox="0 0 18 18"
                      version="1.1"
                      width="18"
                      height="18"
                      role="img">
                      <path
                        fillRule="evenodd"
                        d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      />
                    </svg>
                  </div>
                  <p className="m-0 text-xs">{repository.forks_count}</p>
                </div>
              )}

              {repository.license && (
                <div className="flex items-center license">
                  <div className="flex mr-1">
                    <svg
                      aria-label="license"
                      viewBox="0 0 18 18"
                      version="1.1"
                      width="18"
                      height="18"
                      role="img">
                      <path
                        fillRule="evenodd"
                        d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
                      />
                    </svg>
                  </div>
                  <p className="m-0 text-xs">{repository.license.name}</p>
                </div>
              )}
              <div className="updated-time">
                {utils.generateUpdatedAtText(repository.updated_at)}
              </div>
            </BottomRepositoryContent>
          </div>
        </>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full p-5 bg-gray-100 rounded-lg shadow-card">
          <div className="w-2/4 h-3 mt-2 mb-4 bg-gray-200" />
          <div className="w-4/5 h-3 mb-6 bg-gray-200" />
          <div className="w-4/5 h-3 bg-gray-200" />
        </div>
      )}
    </li>
  );
}

RepositoryListItem.defaultProps = {
  repository: {},
};

RepositoryListItem.propTypes = {
  repository: PropTypes.objectOf(PropTypes.any),
};

export default RepositoryListItem;
