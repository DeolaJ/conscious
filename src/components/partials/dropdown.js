/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isEqual from 'lodash/isEqual';
import Caret from '../../assets/images/caret.svg';

const DropdownSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1px;
  padding: 0.625rem 1.75rem 0.625rem 1.125rem;
  line-height: 1rem;
  max-width: 9.5rem;
  color: #252525;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${Caret});
  background-repeat: no-repeat;
  background-position-x: calc(100% - 0.625rem);
  background-position-y: 50%;

  :disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

const Dropdown = ({ filterValue, options, setFilterOption, disabled }) => {
  const [dropdownValue, setDropdownValue] = useState(filterValue);
  const localFilterValue = useRef(filterValue);

  const updatePdfDesign = useRef((value) => {
    if (!isEqual(localFilterValue.current, value)) {
      setFilterOption(value);
    }
  });

  useEffect(() => {
    if (!isEqual(filterValue, localFilterValue.current)) {
      localFilterValue.current = filterValue;
      setDropdownValue(localFilterValue.current);
    }
  }, [filterValue]);

  useEffect(() => {
    updatePdfDesign.current(dropdownValue);
  }, [dropdownValue]);

  return (
    <DropdownSelect
      value={dropdownValue}
      className="w-full text-sm bg-transparent cursor-pointer hover:border-black"
      disabled={disabled}
      onChange={(e) => setDropdownValue(e.target.value)}
      onBlur={(e) => setDropdownValue(e.target.value)}>
      {options &&
        options.map((option) => (
          <React.Fragment key={option.key}>
            <option value={option.value}>{option.text}</option>
          </React.Fragment>
        ))}
    </DropdownSelect>
  );
};

Dropdown.propTypes = {
  filterValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFilterOption: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Dropdown;
