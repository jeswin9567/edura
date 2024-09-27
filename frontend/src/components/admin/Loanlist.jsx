import React, { useEffect, useState } from 'react';
import './LoanList.css';
import { Link } from 'react-router-dom';

const LoanList = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch('http://localhost:5000/viewln');
                if (!response.ok) {
                    throw new Error('Failed to fetch loans');
                }
                const data = await response.json();
                setLoans(data);
            } catch (error) {
                console.error('Failed to fetch loans:', error);
            }
        };

        fetchLoans();
    }, []);

    return (
        <div className="loan-list">
            {loans.map((loan) => (
                <div key={loan._id} className="loan-item">
                    <Link to={`/vloandetails/${loan._id}`}>
                        <div className="loan-name">{loan.loanName}</div> {/* Update this line */}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default LoanList;
