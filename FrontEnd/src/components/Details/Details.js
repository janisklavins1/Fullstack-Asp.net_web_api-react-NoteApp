import './Details.scss';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { editNote, toggleDetails } from '../../store';
import { useOutsideAlerter } from './useOutsideAlerter';



const mapStateToProps = (state) => {
  return {
    detailsToggle: state.notes.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDetails: (toggle) => dispatch(toggleDetails(toggle)),
    editNote: (id, notesData) => dispatch(editNote(id, notesData)),
  };
};

function Details({note, editNote, toggleDetails}) {
    const { id, title, description, createdDate, type } = note;
    const [titleEdit, setTitleEdit] = useState(title);
    const [descriptionEdit, setDescriptionEdit] = useState(description);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

  useEffect(() => {
  
  }, []);

  function handleEdit(){
    const utc = (new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");

    const noteObj = {
      title: titleEdit,
      description: descriptionEdit,
      createdDate: utc,
      typeId: type.id,
    };
    
    editNote(id, noteObj);
  }

  return (
    <>
      <div className="Background"></div>
      <form
        className="Details"
        onSubmit={(e) => e.preventDefault()}
        ref={wrapperRef}
        onChange={(e) => handleEdit()}
      >
        <div className="Details-Title">
          <input
            value={titleEdit}
            onChange={(e) => setTitleEdit(e.target.value)}
          />
        </div>
        <div className="Details-Description">
          <textarea
            value={descriptionEdit}
            onChange={(e) => setDescriptionEdit(e.target.value)}
          /> 
        </div>

        <div className="Details-Created">Edited: {createdDate}</div>

        <div className="Details-Fotter">
          <div className="Details-Fotter-Type">{type.name}</div>
          <button
            type="button"
            className="Details-Button"
            onClick={(e) => {
              toggleDetails(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
