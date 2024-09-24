import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddEntrace from '../abutton/Entrance_btn';

import './ehead.css';

function EHeader({ scrollToContact }) {
  const navigate = useNavigate();

  return (
    <header className="EH-header">
      <div className="EH-logo-container">
        <img src="/images/mainl.png" alt="main" className="EH-logo-image" />
      </div>
      <nav className="EH-nav-container">
        <button className="EH-nav-home-btn" onClick={() => navigate('/adhome')}>Home</button>
        <AddEntrace />
        <button className="EH-nav-contact-btn" onClick={scrollToContact}>Contact Us</button>
      </nav>
      <div className="EH-search-container">
        <input
          type="text"
          placeholder="Search..."
          className="EH-search-input"
        />
        <button className="EH-search-btn">Search</button>
      </div>
      <div className="EH-auth-container">
        <button className="EH-logout-btn" onClick={() => navigate('/')}>Logout</button>
      </div>
    </header>
  );
}

export default EHeader;
