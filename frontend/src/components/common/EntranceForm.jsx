import React, { useState } from 'react';
import axios from 'axios';
import './EntranceForm.css'
import Header from '../admin/headd';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

const EntranceForm = () => {
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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // Assuming you have set up a POST route to handle this
      const response = await axios.post('http://localhost:5000/entrnc', formData);
      console.log(response.data);
      alert('Entrance detailed entered');
      // Clear the form or display success message

      //reset form data

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

      navigate('/admin/entrance');
    } catch (error) {
      console.error('Error submitting the form', error);
      alert('Error submitting the form');
    } finally{
        setLoading(false);
    }
  };

  return (
    <>
    < Header />
    <div className="entrance-form-container">
    <h2>Submit a Entrance</h2>
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
        <input
          type="text"
          name="details"
          value={formData.details}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Eligibility:</label>
        <input
          type="text"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Syllabus:</label>
        <input
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
      </div>

      <div>
        <label>How to Apply:</label>
        <input
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

