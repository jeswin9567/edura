import React, { useState } from 'react';
import '../../../components/admin/StudentLoan.css'
import axios from 'axios';
import Header from '../../../components/manager/head';
import Footer from '../../../components/common/footer';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../function/useAuth';

const fieldOfStudyOptions = [
  'Engineering', 'Medicine', 'Business', 'Law', 'Arts', 'Science', 'Technology'
];

const MStudentLoanForm = () => {
  useAuth();
  const footerRef = useRef(null);
  const [formData, setFormData] = useState({
    loanName: '',
    bankName: '',
    bankWebsite: '',
    contactNumber: '',
    email: '',
    loanType: '',
    fieldOfStudy: [],  // Now an array for multiple selections
    repayment: '',
    minAmount: '',
    maxAmount: '',
    minInterestRate: '',
    maxInterestRate: '',
    collateral: '',
    applicationProcess: '',
    eligibilityCriteria: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'fieldOfStudy') {
      // Handle multiple checkbox selections for fieldOfStudy
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          fieldOfStudy: [...prevData.fieldOfStudy, value]
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          fieldOfStudy: prevData.fieldOfStudy.filter((field) => field !== value)
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/studln', formData);
      console.log(response.data);
      alert('Student loan submitted successfully');
      setFormData({
        loanName: '',
        bankName: '',
        bankWebsite: '',
        contactNumber: '',
        email: '',
        loanType: '',
        fieldOfStudy: [],
        repayment: '',
        minAmount: '',
        maxAmount: '',
        minInterestRate: '',
        maxInterestRate: '',
        collateral: '',
        applicationProcess: '',
        eligibilityCriteria: ''
      });
      navigate('/manager/loan');
    } catch (error) {
      console.error(error);
      alert('Error submitting loan: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header scrollToContact={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div className="formdata">
        <h2>Submit a Student Loan</h2>
        <form onSubmit={handleSubmit}>
          <div className="namefld">
            <label>Loan Name:</label>
            <input
              type="text"
              name="loanName"
              value={formData.loanName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="bankfld">
            <label>Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="bankwebsitefld">
            <label>Bank Website Link:</label>
            <input
              type="url"
              name="bankWebsite"
              value={formData.bankWebsite}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contactfld">
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emailfld">
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loantypefld">
            <label>Type of Loan:</label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
            >
              <option value="">Select Loan Type</option>
              <option value="domestic">Domestic Loan</option>
              <option value="international">International Loan</option>
            </select>
          </div>
          <div className="fieldoffld">
            <label>Field of Study:</label>
            <div className="uplon-checkbox-group">
              {fieldOfStudyOptions.map((field) => (
                <label key={field} className="uplon-checkbox-label">
                  <input
                    type="checkbox"
                    name="fieldOfStudy"
                    value={field}
                    checked={formData.fieldOfStudy.includes(field)}
                    onChange={handleChange}
                  />
                  {field}
                </label>
              ))}
            </div>
          </div>
          <div className="repayment">
            <label>Repayment:</label>
            <input
              type="text"
              name="repayment"
              value={formData.repayment}
              onChange={handleChange}
              required
            />
          </div>
          <div className="amountfld">
            <label>Minimum Amount:</label>
            <input
              type="number"
              name="minAmount"
              value={formData.minAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="amountfld">
            <label>Maximum Amount:</label>
            <input
              type="number"
              name="maxAmount"
              value={formData.maxAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="intrfld">
            <label>Minimum Interest Rate:</label>
            <input
              type="text"
              name="minInterestRate"
              value={formData.minInterestRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="intrfld">
            <label>Maximum Interest Rate:</label>
            <input
              type="text"
              name="maxInterestRate"
              value={formData.maxInterestRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="collateralfld">
            <label>Collateral Required:</label>
            <textarea
              type="text"
              name="collateral"
              value={formData.collateral}
              onChange={handleChange}
            />
          </div>
          <div className="eligibilityfld">
            <label>Eligibility Criteria:</label>
            <textarea
              name="eligibilityCriteria"
              value={formData.eligibilityCriteria}
              onChange={handleChange}
            />
          </div>
          <div className="applyfld">
            <label>Application Process:</label>
            <textarea
              name="applicationProcess"
              value={formData.applicationProcess}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <Footer ref={footerRef} />
    </>
  );
};

export default MStudentLoanForm;
