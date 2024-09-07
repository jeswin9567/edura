import React from "react";
import './signup.css'

function SignUp(){
    return(
        <div className="container">
      <div className="left-page">
        <img src="/images/girl1.jpg" alt="Girl" className="gl1" />
        <h1 className="wel">
          Empowering students with knowledge, guiding them to their brightest future.
        </h1>
        <img src="/images/mainl.png" alt="logo" className="mainl" />
      </div>
      <div className="right-page">
         <img src="/images/logo 3.png" alt="smlg" className="smalllogo" />
        <h1 className='crac'>CREATE ACCOUNT</h1>
        <input type='text' className='fn' placeholder='FullName'/>
        <input type='text' className='el' placeholder='email'/>
        <input type='text' className='phn' placeholder="phone" />
        <input type ='password' className='psw' placeholder="password" />
        <input type ='password' className='cnfp' placeholder="confirm password" />
        <button className='signbut'>Sign Up</button>

      
      </div>
    </div>
    );
}

export default SignUp