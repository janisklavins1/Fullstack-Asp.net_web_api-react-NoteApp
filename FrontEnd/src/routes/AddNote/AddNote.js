import './AddNote.scss';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { saveNote } from '../../store';
import { useNavigate  } from "react-router-dom";


const mapStateToProps = (state) => {
  return {
    notesData: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveNoteData: (note) => dispatch(saveNote(note))
  };
};

function AddNote({ saveNoteData }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();


  useEffect(() => {

  }, []);

  function  saveData(){
    const utc = (new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    const noteObj = {
        title: title,
        description: description,
        createdDate: utc,
        typeId: 1
    };

    saveNoteData(noteObj);

    setTitle('');
    setDescription('');
  }

  

  return (
    <div className="Form">
        <button onClick={(e) => navigate("/")}>Back</button>
      <form className='Form-Elements' >
        <div className='Form-Elements-Inner'>
          <label>Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
        </div>
        <div className='Form-Elements-Inner'>
          <label>Description</label>
          <input type="text" onChange={(e) => setDescription(e.target.value)} value={description}/>
        </div>

        <input className='Form-Elements-Button' type="button" value="Submit" onClick={(e) => saveData()}/>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
