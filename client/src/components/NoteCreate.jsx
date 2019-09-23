import React from 'react';
import { withRouter } from 'react-router-dom';

function NoteCreate(props) {
  return (
    <div className="create-form" >
      <h2 className='new-note-heading'> New Note:</h2>
      <form onSubmit={props.newNote}>

        <h3 className='create-heading'>Comment:</h3>

        <input
          className='create-input'
          type="text"
          name="comment"
          value={props.noteForm.name}
          onChange={props.handleFormChange} />

          {/* <p>User ID:</p>

          <input

          type="integer"  
          name="user_id"
          value={props.noteForm.name}
          onChange={props.handleFormChange}/> */}

        <br />
        <br />
        
        <button className='create-button'>Submit</button>
      </form>
      
    </div >
  )
}

export default withRouter(NoteCreate);