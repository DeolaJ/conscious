import { Octokit } from '@octokit/core';
import { graphql } from '@octokit/graphql';

export const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});
