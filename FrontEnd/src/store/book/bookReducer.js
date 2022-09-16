import { FETCH_DATA_SUCCESS, SAVE_DATA, FETCH_DATA_REQUEST } from './bookTypes';

const initialState = {
  books: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
      };
    case FETCH_DATA_SUCCESS:
      return {
        books: action.payload,
      };
    case SAVE_DATA:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default bookReducer;
