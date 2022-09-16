import axios from 'axios';
import { FETCH_DATA_SUCCESS, SAVE_DATA, FETCH_DATA_REQUEST } from './bookTypes';

export const fetchBooksRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchBooksSuccess = (books) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: books,
  };
};

export const saveBooks = (books) => {
  return {
    type: SAVE_DATA,
    payload: books,
  };
};

//  Dispatcher
export const fetchBooks = () => {
  return (dispatch) => {
    dispatch(fetchBooksRequest);

    axios
      .get('http://127.0.0.1:8000/api/posts')
      .then((response) => {
        const books = response.data;

        dispatch(fetchBooksSuccess(books));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
