import React, { useEffect, useState } from 'react';
import '../../components/admin/ViewLoan.css';
import Header from '../../components/manager/head';
import { useParams, useNavigate } from 'react-router-dom';

const MVLoanDetails = () => {
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

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5000/delln/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Optionally show a success message
            alert('Loan deleted successfully');
            navigate('/manager/entrance'); // Redirect to the entrance list or desired page
        } else {
            // Optionally show an error message
            alert('Failed to delete the loan');
        }
    };

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
                        <strong>Document:</strong> {loan.document}
                    </p>
                )}
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    <button className='update-button' onClick={() => navigate(`/mupdateloan/${id}`)}>Update</button>
                    <button className='delete-button' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MVLoanDetails;
