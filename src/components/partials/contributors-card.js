import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Button from './button';

const ContributorsCard = ({ contributor }) => {
  const history = useHistory();

  const refPlaceholder = useRef();
  const refContentPlaceholder = useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
    refContentPlaceholder.current.remove();
  };

  const viewContributorDetails = (contributorLogin) => {
    history.push(`/contributor/${contributorLogin}`);
  };

  return (
    <li className="relative w-full rounded-lg shadow-lg h-grid md:h-gridMd lg:h-gridLg hover:shadow-sm">
      <div
        className="absolute top-0 left-0 w-full h-full bg-gray-100 rounded-lg shadow-card"
        ref={refPlaceholder}
      />

      <div className="absolute z-10 px-3 py-5 bottom-4 left-4" ref={refContentPlaceholder}>
        <div className="w-2/4 h-3 mb-3 bg-gray-200" />
      </div>

      {contributor.id && (
        <>
          <LazyLoad offset={400}>
            <img
              className="absolute top-0 left-0 block object-cover w-full rounded-lg shadow-card"
              onLoad={removePlaceholder}
              onError={removePlaceholder}
              src={contributor.avatar_url}
              alt={`${contributor.login}'s Github Avatar`}
            />
          </LazyLoad>

          <div className="absolute bottom-0 left-0 flex items-end w-full h-full bg-gray-800 rounded-lg z-5 bg-opacity-40 hover:bg-opacity-60">
            <h4 className="mb-2 ml-4 text-base font-medium text-white">@{contributor.login}</h4>
            {/* <h4 className="mb-1 text-lg font-medium text-gray-800">{contributor.user.name}</h4>
            {contributor.user.bio && (
              <p className="m-0 text-sm text-gray-700">{contributor.user.bio}</p>
            )} */}
          </div>

          <Button
            className="absolute top-0 left-0 z-20 w-full h-full rounded-lg hover:bg-gray-800 hover:bg-opacity-40"
            onClick={() => viewContributorDetails(contributor.login)}
            type="text"
          />
        </>
      )}
    </li>
  );
};

ContributorsCard.defaultProps = {
  contributor: {},
};

ContributorsCard.propTypes = {
  contributor: PropTypes.objectOf(PropTypes.any),
};

export default ContributorsCard;
