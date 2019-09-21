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

// export const verifyUser = async () => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//         api.defaults.headers.common.authorization = `Bearer ${token}`
//         const resp = await api.get('/users/verify');
//         return resp.data
//     }
//     return false;
// }