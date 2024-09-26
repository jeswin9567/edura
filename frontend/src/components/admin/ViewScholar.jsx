import React, { useEffect, useState } from 'react';
import './ViewScholar.css';
import Header from './headd';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../../function/useAuth';

const VScholarshipDetails = () => {
    useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);

    useEffect(() => {
        const fetchScholarshipDetails = async () => {
            const response = await fetch(`http://localhost:5000/viewscho/${id}`);
            if (!response.ok) {
                alert('Failed to fetch scholarship details');
                return;
            }
            const data = await response.json();
            setScholarship(data);
        };

        fetchScholarshipDetails();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this scholarship?");
        if (!confirmDelete) return; // Cancel deletion if user chooses not to proceed

        try {
            const response = await fetch(`http://localhost:5000/delscho/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Scholarship deleted successfully');
                navigate('/admin/scholar'); // Redirect to the scholarship list or desired page
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete the scholarship: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error deleting scholarship:', error);
            alert('Could not delete scholarship. Please try again later.');
        }
    };

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
                <p><strong>Link:</strong> <a href={scholarship.link} target="_blank" rel="noopener noreferrer">{scholarship.link}</a></p>
                <p className="date"><strong>Start Date:</strong> {new Date(scholarship.startdate).toLocaleDateString()}</p>
                <p className="date"><strong>End Date:</strong> {new Date(scholarship.enddate).toLocaleDateString()}</p>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    {/* Add Update button */}
                    <button className="update-button" onClick={() => navigate(`/updatescho/${id}`)}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default VScholarshipDetails;
