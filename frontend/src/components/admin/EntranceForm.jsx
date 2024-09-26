import React, { useState } from 'react';
import axios from 'axios';
import './EntranceForm.css'
import Header from './headd';
import Footer from '../common/footer';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../function/useAuth';

const EntranceForm = () => {

  useAuth();


  const [formData, setFormData] = useState({
    name: '',
    details: '',
    eligibility: '',  
    syllabus: '',
    startdate: '',
    enddate: '',
    howtoapply: '',
    links: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateDates = () => {
    const { startdate, enddate } = formData;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Add one day to today's date

    // Validate enddate is at least +1 day from today and is after startdate
    if (new Date(enddate) <= tomorrow) {
      setError('End date must be at least 1 day from today.');
      return false;
    }

    if (new Date(enddate) <= new Date(startdate)) {
      setError('End date must be after the start date.');
      return false;
    }

    setError(''); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate dates before submission
    if (!validateDates()) {
      return; // Do not submit if validation fails
    }
  
    setLoading(true); // Show loading indicator
    setError(''); // Clear any previous errors
  
    try {
      // Make POST request to backend
      const response = await axios.post('http://localhost:5000/entrnc', formData);
      console.log(response.data); // Debug the response
  
      alert('Entrance details entered successfully'); // Show success alert
      
      // Reset form fields on successful submission
      setFormData({
        name: '',
        details: '',
        eligibility: '',
        syllabus: '',
        startdate: '',
        enddate: '',
        howtoapply: '',
        links: ''
      });
  
      // Navigate to another page after success
      navigate('/admin/entrance');
    } catch (error) {
      console.error('Error submitting the form:', error); // Debug error
  
      // Check if there's a backend error response
      if (error.response) {
        console.log('Backend error response:', error.response); // Debug response
        // Alert with backend message
        alert(`Error: ${error.response.data.message || 'Something went wrong.'}`);
        setError(error.response.data.message || 'Something went wrong.');
      } else if (error.request) {
        // No response from server (Network issue or server down)
        console.log('Request made but no response received:', error.request); // Debug request
        alert('No response from server. Please try again later.');
        setError('No response from server. Please try again later.');
      } else {
        // Any other errors
        console.log('Other error:', error.message); // Debug message
        alert('Error: ' + error.message);
        setError('Error: ' + error.message);
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };
  
  

  return (
    <>
    < Header />
    <div className="entrance-form-container">
      <h2>Submit an Entrance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Details:</label>
          <textarea
            type="text"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Eligibility:</label>
          <textarea
            type="text"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Syllabus:</label>
          <textarea
            type="text"
            name="syllabus"
            value={formData.syllabus}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startdate"
            value={formData.startdate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="enddate"
            value={formData.enddate}
            onChange={handleChange}
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div>
          <label>How to Apply:</label>
          <textarea
            type="text"
            name="howtoapply"
            value={formData.howtoapply}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Links:</label>
          <input
            type="text"
            name="links"
            value={formData.links}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default EntranceForm;
