import React, { Component } from 'react';
import NoteEdit from './NoteEdit'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { note } = this.props;
    return (
      <div className="note-page">
        {note === undefined ? <h2>Loading . . .</h2> : (
          <div>

            <hr />

            <p className='comment'>{note.comment}</p>

            <hr />

            {this.state.isEdit ?
              <Route path={`/notes/:id/edit`} render={() => (
                <NoteEdit
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editNote();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/notes/${this.props.noteForm.id}`)
                  }}
                  noteForm={this.props.noteForm} />
              )} />
              :
              <>
                <button className='edit-button' onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`/notes/${note.id}/edit`)
                }}>Edit</button>
                <button className='delete-button' onClick={() => {
                  this.props.deleteNote(note.id);
                  this.props.history.push('/dashboard')
                }}>Delete</button>
              </>
            }
          </div>)}
      </div>)
  }
}

export default withRouter(Note);