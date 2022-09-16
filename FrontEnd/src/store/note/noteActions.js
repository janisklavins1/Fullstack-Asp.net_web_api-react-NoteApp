import axios from 'axios';
import {
  FETCH_NOTE_FAILURE,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_REQUEST,
  SAVE_NOTE,
  DELETE_NOTE,
  TOGGLE_DETAILS_ON,
  TOGGLE_DETAILS_OFF,
  TOGGLE_DETAILS
} from './noteTypes';
import { API_ADDRESS } from '../../App.config';

export const fetchNotesRequest = () => {
  return {
    type: FETCH_NOTE_REQUEST,
  };
};

export const fetchNotesSuccess = (notes) => {
  return {
    type: FETCH_NOTE_SUCCESS,
    payload: notes,
  };
};

export const fetchNotesFailure = (error) => {
  return {
    type: FETCH_NOTE_FAILURE,
    payload: error,
  };
};

export const deleteNoteRequest = (id) => {
  return {
    type: DELETE_NOTE,
    payload: id,
  };
};

export const toggleDetailsOn = () => {
  return {
    type: TOGGLE_DETAILS_ON,
  };
};

export const toggleDetailsOff = () => {
  return {
    type: TOGGLE_DETAILS_OFF,
  };
};

export const toggleDetails = (toggle) => {
  return {
    type: TOGGLE_DETAILS,
    payload: toggle
  };
};

//  Dispatcher
export const fetchNotes = () => {
  return (dispatch) => {
    dispatch(fetchNotesRequest);

    axios
      .get(API_ADDRESS)
      .then((response) => {
        const notes = response.data;

        dispatch(fetchNotesSuccess(notes));
      })
      .catch((error) => {
        dispatch(fetchNotesFailure(error.message));
      });
  };
};

export const saveNote = (note) => {
  return (dispatch) => {
    console.log(note);
    axios
      .post(API_ADDRESS, note)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const deleteNote = (id, notes) => {
  return (dispatch) => {
    axios
      .delete(API_ADDRESS + `/${id}`)
      .then((response) => {

        const noteObj = notes.filter(function (note) {
          return note.id !== id;
        });

        dispatch(fetchNotesSuccess(noteObj))
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const editNote = (id, note) => {
  return (dispatch) => {
    axios
      .put(API_ADDRESS + `/${id}`, note)
      .then((response) => {

        // const noteObj1 = notes.forEach((n, index) => {
        //   if(n.id == id) {
        //     notes[index] = {...n, title: note.title, description: note.description, createdDate: note.createdDate}
        //   }
        // });
        //console.log(noteObj)

        // dispatch(fetchNotesSuccess(noteObj1))
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};