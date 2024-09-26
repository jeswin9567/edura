import React from 'react';
import { useNavigate } from 'react-router-dom';
import Addscholar from '../abutton/Scholarship_btn';

import './shead.css';

function SHeader({ scrollToContact }) {
  const navigate = useNavigate();

  const logout = () => {
    const token=localStorage.getItem('token');
    if (token){
      localStorage.removeItem('token');
      navigate('/');
    }
  }

  return (
    <header className="ScH-header">
      <div className="ScH-logo-container">
        <img src="/images/mainl.png" alt="main" className="ScH-logo-image" />
      </div>
      <nav className="ScH-nav-container">
        <button className="ScH-nav-home-btn" onClick={() => navigate('/adhome')}>Home</button>
        <Addscholar />
        <button className="ScH-nav-contact-btn" onClick={scrollToContact}>Contact Us</button>
      </nav>
      <div className="ScH-search-container">
        <input
          type="text"
          placeholder="Search..."
          className="ScH-search-input"
        />
        <button className="ScH-search-btn">Search</button>
      </div>
      <div className="ScH-auth-container">
        <button className="ScH-logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default SHeader;
