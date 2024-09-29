import React, { useEffect, useState } from 'react';
import '../../../components/admin/ViewScholar.css'
import VHeader from '../../../components/user/vhead';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../../../function/useAuth';

const UVScholarshipDetails = () => {
    useAuth(); 
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
            <VHeader />
            <div className="scholarship-details">
                <h1>{scholarship.name}</h1>
                <p><strong>Details</strong>{scholarship.description}</p>
                <p><strong>Award:</strong> Rs {scholarship.award}</p>
                <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                <p><strong></strong></p>
                    <div className="sub-eligibility">
                        {scholarship.subEligibility.map((sub, index) => (
                        <span key={index} className="sub-eligibility-item">{sub}</span>
                        ))}
                    </div>
                <p><strong>Gender:{scholarship.gender}</strong></p>
                <p><strong>How to Apply:</strong> {scholarship.howToApply}</p>
                <p><strong>Link:</strong> <a href={scholarship.link} target="_blank" rel="noopener noreferrer">{scholarship.link}</a></p>
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
