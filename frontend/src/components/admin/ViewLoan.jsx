import React, { useEffect, useState } from 'react';
import './ViewLoan.css';
import Header from './headd';
import { useParams, useNavigate } from 'react-router-dom';

const VLoanDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loan, setLoan] = useState(null);

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

    if (!loan) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <div className="loan-details">
                <h1>{loan.name}</h1>
                <p>{loan.description}</p>
                <p><strong>Amount:</strong> {loan.amount}</p>
                <p><strong>Interest:</strong> {loan.interest}%</p>
                <p><strong>Repayment:</strong> {loan.repayment}</p>
                {loan.document && (
                    <p>
                        <strong>Document:</strong> <a href={loan.document} target="_blank" rel="noopener noreferrer">{loan.document}</a>
                    </p>
                )}
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default VLoanDetails;
