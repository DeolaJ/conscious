import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import Layout from '../partials/layout';
import RepositoryList from '../partials/repository-list';
import PaginatedList from '../paginated-list';
import Loader from '../partials/loader';

import selectors from '../../selectors';

const ContributorHeaderWrapper = styled.section`
  @media (min-width: 768px) {
    grid-template-columns: 1fr 3fr;
  }
`;

const ContributorHeaderPlaceholder = styled.section`
  min-height: 450px;
  background: #f5f5f5;
`;

const ImgLoader = styled.div`
  height: 320px;
  width: 320px;
`;

function Contributor() {
  const { contributorLogin } = useParams();

  const [contributorDetails, setContributorDetails] = useState({});
  const contributors = useSelector(selectors.selectContributors);
  const allContributorUserDetails = useSelector(selectors.selectAllContributorUserDetails);
  const repoContributors = useSelector(selectors.selectRepoContributors);

  // Generate contributor and repository details for contributor
  useEffect(() => {
    function getContributorDetails() {
      const contributorDetail = contributors.find(
        (contributor) => contributor.details.login === contributorLogin
      );
      if (contributorDetail) {
        const repoNames = Object.keys(repoContributors);
        contributorDetail.repos = repoNames
          .filter(function filterRepoNamesByContributorLogin(repo) {
            const repositoryInfo = repoContributors[repo];
            return repositoryInfo.contributorsLogin.includes(contributorLogin);
          })
          .map(function findContributorRepos(filteredRepoNames) {
            return repoContributors[filteredRepoNames].repo;
          });
      }
      setContributorDetails(contributorDetail);
    }

    if (!isEmpty(contributors)) {
      getContributorDetails();
    }
  }, [contributorLogin, contributors, repoContributors]);

  // Generate user details for contributor
  useEffect(() => {
    function getAllContributorUserDetails() {
      const contributorIdentifier = `contributor${contributorDetails.details.id}`;
      const contributorUserDetail = allContributorUserDetails[contributorIdentifier];

      setContributorDetails((details) => ({
        ...details,
        user: contributorUserDetail,
      }));
    }

    if (
      !isEmpty(contributorDetails) &&
      !isEmpty(allContributorUserDetails) &&
      !contributorDetails.user
    ) {
      getAllContributorUserDetails();
    }
  }, [allContributorUserDetails, contributorDetails]);

  return (
    <Layout className="min-h-visibleScreen">
      {contributorDetails ? (
        <>
          {!isEmpty(contributorDetails) ? (
            <ContributorHeaderWrapper className="px-8 py-12 md:grid md:p-10">
              <article className="mb-4 md:mb-0">
                <img
                  src={contributorDetails.details.avatar_url}
                  alt={`${contributorDetails.details.login}'s Github Avatar`}
                />
              </article>
              <article className="pl-0 md:pl-8">
                {contributorDetails.user ? (
                  <>
                    <h1 className="m-0 mb-4 text-4xl">{contributorDetails.user.name}</h1>

                    {contributorDetails.user.bio && <p>Bio: {contributorDetails.user.bio}</p>}

                    <p>Public Gists: {contributorDetails.user.gists.totalCount}</p>

                    <p>Followers: {contributorDetails.user.followers.totalCount}</p>

                    <p>
                      Total Public Repositories: {contributorDetails.user.repositories.totalCount}
                    </p>
                  </>
                ) : (
                  <Loader />
                )}
              </article>
            </ContributorHeaderWrapper>
          ) : (
            <ContributorHeaderPlaceholder className="flex items-center w-full px-8 py-12 md:p-10">
              <ImgLoader className="bg-gray-200 shadow-card" />
              <Loader />
            </ContributorHeaderPlaceholder>
          )}

          <section className="px-8 py-16 bg-blue-100 min-h-listLoader">
            <h2 className="mb-6 text-2xl text-center">Angular Repositories (Contributed to)</h2>
            {!isEmpty(contributorDetails.repos) ? (
              <PaginatedList
                items={contributorDetails.repos}
                resultsPerPage={15}
                ListComponent={RepositoryList}
                type="repositories"
              />
            ) : (
              <RepositoryList repositories={Array(4).fill({})} />
            )}
          </section>
        </>
      ) : (
        <p className="p-8 text-xl">This Contributor was not found</p>
      )}
    </Layout>
  );
}

export default Contributor;
