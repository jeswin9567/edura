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

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this loan?");
        if (!confirmDelete) return; // Cancel deletion if user chooses not to proceed

        try {
            const response = await fetch(`http://localhost:5000/delln/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Loan deleted successfully');
                navigate('/admin/loan'); // Redirect to the loan list or desired page
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete the loan: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting loan:', error);
            alert('Could not delete loan. Please try again later.');
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
                <p><strong>Documents Required</strong>{loan.document}</p>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="update-button" onClick={() => navigate(`/updateloan/${id}`)}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default VLoanDetails;
