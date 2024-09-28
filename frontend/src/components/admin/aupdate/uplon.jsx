import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VLHeader from '../aviewservicehead/aloanhead';
import './uplon.css';
import useAuth from '../../../../function/useAuth';

const UpdateLoan = () => {
    useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [loan, setLoan] = useState({
        loanName: '',
        bankName: '',
        bankWebsite: '',
        contactNumber: '',
        email: '',
        loanType: '',
        fieldOfStudy: '',
        programLength: '',
        minAmount: '',
        maxAmount: '',
        minInterestRate: '',
        maxInterestRate: '',
        collateral: '',
        applicationProcess: ''
    });

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/viewln/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch loan details');
                }
                const data = await response.json();
                setLoan(data);
            } catch (error) {
                console.error('Error fetching loan details:', error);
            }
        };

        fetchLoanDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoan((prevLoan) => ({ ...prevLoan, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/upln/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loan),
            });

            if (response.ok) {
                alert('Loan updated successfully');
                navigate(`/admin/loan`); // Redirect to the loan list page
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update the loan: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating loan:', error);
            alert('Could not update loan. Please try again later.');
        }
    };  

    return (
        <div>
          <VLHeader />  
        <div className="uplon">
            <h1 className="uplon-title">Update Loan</h1>
            <form onSubmit={handleSubmit} className="uplon-form">
                <label className="uplon-label">
                    Loan Name:
                    <input
                        type="text"
                        name="loanName"
                        value={loan.loanName}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Bank Name:
                    <input
                        type="text"
                        name="bankName"
                        value={loan.bankName}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Bank Website:
                    <input
                        type="url"
                        name="bankWebsite"
                        value={loan.bankWebsite}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Contact Number:
                    <input
                        type="text"
                        name="contactNumber"
                        value={loan.contactNumber}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={loan.email}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Loan Type:
                    <input
                        type="text"
                        name="loanType"
                        value={loan.loanType}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Field of Study:
                    <input
                        type="text"
                        name="fieldOfStudy"
                        value={loan.fieldOfStudy}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Program Length (Years):
                    <input
                        type="number"
                        name="programLength"
                        value={loan.programLength}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Minimum Amount:
                    <input
                        type="number"
                        name="minAmount"
                        value={loan.minAmount}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Maximum Amount:
                    <input
                        type="number"
                        name="maxAmount"
                        value={loan.maxAmount}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Minimum Interest Rate:
                    <input
                        type="text"
                        name="minInterestRate"
                        value={loan.minInterestRate}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Maximum Interest Rate:
                    <input
                        type="text"
                        name="maxInterestRate"
                        value={loan.maxInterestRate}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Collateral Required:
                    <input
                        type="text"
                        name="collateral"
                        value={loan.collateral}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Application Process:
                    <textarea
                        name="applicationProcess"
                        value={loan.applicationProcess}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <button type="submit" className="uplon-button">Update Loan</button>
            </form>
        </div>
        </div>
    );
};

export default UpdateLoan;
