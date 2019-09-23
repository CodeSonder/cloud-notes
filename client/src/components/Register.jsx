import React from 'react';
import { Link } from 'react-router-dom';

// This component handles our register form
const Register = (props) => {

  return (
    <div className="auth-container">
      <h1 className='register-title'>Register</h1>
      <hr />
      <form onSubmit={props.handleRegister} >
        <h3 className='register-username'>Username:</h3>
        <input className='register-input' name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <h3 className='register-email'>Email:</h3>
        <input className='register-input' name="email" type="text" value={props.formData.email} onChange={props.handleChange} />
        <h3 className='register-password'>Password:</h3>
        <input className='register-input' name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        <button className='register-button'>Register</button>
        <Link className='login-link' to="/login">Login</Link>
      </form>
    </div>
  );
}

export default Register;