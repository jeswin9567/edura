import React, { useState } from 'react';
import './addscho.css'
import axios from 'axios';
import Header from '../../../components/manager/head';
import Footer from '../../../components/common/footer';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../function/useAuth';

const MScholarshipForm = () => {
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
    gender: '',
    category: [],
    subEligibility: [], 
    states: '', 
    awardDuration: '', // New field for Monthly/Yearly
    annualIncome: '',
    marks: ''
  });

  const [availableSubOptions, setAvailableSubOptions] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const statesOptions = ['All India', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEligibilityChange = (e) => {
    const eligibility = e.target.value;
    setFormData({ ...formData, eligibility });
    switch (eligibility) {
      case 'School':
        setAvailableSubOptions(['4', '5', '6', '7', '8', '9', '10', '11', '12']);
        break;
      case 'Undergraduate':
        setAvailableSubOptions(['B.Sc', 'B.Com', 'B.A', 'B.Tech', 'BBA', 'Other']);
        break;
      case 'Postgraduate':
        setAvailableSubOptions(['M.Sc', 'M.Com', 'M.A', 'MBA', 'M.Tech', 'Other']);
        break;
      case 'Diploma':
        setAvailableSubOptions(['Mechanical', 'Civil', 'Electrical', 'Computer Science', 'Electronics']);
        break;
      default:
        setAvailableSubOptions([]);
    }
  };

  const handleSubOptionChange = (option) => {
    setFormData((prevData) => {
      const updatedSubEligibility = prevData.subEligibility.includes(option)
        ? prevData.subEligibility.filter((item) => item !== option)
        : [...prevData.subEligibility, option];

      return { ...prevData, subEligibility: updatedSubEligibility };
    });
  };

  const handleCategoryChange = (option) => {
    setFormData((prevData) => {
      const updatedCategories = prevData.category.includes(option)
        ? prevData.category.filter((item) => item !== option)
        : [...prevData.category, option];

      return { ...prevData, category: updatedCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/schship', formData);
      console.log(response.data);
      alert('Scholarship submitted successfully');

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
        gender: '',
        category: [],
        subEligibility: [],
        states: '',
        awardDuration: '', // Reset the award duration
        annualIncome: '',
        marks: ''
      });

      navigate('/manager/scholarship');
    } catch (error) {
      console.error(error);
      alert('Error submitting scholarship: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="managerschoad-form-container">
        <h2>Submit a Scholarship</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <label>States:</label>
            <select name="states" value={formData.states} onChange={handleChange} required>
              <option value="">Select State</option>
              {statesOptions.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Award:</label>
            <input type="number" name="award" value={formData.award} onChange={handleChange} min="0" required />
          </div>

          {/* New Monthly/Yearly dropdown */}
          <div>
            <label>Award Duration:</label>
            <select name="awardDuration" value={formData.awardDuration} onChange={handleChange} required>
              <option value="">Select Duration</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
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

          {availableSubOptions.length > 0 && (
            <div>
              <label>Select Sub-Options:</label>
              <div className="managerschoad-checkbox-group">
                {availableSubOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.subEligibility.includes(option)}
                      onChange={() => handleSubOptionChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label>Minimum Marks:</label>
            <input type="number" name="marks" value={formData.marks} onChange={handleChange} min="0" required />
          </div>

          <div>
            <label>Gender:</label>
            <div>
              <label>
                <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                Female
              </label>
              <label>
                <input type="radio" name="gender" value="Common" checked={formData.gender === 'Common'} onChange={handleChange} />
                Common
              </label>
              <label>
                <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} />
                Other
              </label>
            </div>
          </div>

          <div>
            <label>Category:</label>
            {['General', 'Scheduled Castes', 'Scheduled Tribes', 'OBC'].map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  value={category}
                  checked={formData.category.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>

          <div>
            <label>Documents Required:</label>
            <textarea type="text" name="document" value={formData.document} onChange={handleChange} required />
          </div>

          <div>
            <label>Maximum Annual Income:</label>
            <input type="number" name="annualIncome" value={formData.annualIncome} onChange={handleChange} min="0" required />
          </div>

          <div>
            <label>Start Date:</label>
            <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} required />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" name="enddate" value={formData.enddate} onChange={handleChange} required />
          </div>

          <div>
            <label>Link:</label>
            <input type="url" name="link" value={formData.link} onChange={handleChange} required />
          </div>

          <div>
            <label>How to Apply:</label>
            <textarea type="text" name="howToApply" value={formData.howToApply} onChange={handleChange} required />
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
