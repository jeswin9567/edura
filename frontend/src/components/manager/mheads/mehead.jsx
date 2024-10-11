import React from 'react';
import { useNavigate } from 'react-router-dom';
import MAddentr from '../button/maddent';
import MServiceButton from '../button/mservice';

import '../../admin/heads/ehead.css'

function MEHeader({ scrollToContact }) {
  const navigate = useNavigate();

  const logout = () => {
    const token=localStorage.getItem('token');
    if (token){
      localStorage.removeItem('token');
      navigate('/');
    }
  }
  
  return (
    <header className="EH-header">
      <div className="EH-logo-container">
        <img src="/images/mainl.png" alt="main" className="EH-logo-image" />
      </div>
      <nav className="EH-nav-container">
        <button className="EH-nav-home-btn" onClick={() => navigate('/mhome')}>Home</button>
        <MAddentr />
        <MServiceButton />
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
        <button className="EH-logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default MEHeader;
