import React from 'react';
import { Link } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const Login = (props) => {

  return (
    <div className="auth-container">
      <h1 className='login-title'>Login</h1>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <h3 className='login-username'>Username:</h3>
        <input className='username-login' name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <h3 className='login-password'>Password:</h3>
        <input className='password-login' name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        <button className='login-button'>Login</button>
        <Link className='register-link' to="/register">Register</Link>
      </form>
    </div>
  );
}

export default Login;