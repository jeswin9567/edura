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
            try {
                const response = await fetch(`http://localhost:5000/viewentr/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch entrance details');
                }
                const data = await response.json();
                setEntrance(data);
            } catch (error) {
                console.error(error);
                alert('Error fetching entrance details. Please try again later.');
            }
        };

        fetchEntranceDetails();
    }, [id]);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5000/delentr/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Entrance deleted successfully');
            navigate('/admin/entrance'); // Redirect to the entrance list or desired page
        } else {
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
                <p><strong>Education Required:</strong> {entrance.education}</p>
                <p><strong>Degrees Applicable:</strong> {entrance.degree.join(', ')}</p>
                <p><strong>Marks for General Category:</strong> {entrance.marksGeneral}</p>
                <p><strong>Marks for Backward Category:</strong> {entrance.marksBackward}</p>
                <p><strong>Syllabus:</strong> {entrance.syllabus}</p>
                <p><strong>How to Apply:</strong> {entrance.howtoapply}</p>
                <p><strong>Link:</strong> <a href={entrance.link} target="_blank" rel="noopener noreferrer">{entrance.link}</a></p>
                <p className="date"><strong>Start Date:</strong> {new Date(entrance.startdate).toLocaleDateString()}</p>
                <p className="date"><strong>End Date:</strong> {new Date(entrance.enddate).toLocaleDateString()}</p>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="update-button" onClick={() => navigate(`/updateentr/${id}`)}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default VEntranceDetails;
