import React, { useState } from "react";
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  let timeout; // Declare timeout variable

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      Swal.fire("Full name is required", "", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      Swal.fire("Email is required", "", "error");
      return false;
    } else if (!emailRegex.test(email)) {
      Swal.fire("Invalid email format", "", "error");
      return false;
    }

    const phoneRegex = /^\+(\d{1,3})?[\s.-]?(\d{10,15})$/;
    const invalidSequences = [
      "0123456789",
      "1234567890",
      "9876543210",
      "0987654321"
    ];
    
    if (!phone) {
      Swal.fire("Phone number is required", "", "error");
      return false;
    } else if (!phoneRegex.test(phone)) {
      Swal.fire("Invalid phone number. Ensure it starts with a country code", "", "error");
      return false;
    } else {
      const cleanedPhone = phone.replace(/[\s.-]/g, '').replace(/^\+(\d{1,3})/, ''); // Removes separators and country code
      if (/^(\d)\1+$/.test(cleanedPhone)) {
        Swal.fire("Invalid phone number.", "", "error");
        return false;
      } else if (invalidSequences.includes(cleanedPhone)) {
        Swal.fire("Invalid phone number.", "", "error");
        return false;
      }
    }
    

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      Swal.fire("Password is required", "", "error");
      return false;
    } else if (!passwordRegex.test(password)) {
      Swal.fire("Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.", "", "error");
      return false;
    }

    if (!confirmPassword) {
      Swal.fire("Please confirm your password", "", "error");
      return false;
    } else if (confirmPassword !== password) {
      Swal.fire("Passwords do not match", "", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios.post('http://localhost:5000/sign', { name, email, phone, password, confirmPassword })
      .then(result => {
        Swal.fire("Success!", "OTP sent to your email. Please check your inbox.", "success");
        setIsOtpSent(true);
        showOtpPopup(); // Show OTP input as a popup
      })
      .catch(error => {
        Swal.fire("Error", error.response?.data?.message || "An unexpected error occurred.", "error");
      });
  };

  const showOtpPopup = () => {
    Swal.fire({
      title: 'Verify OTP',
      input: 'text',
      inputLabel: 'Enter the OTP sent to your email',
      inputPlaceholder: 'OTP',
      showCancelButton: true,
      confirmButtonText: 'Verify',
      cancelButtonText: 'Cancel',
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage('Please enter the OTP');
          return false;
        }
        return value;
      }
    }).then((result) => {
      clearTimeout(timeout); // Clear the timeout on user action
      if (result.isConfirmed) {
        handleOtpSubmit(result.value); // Pass OTP to handleOtpSubmit
      }
    });

    // Set a timeout to show "Time's up!" message after 30 seconds
    timeout = setTimeout(() => {
      Swal.close(); // Close the popup
      Swal.fire("Time's up!", "The OTP verification window has closed.", "info");
    }, 30000); // 30 seconds
  };

  const handleOtpSubmit = (otp) => {
    axios.post('http://localhost:5000/sign/verify-otp', { email, otp })
      .then(result => {
        Swal.fire("Success!", "Your account has been created successfully.", "success");
        navigate('/login');
      })
      .catch(error => {
        Swal.fire("Error", error.response?.data?.message || "Invalid OTP", "error");
      });
  };

  return (
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

        {/* Form submission */}
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            name='name' 
            className='fn' 
            placeholder='Full Name' 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type='email' 
            name='email' 
            className='el' 
            placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type='text' 
            name='phone' 
            className='phn' 
            placeholder='Phone' 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
          <input 
            type='password' 
            name='password' 
            className='psw' 
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <input 
            type='password' 
            name='confirmPassword' 
            className='cnfp' 
            placeholder='Confirm Password' 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <button type="submit" className='signbut'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
