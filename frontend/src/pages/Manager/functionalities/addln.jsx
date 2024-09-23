import React, { useState } from 'react';
import '../../../components/admin/StudentLoan.css'
import axios from 'axios';
import Header from '../../../components/manager/head';
import Footer from '../../../components/common/footer';
import { useNavigate } from 'react-router-dom';

const MStudentLoanForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    interest: '',
    repayment: '',
    document: ''
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
      const response = await axios.post('http://localhost:5000/studln', formData);
      console.log(response.data);
      alert('Student loan submitted successfully');

      // Reset form data
      setFormData({
        name: '',
        description: '',
        amount: '',
        interest: '',
        repayment: '',
        document: ''
      });

      navigate('/manager/loan'); // Redirect to the loans page
    } catch (error) {
      console.error(error);
      alert('Error submitting loan: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="formdata">
        <h2>Submit a Student Loan</h2>
        <form onSubmit={handleSubmit}>
          <div className="namefld">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="descfld">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="amntfld">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="intrfld">
            <label>Interest Rate:</label>
            <input
              type="String"
              name="interest"
              value={formData.interestRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="repayfld">
            <label>Repayment Period:</label>
            <input
              type="String"
              name="repayment"
              value={formData.repaymentPeriod}
              onChange={handleChange}
              required
            />
          </div>
          <div className="docufld">
            <label>Document:</label>
            <textarea
              type="text"
              name="document"
              value={formData.document}
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

export default MStudentLoanForm;
