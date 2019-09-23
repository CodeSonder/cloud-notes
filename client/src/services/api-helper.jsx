import axios from 'axios';
const baseUrl = 'http://localhost:3000'

const api = axios.create({
    baseURL: baseUrl
})

export const loginUser = (loginData) => {
    const opts = {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json'
      }
  
    }
    return fetch(`${baseUrl}/auth/login`, opts)
      .then(resp => resp.json())
  }
  
  export const registerUser = (registerData) => {
    const opts = {
      method: 'POST',
      body: JSON.stringify({ user: registerData }),
      headers: {
        'Content-Type': 'application/json'
      }
    };  
  
    return fetch(`${baseUrl}/users/`, opts)
      .then(resp => resp.json())
  }

  const createNote = (data) => {
    const opts = {
      method: 'POST',
     
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      
    }
    return fetch(`${baseUrl}/notes`, opts)
      .then(resp => resp.json())
  }
  

  const readAllNotes = async () => {
  
  
    const resp = await api.get(`/notes`)
     
    
    return resp.data  
  }

  const updateNote = async (id, data) => {
    const resp = await api.put(`/notes/${id}`, { note: data })
    return resp.data
  }
  
  const destroyNote = async (id) => {
    const resp = await api.delete(`/notes/${id}`)
    return resp.data
  
  }


  export {
    createNote,
     readAllNotes,
    
     updateNote,
     destroyNote
  } 