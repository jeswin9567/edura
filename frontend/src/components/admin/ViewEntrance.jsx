import React, { useEffect, useState } from 'react';
import './ViewEntrance.css'; // Create this CSS for styling
import VEHeader from './aviewservicehead/aenhead';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../../function/useAuth';

const VEntranceDetails = () => {
    useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrance, setEntrance] = useState(null);

    useEffect(() => {
        const fetchEntranceDetails = async () => {
            const response = await fetch(`http://localhost:5000/viewentr/${id}`);
            const data = await response.json();
            setEntrance(data);
        };

        fetchEntranceDetails();
    }, [id]);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5000/delentr/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Optionally show a success message
            alert('Entrance deleted successfully');
            navigate('/admin/entrance'); // Redirect to the entrance list or desired page
        } else {
            // Optionally show an error message
            alert('Failed to delete the entrance');
        }
    };

    if (!entrance) return <div>Loading...</div>;

    return (
        <div>
            <VEHeader />
            <div className="entrance-details">
                <h1>{entrance.name}</h1>
                <p>{entrance.details}</p>
                <p><strong>Eligibility:</strong> {entrance.eligibility}</p>
                <p><strong>Syllabus:</strong> {entrance.syllabus}</p>
                <p><strong>How to Apply:</strong> {entrance.howtoapply}</p>
                <p><strong>Link:</strong> <a href={entrance.links}>{entrance.links}</a></p>
                <p className="date"><strong>Start Date:</strong> {new Date(entrance.startdate).toLocaleDateString()}</p>
                <p className="date"><strong>End Date:</strong> {new Date(entrance.enddate).toLocaleDateString()}</p>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    {/* Add the Update button */}
                    <button className="update-button" onClick={() => navigate(`/updateentr/${id}`)}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default VEntranceDetails;
