import React, { useState } from 'react';
import '../../../components/common/ScholarShipForm.css';
import axios from 'axios';
import Header from '../../../components/manager/head';
import Footer from '../../../components/common/footer';
import { useNavigate } from 'react-router-dom';



const MScholarshipForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    award: '',
    eligibility: '',
    document: '',
    startdate: '',
    enddate: '',
    link: '',
    howToApply: ''
  });

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post('http://localhost:5000/schship', formData); // Update the endpoint to match your backend
      console.log(response.data);
      alert('Scholarship submitted successfully');

      // Reset form data
      setFormData({
        name: '',
        description: '',
        award: '',
        eligibility: '',
        document: '',
        startdate: '',
        enddate: '',
        link: '',
        howToApply: ''
      });

      navigate('/manager/scholarship');
    } catch (error) {
      console.error(error);
      alert('Error submitting scholarship: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false); // Reset loading state
    }
};


  return (
    <>
      <Header />
      <div className="scholarship-form-container">
        <h2>Submit a Scholarship</h2>
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
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Award:</label>
            <input
              type="text"
              name="award"
              value={formData.award}
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
            <label>Document:</label>
            <textarea
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
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
            <label>Link:</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>How to Apply:</label>
            <textarea
              name="howToApply"
              value={formData.howToApply}
              onChange={handleChange}
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

export default MScholarshipForm;
