import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

function VHeader({ scrollToContact }) {
  const navigate = useNavigate();

  return (
    <header className="uhome-header">
      <div className="uhome-logo">
        <img src="/images/mainl.png" alt="main" className="uhome-small_logo" />
      </div>
      <nav className="uhome-nav">
        <button className="uhome-homb" onClick={() => navigate('/userhome')}>Home</button>
        <button className="uhome-contb" onClick={scrollToContact}>Contact Us</button>
      </nav>
      <div className="uhome-auth-buttons">
        <button className="uhome-login-btn" onClick={() => navigate('/')}>Logout</button>
      </div>
    </header>
  );
}

export default VHeader;
