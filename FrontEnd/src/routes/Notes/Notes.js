import './Notes.scss';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchNotes, deleteNote, editNote, toggleDetails } from '../../store';
import { useNavigate } from 'react-router-dom';
import Details from '../../components/Details/Details';

const mapStateToProps = (state) => {
  return {
    notesData: state.notes,
    detailsToggle: state.notes.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    deleteNote: (id, notesData) => dispatch(deleteNote(id, notesData)),
    toggleDetails: (toggle) => dispatch(toggleDetails(toggle)),
  };
};

function Notes({ fetchNotes, notesData, deleteNote, detailsToggle, toggleDetails }) {
  const [details, setDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();

  }, [fetchNotes]);

  function handleDeleteNote(id) {
    const { notes } = notesData;

    deleteNote(id, notes);
  }

  // function handleEditNote(id) {
  //   const { notes } = notesData;
  //   const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  //   const noteObj = {
  //     title: titleEdit,
  //     description: descriptionEdit,
  //     createdDate: '2022-09-11T13:41:15.34',
  //     typeId: 1,
  //   };
    
  //   editNote(id, noteObj, notes);
  // }

  // function renderNoteDetails(note) {
  //   if (Object.keys(note).length === 0 || !open) {
  //     return null;
  //   }
  //   const { id, title, description, createdDate, type } = note;
    
  //   if (!titleEdit ) {
  //     setTitleEdit(title);
  //     setDescriptionEdit(description);
  //   }

  //   return (
  //     <div key={id}>
  //       <form className="NoteDetails">
  //         <div>
  //           Title:{' '}
  //           <input
  //             onChange={(e) => setTitleEdit(e.target.value)}
  //             value={titleEdit}
  //           ></input>
  //         </div>
  //         <div>
  //           Description:{' '}
  //           <input
  //             onChange={(e) => setDescriptionEdit(e.target.value)}
  //             value={descriptionEdit}
  //           ></input>
  //         </div>
  //         <div>Date Created: {createdDate}</div>
  //         <div>Type: {type.name}</div>
  //         <button
  //           className="NoteDetails-Button"
  //           onClick={(e) => {
  //             open ? setOpen(false) : setOpen(true);
  //             handleEditNote(id);
  //           }}
  //         >
  //           Close
  //         </button>
  //       </form>
  //     </div>
  //   );
  // }

  function renderNotes(notesObj) {
    const { loading, notes } = notesObj;

    if (loading || Object.keys(notes).length === 0) {
      return null;
    }

    return notes.map((note, index) => renderItems(note, index));
  }

  function renderItems(note, index) {
    const { title, description, createdDate, type } = note;
    const { id } = type;

    return (
      <button
        className="Card-Button"
        onClick={(e) => {
          setDetails(note);
          !detailsToggle  && toggleDetails(true);
        }}
        key={index}
      >
        <div className={`Card ${id === 1 ? 'Text' : 'CheckList'}`}>
          <div>{title}</div>
          <div>{description}</div>
          <button className="Delete" onClick={(e) => handleDeleteNote(note.id)}>
            Delete
          </button>
        </div>
      </button>
    );
  }
 
  return (
    <div className="App" >
      <div className="Add" onClick={(e) => navigate('/add')}>
        Add
      </div>
      {renderNotes(notesData)}
      {detailsToggle ? <Details note={details}/> : null}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
