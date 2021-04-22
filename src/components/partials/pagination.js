import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import RightChevron from '../../assets/images/chevron-right.svg';
import LeftChevron from '../../assets/images/chevron-left.svg';

const PaginationButton = styled.button`
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Pagination = ({ items, currentPage, resultsPerPage, changeResultPage }) => {
  const parts = Math.ceil(items.length / resultsPerPage);

  return (
    <div className="flex items-center justify-end w-full my-10">
      {currentPage !== 1 && (
        <PaginationButton
          onClick={() => changeResultPage(1)}
          disabled={currentPage === 1}
          className="flex p-3 bg-transparent shadow-none cursor-pointer hover:bg-gray-200">
          <img src={LeftChevron} alt="button icon" className="block w-3 h-3 -mr-1" />
          <img src={LeftChevron} alt="button icon" className="block w-3 h-3" />
        </PaginationButton>
      )}

      <PaginationButton
        onClick={() => currentPage > 1 && changeResultPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 bg-transparent shadow-none cursor-pointer hover:bg-gray-200">
        <img src={LeftChevron} alt="button icon" className="block w-4 h-4" />
      </PaginationButton>

      <div className="flex mx-4">
        <p className="mr-2">{currentPage}</p>
        <p className="total">of {parts}</p>
      </div>

      <PaginationButton
        onClick={() => currentPage < parts && changeResultPage(currentPage + 1)}
        disabled={currentPage === parts}
        className="p-3 bg-transparent shadow-none cursor-pointer hover:bg-gray-200">
        <img src={RightChevron} alt="button icon" className="block w-4 h-4" />
      </PaginationButton>

      {currentPage !== parts && (
        <PaginationButton
          onClick={() => changeResultPage(parts)}
          disabled={currentPage === parts}
          className="flex p-3 bg-transparent shadow-none cursor-pointer hover:bg-gray-200">
          <img src={RightChevron} alt="button icon" className="block w-3 h-3" />
          <img src={RightChevron} alt="button icon" className="block w-3 h-3 -ml-1" />
        </PaginationButton>
      )}
    </div>
  );
};

Pagination.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  changeResultPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
