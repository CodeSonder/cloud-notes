import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router';
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import NoteCreate from './components/NoteCreate'
import './App.css';
import Note from './components/Note'
import Home from './components/Home'
import {
   readAllNotes,
   updateNote,
   destroyNote,
  createNote,
  loginUser,
  registerUser
  
} from './services/api-helper'


class App extends Component {

  state = {
    notes: [],

    noteForm: {
      comment: "",
      user_id: ""
    },
    currentUser: null,
    authFormData: {
      username: "",
      email: "",
      password: ""
    }
  }

  async componentDidMount() {

     const checkUser =  await localStorage.getItem("jwt");
     
     const user = decode(checkUser);
     if(checkUser){
       this.setState({
         
         currentUser: user, 
         noteForm: {
           user_id: user.id
          }
          
          
        })
         this.getNotes()



    }



    
  }


  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  handleLogin = async () => {
    const userData = await loginUser(this.state.authFormData);
    // console.log(decode(userData.token))

    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem("jwt", userData.token)
    this.props.history.push('/dashboard')
    window.location.reload();
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout = async () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })

    this.props.history.push('/')
  }

  authHandleChange = async (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  handleFormChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      noteForm: {
        ...prevState.noteForm,
        [name]: value
      }
    }))
  }

  newNote = async (e) => {
    e.preventDefault()
    const note = await createNote(this.state.noteForm)

    this.setState(prevState => ({
      notes: [...prevState.notes, note],
      noteForm: {
        comment: "",
        user_id: ""
      }
    }))
    window.location.reload();
  }

  getNotes = async () => {

    const notes = await readAllNotes()

    console.log(notes)

    this.setState({ 
      notes
    })


  }

  editNote = async () => {
    const { noteForm } = this.state
    await updateNote(noteForm.id, noteForm)
    this.setState(prevState => ({
      notes: prevState.notes.map(note => note.id === noteForm.id ? noteForm : note)
    }))
  }
  deleteNote = async (id) => {
    await destroyNote(id)
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  mountEditForm = async (id) => {
    const notes = await readAllNotes()
   const note = notes.find(el => el.id === parseInt(id))
   this.setState({
     notes,
     noteForm: note
   })
 }

  render() {
    const written = this.state.notes.map((note) => {
      return <Link  to={`/notes/${note.id}`}>
        <div className='notes-list'>
        <hr/>
        
      {note.comment}
      <hr/>
     
      </div>
      </Link>
    })

    

    return (
      <div className='App'>
        <header className='header-container'>
          {/* <Link to='/dashboard'>dashboard</Link> */}
          <h1><Link className='home-link' to='/' onClick={() => this.setState({
            noteForm: {
              comment: "",
              user_id: ""
            }
          })}>Home</Link></h1>
          <div>
            {this.state.currentUser
              ?
              <>
                <div>
                  <h1 className='dashboard-container'><Link className='dashboard-link' to='/dashboard'>Dashboard</Link></h1>
                  <p  className='username'>{this.state.currentUser.username}</p>
                  <button className='logout-button' onClick={this.handleLogout}>Logout</button>
                  <br />
                </div>
              </>
              :


              <button className='login-register' onClick={this.handleLoginButton}>Login / Register</button>


            }
          </div>
        </header>
        <Switch>

          <Route exact path="/login" render={() => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData} />)} />
          <Route exact path="/register" render={() => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.authHandleChange}
              formData={this.state.authFormData} />)} />

          <Route exact path='/dashboard'>
            {written}
          {
            <NoteCreate
            handleFormChange={this.handleFormChange}
            noteForm={this.state.noteForm}
            newNote={this.newNote} />}
          </Route>

          <Route
            // /reviews/:id
            path="/notes/:id"
            render={(props) => {

              const { id } = props.match.params;
              const note = this.state.notes.find(el => el.id === parseInt(id));
              return <Note
                id={id}
                note={note}
                handleFormChange={this.handleFormChange}
                mountEditForm={this.mountEditForm}
                editNote={this.editNote}
                noteForm={this.state.noteForm}
                deleteNote={this.deleteNote} />
            }}
            />

            <Route exact path='/'>
            <Home/>
            </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
