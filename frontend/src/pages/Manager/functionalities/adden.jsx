import React, { useState } from 'react';
import axios from 'axios';
import '../../../components/admin/EntranceForm.css'
import Header from '../../../components/manager/head';
import Footer from '../../../components/common/footer';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../function/useAuth';

const MEntranceForm = () => {

  useAuth();
  const [formData, setFormData] = useState({
    name: '',              // Name of the Entrance Exam
    details: '',           // Brief details or description of the exam
    eligibility: '',       // Eligibility criteria for the exam
    syllabus: '',          // Syllabus details for the exam
    startdate: '',         // Application start date
    enddate: '',           // Application end date
    howtoapply: '',        // Steps or guidelines on how to apply
    links: ''              // Relevant links for the exam (official website, application form, etc.)
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
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/entrnc', formData);
      console.log(response.data);
      alert('Entrance exam details submitted successfully!');
      
      // Reset form data
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

      navigate('/manager/entrance');
    } catch (error) {
      console.error('Error submitting the form', error);
      alert('Error submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="entrance-form-container">
        <h2>Submit Entrance Exam Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Entrance Exam Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name of the entrance exam"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Exam Details:</label>
            <textarea
              name="details"
              placeholder="Provide a brief description or details about the exam"
              value={formData.details}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Eligibility Criteria:</label>
            <textarea
              name="eligibility"
              placeholder="Enter the eligibility criteria for the exam"
              value={formData.eligibility}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Syllabus:</label>
            <textarea
              name="syllabus"
              placeholder="Provide details about the syllabus of the exam"
              value={formData.syllabus}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Application Start Date:</label>
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Application End Date:</label>
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
            <textarea
              name="howtoapply"
              placeholder="Steps or guidelines on how to apply for the exam"
              value={formData.howtoapply}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Relevant Links:</label>
            <input
              type="text"
              name="links"
              placeholder="Enter any relevant links (e.g., official website, application form)"
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

export default MEntranceForm;
