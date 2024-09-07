import React from 'react';
import './login.css';

function Login() {
  return (
    <div className="container">
      <div className="left-page">
        <img src="/images/girl1.jpg" alt="Girl " className="gl" />
        <h1 className="welcome-text">
          Empowering students with knowledge, guiding them to their brightest future.
        </h1>
        <img src="/images/mainl.png" alt="logo" className="mainlogo" />
      </div>
      <div className="right-page">
        <img src="/images/logo 3.png" alt="smalllogo" className="smalllogo" />
        <h1 className='login_text'>LOGIN</h1>
        <input type='text' className='un' placeholder='username/email'/>
        <input type='password' className='pass' placeholder='password'/>
        <a href ="" className='fp'>forget password</a>
        <button className='lb'>Login</button>
        <p className='not'>Not registered yet
          <a href ="" className='regis'>Create an Account</a>
        </p>
      
      </div>
    </div>
  );
}

export default Login;