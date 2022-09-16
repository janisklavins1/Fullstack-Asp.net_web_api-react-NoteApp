import {
  FETCH_NOTE_FAILURE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_REQUEST,
  TOGGLE_DETAILS_ON,
  TOGGLE_DETAILS_OFF,
  TOGGLE_DETAILS,
} from './noteTypes';

const initialState = {
  loading: false,
  notes: [],
  error: '',
  details: false,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload,
        error: '',
      };
    case FETCH_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        notes: [],
        error: action.error,
      };
    case TOGGLE_DETAILS_ON:
      return {
        ...state,
        details: true,
      };
    case TOGGLE_DETAILS_OFF:
      return {
        ...state,
        details: false,
      };
    case TOGGLE_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
};

export default noteReducer;
