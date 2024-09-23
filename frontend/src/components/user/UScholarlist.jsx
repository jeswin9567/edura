import React, { useEffect, useState } from 'react';
import '../admin/Scholarlist.css';
import { Link } from 'react-router-dom';

const UScholarshipList = () => {
    const [scholarships, setScholarships] = useState([]);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await fetch('http://localhost:5000/viewscho');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setScholarships(data);
            } catch (error) {
                console.error('Failed to fetch scholarships:', error);
            }
        };

        fetchScholarships();
    }, []);

    return (
        <div className="scholarship-list">
            {scholarships.map((scholarship) => (
                <div key={scholarship._id} className="scholarship-item">
                    <Link to={`/uscholarshipdetails/${scholarship._id}`}>
                        <div className="scholarship-name">{scholarship.name}</div>
                        <div className="scholarship-dates">
                            {scholarship.startdate && scholarship.enddate
                                ? `${new Date(scholarship.startdate).toLocaleDateString()} - ${new Date(scholarship.enddate).toLocaleDateString()}`
                                : 'Dates not available'}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default UScholarshipList;
