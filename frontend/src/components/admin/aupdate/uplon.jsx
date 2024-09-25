import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../headd';
import './uplon.css'

const UpdateLoan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loan, setLoan] = useState({
        name: '',
        description: '',
        amount: '',
        interest: '',
        repayment: '',
        document: '',
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
                navigate(`/admin/loan`); // Redirect to the loan details page
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
          <Header />  
        <div className="uplon">
            <h1 className="uplon-title">Update Loan</h1>
            <form onSubmit={handleSubmit} className="uplon-form">
                <label className="uplon-label">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={loan.name}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={loan.description}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={loan.amount}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Interest:
                    <input
                        type="number"
                        name="interest"
                        value={loan.interest}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Repayment:
                    <input
                        type="text"
                        name="repayment"
                        value={loan.repayment}
                        onChange={handleChange}
                        className="uplon-input"
                    />
                </label>
                <label className="uplon-label">
                    Documents Required:
                    <input
                        type="text"
                        name="document"
                        value={loan.document}
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
