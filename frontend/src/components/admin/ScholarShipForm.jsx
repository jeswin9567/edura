import React, { useState } from 'react';
import './ScholarShipForm.css';
import axios from 'axios';
import Header from './headd';
import Footer from '../common/footer';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../function/useAuth';

const ScholarshipForm = () => {
  useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    award: '',
    eligibility: '',
    document: '',
    startdate: '',
    enddate: '',
    link: '',
    howToApply: '',
    gender: '' // Add gender to the formData
  });

  const [selectedSubOptions, setSelectedSubOptions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEligibilityChange = (e) => {
    const eligibility = e.target.value;
    setFormData({ ...formData, eligibility });
    setSelectedSubOptions([]); // Reset the sub-options when eligibility changes
  };

  const handleSubOptionChange = (option) => {
    setSelectedSubOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const formDataWithOptions = {
        ...formData,
        subEligibility: selectedSubOptions, // Add selected sub-options to form data
      };
      const response = await axios.post('http://localhost:5000/schship', formDataWithOptions); // Update the endpoint to match your backend
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
        howToApply: '',
        gender: '' // Reset gender
      });
      setSelectedSubOptions([]);

      navigate('/admin/scholar');
    } catch (error) {
      console.error(error);
      alert('Error submitting scholarship: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const renderSubOptions = () => {
    switch (formData.eligibility) {
      case 'School':
        return (
          <>
            <label>Select Classes:</label>
            <div className="checkbox-group">
              {['4', '5', '6', '7', '8', '9', '10', '11', '12'].map((std) => (
                <label key={std}>
                  <input
                    type="checkbox"
                    value={std}
                    checked={selectedSubOptions.includes(std)}
                    onChange={() => handleSubOptionChange(std)}
                  />
                  {`Class ${std}`}
                </label>
              ))}
            </div>
          </>
        );
      case 'Undergraduate':
        return (
          <>
            <label>Select Undergraduate Degrees:</label>
            <div className="checkbox-group">
              {['B.Sc', 'B.Com', 'B.A', 'B.Tech', 'B.E', 'BBA'].map((degree) => (
                <label key={degree}>
                  <input
                    type="checkbox"
                    value={degree}
                    checked={selectedSubOptions.includes(degree)}
                    onChange={() => handleSubOptionChange(degree)}
                  />
                  {degree}
                </label>
              ))}
            </div>
          </>
        );
      case 'Postgraduate':
        return (
          <>
            <label>Select Postgraduate Degrees:</label>
            <div className="checkbox-group">
              {['M.Sc', 'M.Com', 'M.A', 'MBA', 'M.Tech', 'M.E'].map((pgDegree) => (
                <label key={pgDegree}>
                  <input
                    type="checkbox"
                    value={pgDegree}
                    checked={selectedSubOptions.includes(pgDegree)}
                    onChange={() => handleSubOptionChange(pgDegree)}
                  />
                  {pgDegree}
                </label>
              ))}
            </div>
          </>
        );
      case 'Diploma':
        return (
          <>
            <label>Select Diploma Courses:</label>
            <div className="checkbox-group">
              {['Mechanical', 'Civil', 'Electrical', 'Computer Science', 'Electronics'].map((diploma) => (
                <label key={diploma}>
                  <input
                    type="checkbox"
                    value={diploma}
                    checked={selectedSubOptions.includes(diploma)}
                    onChange={() => handleSubOptionChange(diploma)}
                  />
                  {diploma}
                </label>
              ))}
            </div>
          </>
        );
      default:
        return null;
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
              type="number" // Change to 'number' input type
              name="award"
              value={formData.award}
              onChange={handleChange}
              min="0" // Ensure the number is not negative
              required
            />
          </div>
          <div>
            <label>Eligibility:</label>
            <select name="eligibility" value={formData.eligibility} onChange={handleEligibilityChange} required>
              <option value="">Select an option</option>
              <option value="School">School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Diploma">Diploma</option>
            </select>
          </div>

          {renderSubOptions()}

          <div>
            <label>Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
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

export default ScholarshipForm;
