import React from 'react';
import { useNavigate } from 'react-router-dom';


function UHead({ scrollToAbout, scrollToServices, scrollToContact }) {
    const navigate = useNavigate();
  
    return (
    <header className="uhome-header">
      <div className="uhome-logo">
        <img src="/images/mainl.png" alt="main" className="uhome-small_logo" />
      </div>
      <nav className="uhome-nav">
        <button className="uhome-homb">Home</button>
        <button className="uhome-aboutb" onClick={scrollToAbout}>About</button>
        <button className="uhome-serb" onClick={scrollToServices}>Services</button>
        <button className="uhome-contb" onClick={scrollToContact}>Contact Us</button>
      </nav>
      <div className="uhome-auth-buttons">
        <button className="uhome-login-btn" onClick={()=> navigate('/')}>Logout</button>
      </div>
    </header>
  );
}

export default UHead;
