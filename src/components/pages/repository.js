import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import Layout from '../partials/layout';
import ContributorsGallery from '../partials/contributors-gallery';
import PaginatedList from '../paginated-list';
import Loader from '../partials/loader';

import selectors from '../../selectors';
import utils from '../../utils';

const RepositoryHeaderWrapper = styled.section``;

const RepositoryHeaderPlaceholder = styled.section`
  min-height: 500px;
  background: #f5f5f5;
`;

function Repository() {
  const { repositoryName } = useParams();

  const [repoDetails, setRepoDetails] = useState({});
  const repoContributors = useSelector(selectors.selectRepoContributors);

  useEffect(() => {
    function getRepoDetails() {
      const repoDetail = repoContributors[repositoryName];
      setRepoDetails(repoDetail);
    }

    if (!isEmpty(repoContributors)) {
      getRepoDetails();
    }
  }, [repositoryName, repoContributors]);

  return (
    <Layout className="min-h-visibleScreen">
      {repoDetails ? (
        <>
          {!isEmpty(repoDetails) ? (
            <>
              <RepositoryHeaderWrapper className="px-8 py-12 md:p-10">
                <div>
                  <h1 className="m-0 mb-4 text-4xl">
                    <a
                      className="hover:underline"
                      href={repoDetails.repo.git_url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {repoDetails.repo.name}
                    </a>
                  </h1>
                  {repoDetails.repo.private && <p>Private</p>}
                  {repoDetails.repo.archived && <p>Archived</p>}
                  {repoDetails.repo.watchers && <p>{repoDetails.repo.watchers} Watchers</p>}
                  {repoDetails.repo.forks_count && <p>{repoDetails.repo.forks_count} Forks</p>}
                  {repoDetails.repo.license && <p>{repoDetails.repo.license.name}</p>}
                  <p>{utils.generateUpdatedAtText(repoDetails.repo.updated_at)}</p>
                </div>
              </RepositoryHeaderWrapper>
            </>
          ) : (
            <RepositoryHeaderPlaceholder className="w-full">
              <Loader />
            </RepositoryHeaderPlaceholder>
          )}

          <section className="px-8 py-16 bg-blue-100 min-h-listLoader">
            <h2 className="mb-6 text-2xl">Contributors</h2>
            {!isEmpty(repoDetails) ? (
              <PaginatedList
                ListComponent={ContributorsGallery}
                items={repoDetails.contributors}
                type="contributors"
                resultsPerPage={40}
              />
            ) : (
              <ContributorsGallery contributors={Array(8).fill({})} />
            )}
          </section>
        </>
      ) : (
        <p className="p-8 text-xl">This Repository was not found</p>
      )}
    </Layout>
  );
}

export default Repository;
