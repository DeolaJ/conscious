/* eslint-disable no-undef */
import { SET_FILTER } from './types';

const setFilter = (payload) => ({
  type: SET_FILTER,
  payload,
});

function doSetFilterOption(filterValue) {
  return async (dispatch) => {
    dispatch(
      setFilter({
        filterValue,
      })
    );
  };
}

export default doSetFilterOption;
