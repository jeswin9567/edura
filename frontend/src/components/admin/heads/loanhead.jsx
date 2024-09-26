import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddLoan from '../abutton/Loan_btn';

import './lhead.css';

function LHeader({ scrollToContact }) {
  const navigate = useNavigate();
  
  const logout = () => {
    const token=localStorage.getItem('token');
    if (token){
      localStorage.removeItem('token');
      navigate('/');
    }
  }

  return (
    <header className="LH-header">
      <div className="LH-logo-container">
        <img src="/images/mainl.png" alt="main" className="LH-logo-image" />
      </div>
      <nav className="LH-nav-container">
        <button className="LH-nav-home-btn" onClick={() => navigate('/adhome')}>Home</button>
        <AddLoan />
        <button className="LH-nav-contact-btn" onClick={scrollToContact}>Contact Us</button>
      </nav>
      <div className="LH-search-container">
        <input
          type="text"
          placeholder="Search..."
          className="LH-search-input"
        />
        <button className="LH-search-btn">Search</button>
      </div>
      <div className="LH-auth-container">
        <button className="LH-logout-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default LHeader;
