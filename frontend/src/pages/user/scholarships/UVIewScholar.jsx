import React, { useEffect, useState } from 'react';
import '../../../components/admin/ViewScholar.css'
import Header from '../../../components/user/header';
import { useParams, useNavigate } from 'react-router-dom';

const UVScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);

    useEffect(() => {
        const fetchScholarshipDetails = async () => {
            const response = await fetch(`http://localhost:5000/viewscho/${id}`);
            const data = await response.json();
            setScholarship(data);
        };

        fetchScholarshipDetails();
    }, [id]);

    if (!scholarship) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <div className="scholarship-details">
                <h1>{scholarship.name}</h1>
                <p>{scholarship.description}</p>
                <p><strong>Award:</strong> {scholarship.award}</p>
                <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                <p><strong>How to Apply:</strong> {scholarship.howToApply}</p>
                <p><strong>Link:</strong> <a href={scholarship.link}>{scholarship.link}</a></p>
                <p className="date"><strong>Start Date:</strong> {new Date(scholarship.startdate).toLocaleDateString()}</p>
                <p className="date"><strong>End Date:</strong> {new Date(scholarship.enddate).toLocaleDateString()}</p>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default UVScholarshipDetails;
