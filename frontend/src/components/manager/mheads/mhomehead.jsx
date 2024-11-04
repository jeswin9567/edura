import React from 'react';
import { useNavigate } from 'react-router-dom';
import ManProfileBtn from '../button/mprofile';
import PriceBtn from '../button/pricebtn';
import FeedBackBtn from '../button/Feedback';
// import MServiceButton from '../button/mservice';
import '../../common/head.css'; // Ensure this file contains the header-specific styles

function ManHomHeader({ scrollToAbout, scrollToServices, scrollToContact }) {
    const navigate = useNavigate();

    const logout = () => {
      const token=localStorage.getItem('token');
      if (token){
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  
    return (
    <header className="uhome-header">
      <div className="uhome-logo">
        <img src="/images/mainl.png" alt="main" className="uhome-small_logo" />
      </div>
      <nav className="uhome-nav">
        <button className="uhome-homb">Home</button>
        <button className="uhome-aboutb" onClick={scrollToAbout}>About</button>
        <button className="uhome-serb" onClick={scrollToServices}>Services</button>
        <PriceBtn />
        <FeedBackBtn />
        <button className="uhome-contb" onClick={scrollToContact}>Contact Us</button>
        <ManProfileBtn />
      </nav>

      <div className="uhome-auth-buttons">
        <button className="uhome-login-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default ManHomHeader;
